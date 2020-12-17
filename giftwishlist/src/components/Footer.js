import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Footer extends Component {
	render() {
		return (
			<footer className="footer pt-4 py-md-5 pt-md-5 mb-0 pb-0">
				<div className="row">
					<div className="col-6 col-md">
						<h6>WishBucket</h6>
						<ul className="list-unstyled text-small">
							<li>
								<a className="link-secondary" href="#">
									Our Story
								</a>
							</li>
							<li>
								<a className="link-secondary" href="#">
									Our People
								</a>
							</li>
							<li>
								<a className="link-secondary" href="#">
									Testimonials
								</a>
							</li>
							<li>
								<a className="link-secondary" href="#">
									Press Reviews
								</a>
							</li>
						</ul>
					</div>

					<div className="col-6 col-md">
						<h6>Features</h6>
						<ul className="list-unstyled text-small">
							<li>
								<a className="link-secondary" href="#">
									Cool stuff
								</a>
							</li>
							<li>
								<a className="link-secondary" href="#">
									Share With Anyone
								</a>
							</li>
							<li>
								<a className="link-secondary" href="#">
									Organize Your Wishlists
								</a>
							</li>
							<li>
								<a className="link-secondary" href="#">
									Find Your Friends
								</a>
							</li>
						</ul>
					</div>

					<div className="col-6 col-md">
						<h6>Resources</h6>
						<ul className="list-unstyled text-small">
							<li>
								<a className="link-secondary" href="#">
									iPhone WishList IOS App
								</a>
							</li>
							<li>
								<a className="link-secondary" href="#">
									Android WishList App
								</a>
							</li>
							<li>
								<a className="link-secondary" href="#">
									Browser Plugins
								</a>
							</li>
							<li>
								<a className="link-secondary" href="#">
									Merchant Integration
								</a>
							</li>
						</ul>
					</div>

					<div className="col-6 col-md">
						<h6>Solutions</h6>
						<ul className="list-unstyled text-small">
							<li>
								<a className="link-secondary" href="#">
									Getting Stared
								</a>
							</li>
							<li>
								<a className="link-secondary" href="#">
									Unique Gift Ideas
								</a>
							</li>
							<li>
								<a className="link-secondary" href="#">
									Customer Assistant
								</a>
							</li>
							<li>
								<a className="link-secondary" href="#">
									Returns/Exchanges
								</a>
							</li>
						</ul>
					</div>
				</div>
				<hr />
				<div className="col-12 col-md">
					<NavLink to="/">
						<img
							src={
								'https://vectr.com/vleddepruna/aVozy6qf2.svg?width=224&height=236&select=aVozy6qf2page0'
							}
							width="30em"
						/>
						<h6>WishBucket</h6>
					</NavLink>
					{/* <h5>Company</h5> */}
					<small className="d-block mb-3 text-muted">&copy; 2015-2020</small>
				</div>
			</footer>
		);
	}
}
