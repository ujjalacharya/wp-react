import React, { Component } from 'react'
import Navbar from './Navbar';

class Posts extends Component {

    render() {
        return (
            <>
            <Navbar />
            <div className="container">
            <div className="table-wrapper" style={{marginTop: '10rem'}}>
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-8"><h2>Employee <b>Details</b></h2></div>
                        <div className="col-sm-4">
                            <button type="button" className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button>
                        </div>
                    </div>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John Doe</td>
                            <td>Administration</td>
                            <td>(171) 555-2222</td>
                            <td>
                                <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons">&#xE03B;</i></a>
                                <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                                <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                            </td>
                        </tr>
                        <tr>
                            <td>Peter Parker</td>
                            <td>Customer Service</td>
                            <td>(313) 555-5735</td>
                            <td>
                                <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons">&#xE03B;</i></a>
                                <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                                <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                            </td>
                        </tr>
                        <tr>
                            <td>Fran Wilson</td>
                            <td>Human Resources</td>
                            <td>(503) 555-9931</td>
                            <td>
                                <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons">&#xE03B;</i></a>
                                <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                                <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                            </td>
                        </tr>      
                    </tbody>
                </table>
            </div>
        </div>   
        </>
        )
    }
}

export default Posts;