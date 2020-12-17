import React, { Component } from 'react';
// import { ImGift } from "react-icons/im";
import { NavLink } from 'react-router-dom';
import { UserAuthContext } from './UserAuthContext';

export default class Navbar extends Component {
	handleLogoutClick() {
		sessionStorage.clear();
		window.location.href = '/';
	}

	render() {
		return (
			<nav className="navbar navbar-expand-sm navbar-light bg-light">
				<NavLink to="/" className="navbar__title navbar-brand">
					{/* <ImGift className="mr-2" />  */}
					<img
						className="navbar__title__logo"
						src={
							'https://vectr.com/vleddepruna/aVozy6qf2.svg?width=224&height=236&select=aVozy6qf2page0'
						}
						width="74em"
					/>
					<h1 className="navbar__title__name">WishBucket</h1>
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

				<div
					className="navbar__links collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<UserAuthContext.Consumer className="navbar__links__ulist__context">
						{(value) =>
							value.userAuthenticated ? (
								// (if userAuthenticated is true)
								<ul className="navbar__links__ulist navbar-nav">
									<NavLink
										to="/wishlist"
										className="navbar__links__ulist__context__link"
									>
										<button className="navbar__links__ulist__context__link__button">
											Wishlist
										</button>
									</NavLink>

									<NavLink
										to="/"
										className="navbar__links__ulist__context__link"
									>
										<button
											className="navbar__links__ulist__context__link__button"
											onClick={this.handleLogoutClick}
										>
											Logout
										</button>
									</NavLink>
								</ul>
							) : (
								// OR (if userAuthenticated is false)
								<ul className="navbar__links__ulist navbar-nav">
									<NavLink
										to="/register"
										className="btn btn-success navbar__links__ulist__context__link mx-2"
									>
										Register
									</NavLink>
									<NavLink
										to="/login"
										className="btn btn-success navbar__links__ulist__context__link mx-2"
									>
										Login
									</NavLink>
								</ul>
							)
						}
					</UserAuthContext.Consumer>
				</div>
			</nav>
		);
	}
}
