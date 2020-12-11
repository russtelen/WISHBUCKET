import React, { Component } from "react";
import { ImGift } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { UserAuthContext } from './UserAuthContext';



export default class Navbar extends Component {
  
  handleLogoutClick () {
    sessionStorage.clear();
    window.location.href="/";
  }
  
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        
        <NavLink to="/" className="navbar-brand">
          <ImGift className="mr-2" /> WishBucket
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
        <UserAuthContext.Consumer>
          {(value) => (value.userAuthenticated ? 
            <div>
              <NavLink to="/wishlist">Wishlist</NavLink>
              <NavLink to="/">
                <button onClick={this.handleLogoutClick}>
                  Logout
                </button>
              </NavLink>
            </div> 
              : 
            <div>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Login</NavLink>
            </div>
          )}
        </UserAuthContext.Consumer>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
      </nav>
    );
  }
}
