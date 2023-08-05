import React from "react";
import { Link } from "react-router-dom";
import Login from "../Login";
import Signup from "../Signup";
import lockedInLogo from "../../lockedinlogo.png"; 
import Auth from "../../utils/auth";

const Nav = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <nav className="custom-nav">
      <div className="custom-nav-content">
        {/* Image in top left corner */}
        <Link className="custom-nav-link" to="/">
          <img className="custom-nav-logo" src={lockedInLogo} alt="LockedIn Logo" />
        </Link>
        <div className="custom-buttons">
          {Auth.loggedIn() ? (
            <div className="custom-logged-in-buttons">
              <Link className="custom-button" to="/">
                View My Credentials
              </Link>
              <Link className="custom-button" to="/create">
                Save New Credentials
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
