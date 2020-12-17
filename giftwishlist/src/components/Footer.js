import React, { Component } from 'react';

export default class Footer extends Component {
	render() {
		return (
			<footer className="pt-4 my-md-5 mb-0 pb-0 pt-md-5">
				<div className="row">
					<div className="col-6 col-md">
						<h6 className="text-dark">WISHBUCKET</h6>
						<ul className="list-unstyled text-small">
							<li>Our Story</li>
							<li>Our People</li>
							<li>Testimonials</li>
							<li>Press Reviews</li>
						</ul>
					</div>

					<div className="col-6 col-md mb-3">
						<h6 className="text-dark">FEATURES</h6>
						<ul className="list-unstyled text-small">
							<li>Cool stuff</li>
							<li>Share With Anyone</li>
							<li>Organize Your Wishlists</li>
							<li>Find Your Friends</li>
						</ul>
					</div>

					<div className="col-6 col-md mb-3">
						<h6 className="text-dark">RESOURCES</h6>
						<ul className="list-unstyled text-small">
							<li>iPhone WishList IOS App</li>
							<li>Android WishList App</li>
							<li>Browser Plugins</li>
							<li>Merchant Integration</li>
						</ul>
					</div>

					<div className="col-6 col-md mb-3">
						<h6 className="text-dark">DESIGN &amp; DEVELOPMENT</h6>
						<ul className="list-unstyled text-small">
							<li>
								<a
									className="link-secondary"
									href="https://www.linkedin.com/in/theskuznetsov"
									target="_blank"
									rel="noreferrer"
								>
									Stefan Kuznetsov{' '}
								</a>
							</li>
							<li>
								<a
									className="link-secondary"
									href="https://www.linkedin.com/in/russelltelen/"
									target="_blank"
									rel="noreferrer"
								>
									Russ Telen
								</a>
							</li>
							<li>
								<a
									className="link-secondary"
									href="https://www.linkedin.com/in/vlad-preduna"
									target="_blank"
									rel="noreferrer"
								>
									Vlad Preduna
								</a>
							</li>
							<li>
								<a
									className="link-secondary"
									href="https://www.linkedin.com/in/fatmabadri"
									target="_blank"
									rel="noreferrer"
								>
									Fatma Badri
								</a>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		);
	}
}
