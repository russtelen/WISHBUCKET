import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL + 'api/';

export default class WishlistCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showInputs: false,
			editNameInput: props.wishlist.name,
			editPasswordInput: props.wishlist.password,
			editDueDateInput: props.wishlist.dueDate,
			wishlistActive: true,
			wishlist: {
				id: props.wishlist.id,
				name: props.wishlist.name,
				password: props.wishlist.password,
				dueDate: props.wishlist.dueDate,
			},
		};
	}

	componentDidMount() {
		console.log(this.state.wishlist);
	}

	showEditInputs = () => {
		this.setState({ showInputs: !this.state.showInputs });
		console.log(this.props.wishlist.id);
	};

	handleNameChangeEdit = (e) => {
		this.setState({ editNameInput: e.target.value });
		console.log(this.state.editNameInput);
	};
	handlePasswordChangeEdit = (e) => {
		this.setState({ editPasswordInput: e.target.value });
		console.log(this.state.editPasswordInput);
	};
	handleDueDateChangeEdit = (e) => {
		this.setState({ editDueDateInput: e.target.value });
		console.log(this.state.editDueDateInput);
	};

	setWishlistData = () => {
		this.setState({
			wishlist: {
				name: this.state.editNameInput,
				password: this.state.editPasswordInput,
				dueDate: this.state.editDueDateInput,
			},
		});
	};

	updateWishlist = () => {
		fetch(BASE_URL + 'wishlist', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${sessionStorage.getItem('bearer-token')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				Id: this.props.wishlist.id,
				Name: this.state.editNameInput,
				Password: this.state.editPasswordInput,
				DueDate: this.state.editDueDateInput,
			}),
		})
			.then((res) => res.json())
			// Data retrieved.
			.then((data) => {
				console.log(JSON.stringify(data));
				// fetchUserWishlists();
				this.setWishlistData();
				this.showEditInputs();
			})
			// Data not retrieved.
			.catch((e) => {
				console.log(e);
			});
	};

	deleteWishlist = () => {
		fetch(BASE_URL + 'wishlist/' + this.state.wishlist.id + '/', {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${sessionStorage.getItem('bearer-token')}`,
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			// Data retrieved.
			.then((data) => {
				console.log(JSON.stringify(data));
				// fetchUserWishlists();
				// window.location.href = "/wishlist/";
				// this.props.refresh();
				this.setState({ showInputs: false });
				this.setState({ wishlistActive: false });
			})
			// Data not retrieved.
			.catch((e) => {
				console.log(e);
			});
	};

	render() {
		return (
			// <div className="wishlists__card" style={{display: { this.state.wishlistActive ? 'block' : 'none'} }}>
			<div
				className="wishlists__card"
				style={{ opacity: this.state.wishlistActive ? '1' : '0.4' }}
			>
				{/* Wishlist Name */}
				{this.state.showInputs ? (
					<input
						id="titleInput"
						className="wishlists__card__titleInput card-title"
						type="text"
						onChange={this.handleNameChangeEdit}
						value={this.state.editNameInput}
					/>
				) : this.state.wishlistActive ? (
					<NavLink
						className="wishlists__card__title card-title"
						to={`/wishlist/${this.state.wishlist.id}/${
							this.state.wishlist.password
								? '?password=' + this.state.wishlist.password
								: ''
						}`}
					>
						<button className="wishlists__card__title__button">
							{this.state.wishlist.name}
						</button>
					</NavLink>
				) : (
					<div>{this.state.wishlist.name + ' {DELETED}'}</div> // remove?
				)}
				{/* Wishlist Password */}
				{console.log(this.state.wishlist.password)}
				{this.state.showInputs ? (
					<input
						className="wishlists__card__password card-text"
						type="text"
						onChange={this.handlePasswordChangeEdit}
						value={
							this.state.editPasswordInput == null
								? ''
								: this.state.editPasswordInput
						}
						placeholder={
							this.state.wishlist.password == '' ? 'password (optional)' : ''
						}
					/>
				) : this.props.wishlist.password !== '' ? (
					<p className="wishlists__card__password card-text">
						Password: {this.state.wishlist.password}
					</p>
				) : (
					<p className="wishlists__card__password card-text">No Password Set</p>
				)}
				{/* Wishlist DueDate */}
				{this.state.showInputs ? (
					<input
						className="wishlists__card__dueDate card-text"
						type="date"
						onChange={this.handleDueDateChangeEdit}
						value={
							this.state.editDueDateInput == null
								? ''
								: this.state.editDueDateInput
						}
					/>
				) : this.state.wishlist.dueDate === null ? (
					<p className="wishlists__card__dueDate card-text">No Due Date Set</p>
				) : (
					<p className="wishlists__card__dueDate card-text">
						Due Date:{' '}
						<span className="wishlists__card__dueDate__date">
							{this.state.wishlist.dueDate.substring(0, 10)}
						</span>
					</p>
				)}

				{/* Toggle ShowUpdate / (Confirm + Cancel) */}
				<div className="wishlists__card__actions">
					<div>
						{this.state.showInputs ? (
							<div className="wishlists__card__actions__update">
								<button
									id="confirmUpdate"
									className="wishlists__card__actions__update__button"
									onClick={() => this.updateWishlist()}
								>
									Confirm
								</button>
								<button
									id="cancelUpdate"
									className="wishlists__card__actions__update__button"
									onClick={() => this.showEditInputs()}
								>
									Cancel Update
								</button>
							</div>
						) : (
							<div className="wishlists__card__actions__update">
								<button
									id="showUpdate"
									className="wishlists__card__actions__update__button"
									style={{
										cursor: this.state.wishlistActive ? 'pointer' : 'default',
									}}
									onClick={
										this.state.wishlistActive
											? () => this.showEditInputs()
											: null
									}
								>
									Update
								</button>
							</div>
						)}
					</div>
					{/* Delete Wishlist */}
					<div className="wishlists__card__actions__delete">
						<button
							className="wishlists__card__actions__delete"
							style={{
								cursor: this.state.wishlistActive ? 'pointer' : 'default',
							}}
							onClick={
								this.state.wishlistActive ? () => this.deleteWishlist() : null
							}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		);
	}
}
