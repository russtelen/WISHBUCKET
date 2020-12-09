import React, { Component } from "react";
import { ImGift } from "react-icons/im";
import { NavLink } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="jumbotron home__jumbotron-custom">
          <h1 className="display-4">
            <ImGift className="mr-2 my-2" />
            WishBucket
          </h1>
          <p className="lead">Create Wishlist Receive Better Gifts</p>
          <hr className="my-4" />
          <p>
            With WishBucket it's easy to create wish lists and share them
            instantly with friends and family
          </p>
          <p className="lead my-3">
            <NavLink to="/register" className="btn btn-success btn-lg">
              Create Wish List
            </NavLink>
          </p>
        </div>
      </div>
    );
  }
}
