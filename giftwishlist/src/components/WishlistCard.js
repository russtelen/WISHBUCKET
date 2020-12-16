import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

export default class WishlistCard extends Component {
    
    constructor(props){
        super(props);
    }
    
    
    render() {
        return (
            <div className="wishlists__card">


                    <p className="card-title">
                        <NavLink
                          to={"/wishlist/" + this.props.wishlist.name}
                          className="nav-link__wishlist"
                        >
                          {this.props.wishlist.name}
                        </NavLink>
                      </p>
                      {this.props.wishlist.password !== "" ? (
                        <p className="card-text">
                          Password: {this.props.wishlist.password}
                        </p>
                      ) : (
                        <p className="card-text">No Password Set</p>
                      )}
                      {this.props.wishlist.dueDate === null ? (
                        <p className="card-text">No Due Date Set</p>
                      ) : (
                        <p className="card-text">
                          Due Date: {this.props.wishlist.dueDate}
                        </p>
                      )}
                
            </div>
        )
    }
}
