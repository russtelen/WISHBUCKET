import React, { Component } from "react";
import { ImGift } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { IoStorefrontOutline } from "react-icons/io5";
import { GiStairsCake, GiTakeMyMoney } from "react-icons/gi";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        {/* jumbotron */}
        <div className="home__jumbotron-custom jumbotron">
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
        {/* Quick Overview */}
        <div className="home__overview pb-5">
          <div className="home__overview-cards container row">
            <div className="home__overview-card col-sm-12 col-md-3 mx-auto my-2">
              <IoStorefrontOutline size={50} />
              <p className="home__overview-header">Add Anything</p>
              <p className="home__overview-subheader">
                Add gifts from any store online, or in the street
              </p>
            </div>
            <div className="home__overview-card col-sm-12 col-md-3 mx-auto my-2">
              <GiStairsCake size={50} />
              <p className="home__overview-header">Any Occasion</p>
              <p className="home__overview-subheader">
                Birthdays, Baby Showers, Christmas.. WishBucket works great
                everytime
              </p>
            </div>
            <div className="home__overview-card col-sm-12 col-md-3 mx-auto my-2">
              <GiTakeMyMoney size={50} />
              <p className="home__overview-header">Completely Free</p>
              <p className="home__overview-subheader">
                WishBucket is completely free and completely unlimited
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
