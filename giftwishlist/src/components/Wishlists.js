import React, { useState, useEffect } from 'react';
import WishlistCard from './WishlistCard';
import { GiEmptyMetalBucketHandle } from 'react-icons/gi';

const BASE_URL = process.env.REACT_APP_BASE_URL + 'api/';

export const WishlistActiveContext = React.createContext();

export default function Wishlists() {
	const [userWishlists, setUserWishlists] = useState([]);
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [wishlistActive, setWishlistActive] = useState(true);

	const fetchUserWishlists = () => {
		const URL = `${BASE_URL}wishlist/owned`;
		fetch(URL, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${sessionStorage.getItem('bearer-token')}`,
				'Content-Type': 'application/json',
			},
		}) // this should be changed to 'wishlists' (plural)
			.then((response) => response.json())
			.then((data) => {
				if (data === undefined || data.status === 404) {
					setUserWishlists([]);
				} else {
					setUserWishlists(data);
				}
			})
			.catch((err) => {
				console.log(`An error has occurred: ${err}`);
			});
	};

	useEffect(() => {
		// re-fetch User's Wishlists
		fetchUserWishlists();
	}, []); // empty [] dependancy list to stop infinite loop

	const handleNameChange = (e) => {
		setName(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handleDueDateChange = (e) => {
		setDueDate(e.target.value);
	};
	const createWishlist = () => {
		fetch(BASE_URL + 'wishlist/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${sessionStorage.getItem('bearer-token')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				Name: name,
				Password: password,
				DueDate: dueDate,
			}),
		})
			// Response received.
			.then((response) => {})
			// Data retrieved.
			.then((json) => {
				setName('');
				setPassword('');
				setDueDate(''); // Clear input.
				fetchUserWishlists();
			})
			// Data not retrieved.
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<div className="dashboard">
			<h1 className="dashboard__greeting">
				{"Hello, you're logged-in as "}
				<span className="dashboard__greeting__userEmail">
					{sessionStorage.getItem('loggedIn-email')}
				</span>
			</h1>

			{/* CREATE WISHLIST INPUTS */}
			<div
				id="createInputs"
				className="dashboard__create animate__animated animate__fadeInDown"
			>
				<input
					placeholder="Wishlist Name"
					type="text"
					value={name}
					onChange={handleNameChange}
					className="dashboard__create__input mx-1"
				/>
				<input
					placeholder="Password (Optional)"
					type="text"
					value={password}
					onChange={handlePasswordChange}
					className="dashboard__create__input mx-1"
				/>
				<input
					type="date"
					value={dueDate}
					onChange={handleDueDateChange}
					className="dashboard__create__input mx-1"
				/>
				<button className="dashboard__create__button" onClick={createWishlist}>
					Create Wishlist
				</button>
			</div>

			{/* WishLists */}

			<p className="dashboard__heading display-4 animate__animated animate__fadeInDown">
				Your WishBuckets
			</p>
			{userWishlists.length === 0 ? (
				<div className="dashboard__noWishlists">
					<h3 className="dashboard__noWishlists__text">
						Why no wishlists? Create One Above!
					</h3>
					<GiEmptyMetalBucketHandle
						size={42}
						className="dashboard__noWishlists__icon"
					/>
				</div>
			) : (
				<WishlistActiveContext.Provider value={wishlistActive}>
					<div className="dashboard__wishlists row">
						{userWishlists.map((wishlist, index) => {
							return (
								<div
									key={index}
									className="dashboard__wishlists__container col-sm-12 col-md-6 col-lg-4"
								>
									<div
										className={
											wishlistActive
												? 'dashboard__wishlists__container__cardOuter animate__animated animate__zoomIn'
												: 'animate__animated animate__bounceOut'
										}
									>
										<WishlistCard
											className="wishlistCardComponent"
											refresh={fetchUserWishlists}
											index={index}
											wishlist={wishlist}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</WishlistActiveContext.Provider>
			)}
		</div>
	);
}
