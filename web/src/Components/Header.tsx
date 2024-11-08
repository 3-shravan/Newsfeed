import React from "react";

import "./header.css";
import { Link } from "react-router-dom";
import { AuthProvider, useAuth } from "@/utils/authContext";

const CommonHeader = (props) => {
  const { isLoggedIn, currentUser, logout } = useAuth();

  return (
    <header className="header">
      <nav className="navbar">
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="logo">
          WEBSITE
          <span></span>
        </Link>

        <ul className="nav-links">
          {}
          {!isLoggedIn && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}

          {isLoggedIn && (
            <>
              <li>
                <Link to="/profile" className="profile">
                  {currentUser?.fullName}
                </Link>
              </li>
              <li>
                <Link to="/" onClick={logout}>
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default CommonHeader;
