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
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        
        <NavLink to="/" className="navbar-brand">
          <ImGift className="mr-2" /> WishBucket
        </NavLink>
        <button
          className="navbar__toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar__toggler__icon navbar-toggler-icon"></span>
        </button>

        <div className="navbar__links collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar__links__ulist navbar-nav ml-auto">
            <UserAuthContext.Consumer>
              {(value) => (value.userAuthenticated ? 
                // (if userAuthenticated is true)
                <div>
                  <NavLink to="/wishlist" className="navbar__links__ulist__link">
                    Wishlist
                  </NavLink>

                  <NavLink to="/" className="navbar__links__ulist__link">
                    <button onClick={this.handleLogoutClick}>
                      Logout
                    </button>
                  </NavLink>
                </div> 
                  : // OR (if userAuthenticated is false) 
                <div>
                  <NavLink to="/register" className="navbar__links__ulist__link">
                    Register
                  </NavLink>
                  <NavLink to="/login" className="navbar__links__ulist__link">
                    Login
                  </NavLink>
                </div>
              )}
            </UserAuthContext.Consumer>
          </ul>
        </div>
      </nav>
    );
  }
}
