import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="/" className="navbar-item">
                           Home
                        </a>
                        <a href="/wishlist" className="navbar-item">
                            Wishlists
                        </a>
                    </div>
                </div>
            </nav>
        )
    }
}
