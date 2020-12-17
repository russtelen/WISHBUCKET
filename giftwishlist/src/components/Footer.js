import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Footer extends Component {
  render() {
   return (
     <footer className="pt-4 my-md-5 pt-md-5">
       <div className="row">
          <div className="col-6 col-md">
                <NavLink to="/">
                <img src={"https://vectr.com/vleddepruna/aVozy6qf2.svg?width=224&height=236&select=aVozy6qf2page0"}
                  width="30em"
                />
                <h6>WishBucket</h6>
              </NavLink>
              {/* <h5>Company</h5> */}
              <small class="d-block mb-3 text-muted">&copy; 2015-2020</small>
          </div> 

          <div className="col-6 col-md">
              <h5>Features</h5>
              <ul class="list-unstyled text-small">
                <li><a class="link-secondary" href="#">Cool stuff</a></li>
                <li><a class="link-secondary" href="#">Random feature</a></li>
              </ul>
          </div> 

          <div className="col-6 col-md">
              <h5>Resources</h5>
              <ul class="list-unstyled text-small">
                <li><a class="link-secondary" href="#">Cool stuff</a></li>
                <li><a class="link-secondary" href="#">Random feature</a></li>
              </ul>
          </div>

          <div className="col-6 col-md">
              <h5>Solutions</h5>
              <ul class="list-unstyled text-small">
                <li><a class="link-secondary" href="#">Cool stuff</a></li>
                <li><a class="link-secondary" href="#">Random feature</a></li>
              </ul>
          </div>
       </div>
     </footer>
   );
  }
} 