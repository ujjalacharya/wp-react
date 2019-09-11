import React from "react";
import { signout } from "../../Utils/Requests";
import { withRouter } from "react-router-dom";

const Navbar = ({ history }) => {
  const handleLogout = () => {
    if (signout()) {
      history.push("/");
    }
  };
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="navbar-right" style={{marginRight: '5rem'}}>
        <button
          type="button"
          className="btn btn-default navbar-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
