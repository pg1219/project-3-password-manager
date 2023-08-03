import React from "react";
import { Link } from "react-router-dom";
import Login from "../Login";
import Signup from "../Signup";

import Auth from "../../utils/auth";

const Nav = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <nav className="custom-nav">
      <div className="custom-nav-content">
        <Link className="custom-nav-link" to="/">
          <h1 className="custom-nav-logo">Password Manager</h1>
        </Link>
        <p className="custom-nav-description">Never forget your passwords again</p>
        <div className="custom-buttons">
          {Auth.loggedIn() ? (
            <div className="custom-logged-in-buttons">
              <Link className="custom-button" to="/">
                View My Credentials
              </Link>
              <Link className="custom-button" to="/create">
                Save a New Credential
              </Link>
              <button className="custom-button" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="custom-logged-out-buttons">
              <Link className="custom-button" to="/login">
                Login
              </Link>
              <Link className="custom-button" to="/signup">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
