import React, { Component } from "react";
import { ImGift } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { UserAuthContext } from "./UserAuthContext";

export default class Navbar extends Component {
  handleLogoutClick() {
    sessionStorage.clear();
    window.location.href = "/";
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink to="/" className="navbar-brand">
          <ImGift className="mr-2" />
          <span className="navbar__title">WishBucket</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <UserAuthContext.Consumer className="">
            {(value) =>
              value.userAuthenticated ? (
                // (if userAuthenticated is true)
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item mx-5 active">
                    <NavLink className="nav-link" to="/wishlist">
                      Wishlists
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      onClick={this.handleLogoutClick}
                      className="nav-link"
                      to="/"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              ) : (
                // OR (if userAuthenticated is false)
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item mx-5">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </ul>
              )
            }
          </UserAuthContext.Consumer>
        </div>
      </nav>
    );
  }
}
