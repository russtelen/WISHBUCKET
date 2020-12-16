import React, { Component } from "react";

export default class Footer extends Component {
  render() {
   return (
     <footer className="pt-4 my-md-5 pt-md-5">
       <div className="row">
          <div className="col-6 col-md">
              <h5>Company</h5>
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