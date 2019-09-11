import React, { Component } from "react";
import Navbar from "./Navbar";
import moment from "moment";

import {
  getAllPosts,
  isAuthenticated,
  publishPost,
  deletePost
} from "../../Utils/Requests";

class Posts extends Component {
  state = {
    posts: [],
    email: isAuthenticated().user_email,
    activeModalId: false,
    index: 0,
    title: "",
    status: "publish",
    content: ""
  };

  async componentDidMount() {
    const data = await getAllPosts();

    if (data && data.status === 200) {
      data.data.map(post => {
        var now = new Date(post.date);
        var month = now.getMonth() + 1;
        var day = now.getDate();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var theday = now.getFullYear() + "-" + month + "-" + day;

        post.date = theday;
      });

      this.setState({ posts: data.data });
    }
  }

  handleActiveModal = (modalId, index) => e => {
    this.setState({ activeModalId: modalId, index });
  };

  handlePostSubmit = async e => {
    e.preventDefault();

    const body = {
      title: this.state.title,
      status: this.state.status,
      content: this.state.content
    };

    const response = await publishPost(body);

    console.log(response);

    if (response.status === 201) {
      window.location.reload();
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDeletePost = async e => {
    e.preventDefault();

    const response = await deletePost(this.state.activeModalId);

    if (response.status === 200) {
      window.location.reload();
    }
  };

  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="table-wrapper" style={{ marginTop: "10rem" }}>
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    WP <b>App</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <a
                    href="#addEmployeeModal"
                    className="btn btn-success"
                    data-toggle="modal"
                  >
                    <i className="material-icons">&#xE147;</i>{" "}
                    <span>Add New Post</span>
                  </a>
                  <a
                    href="#deleteEmployeeModal"
                    className="btn btn-danger"
                    data-toggle="modal"
                  >
                    <i className="material-icons">&#xE15C;</i>{" "}
                    <span>Delete</span>
                  </a>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>
                    <span className="custom-checkbox">
                      <input type="checkbox" id="selectAll" />
                      <label htmlFor="selectAll"></label>
                    </span>
                  </th>
                  <th>Title</th>
                  <th>Email</th>
                  <th>Post</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.posts.map((post, i) => (
                  <tr key={i}>
                    <td>
                      <span className="custom-checkbox">
                        <input
                          type="checkbox"
                          id="checkbox1"
                          name="options[]"
                          value="1"
                        />
                        <label htmlFor="checkbox1"></label>
                      </span>
                    </td>
                    <td>{post.title.rendered}</td>
                    <td>{this.state.email}</td>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: post.content.rendered
                      }}
                    ></td>
                    <td>{moment(post.date).format("MMMM Do, YYYY")}</td>
                    <td>
                      <a
                        href="#editEmployeeModal"
                        className="edit"
                        data-toggle="modal"
                        onClick={this.handleActiveModal(post.id, i)}
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Edit"
                        >
                          &#xE254;
                        </i>
                      </a>
                      <a
                        href="#deleteEmployeeModal"
                        className="delete"
                        data-toggle="modal"
                        onClick={this.handleActiveModal(post.id, i)}
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Delete"
                        >
                          &#xE872;
                        </i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <div className="clearfix">
              <div className="hint-text">
                Showing <b>5</b> out of <b>25</b> entries
              </div>
              <ul className="pagination">
                <li className="page-item disabled">
                  <a href="#">Previous</a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    2
                  </a>
                </li>
                <li className="page-item active">
                  <a href="#" className="page-link">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    4
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    5
                  </a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">
                    Next
                  </a>
                </li>
              </ul>
            </div>*/}
          </div>
        </div>
        <div id="addEmployeeModal" className="modal fade addPost">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={this.handlePostSubmit}>
                <div className="modal-header">
                  <h4 className="modal-title">Add Post</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      name="title"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={this.state.email && this.state.email}
                      required
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Post</label>
                    <textarea
                      className="form-control"
                      required
                      name="content"
                      onChange={this.handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <input
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    value="Cancel"
                  />
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Add"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="editEmployeeModal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <form>
                <div className="modal-header">
                  <h4 className="modal-title">Edit Post</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        this.state.activeModalId &&
                        this.state.posts[this.state.index].title.rendered
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={this.state.activeModalId && this.state.email}
                      disabled
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Post</label>
                    <textarea
                      className="form-control"
                      value={
                        this.state.activeModalId &&
                        this.state.posts[this.state.index].content.rendered
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      className="form-control"
                      disabled
                      value={
                        this.state.activeModalId &&
                        this.state.posts[this.state.index].date
                      }
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <input
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    value="Cancel"
                  />
                  <input type="submit" className="btn btn-info" value="Save" />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="deleteEmployeeModal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={this.handleDeletePost}>
                <div className="modal-header">
                  <h4 className="modal-title">Delete Employee</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete these Records?</p>
                  <p className="text-warning">
                    <small>This action cannot be undone.</small>
                  </p>
                </div>
                <div className="modal-footer">
                  <input
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    value="Cancel"
                  />
                  <input
                    type="submit"
                    className="btn btn-danger"
                    value="Delete"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Posts;
