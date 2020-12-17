import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Footer extends Component {
  render() {
   return (
      <footer className="pt-4 my-md-5 mb-0 pb-0 pt-md-5">
         <div className="row">
          <div className="col-6 col-md">
                <h6 className="text-dark">WISHBUCKET</h6>
              <ul class="list-unstyled text-small">
                <li><a className="link-secondary" href="#">Our Story</a></li>
                <li><a className="link-secondary" href="#">Our People</a></li>
                <li><a className="link-secondary" href="#">Testimonials</a></li>
                <li><a className="link-secondary" href="#">Press Reviews</a></li>
              </ul>
          </div> 

          <div className="col-6 col-md mb-3">
              <h6 className="text-dark">FEATURES</h6>
              <ul class="list-unstyled text-small">
                <li><a className="link-secondary" href="#">Cool stuff</a></li>
                <li><a className="link-secondary" href="#">Share With Anyone</a></li>
                <li><a className="link-secondary" href="#">Organize Your Wishlists</a></li>
                <li><a className="link-secondary" href="#">Find Your Friends</a></li>
              </ul>
          </div> 

          <div className="col-6 col-md mb-3">
              <h6 className="text-dark">RESOURCES</h6>
              <ul className="list-unstyled text-small">
                <li><a className="link-secondary" href="#">iPhone WishList IOS  App</a></li>
                <li><a className="link-secondary" href="#">Android WishList App</a></li>
                <li><a className="link-secondary" href="#">Browser Plugins</a></li>
                <li><a className="link-secondary" href="#">Merchant Integration</a></li>
              </ul>
          </div>

          <div className="col-6 col-md mb-3">
              <h6 className="text-dark">DESIGN &amp; DEVELOPMENT</h6>
              <ul className="list-unstyled text-small">
              <li><a className="link-secondary" href="#">Stefan Kuznetsov </a></li>
                <li><a className="link-secondary" href="#">Russ Telen</a></li>
                <li><a className="link-secondary" href="#">Vlad Preduna</a></li>
                <li><a className="link-secondary" href="#">Fatma Badri</a></li>
              </ul>
          </div>
       </div>
    </footer>
   );
  }
} 