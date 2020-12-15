import React, { useState, useEffect } from "react";
import Item from "./item/Item";
import wishlistService from "../../services/wishlists.js";
import { NavLink } from "react-router-dom";


export default function Wishlist({ match }) {
  const [wishlist, setWishlist] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [purchaseLink, setPurchaseLink] = useState("");
  const [price, setPrice] = useState("");

  // Taken from the url
  const wishlistId = match.params.id;
  const BASE_URL = process.env.REACT_APP_BASE_URL + "api/";

  const fetchWishlists = () => {
    wishlistService
      .getById(wishlistId)
      .then((response) => setWishlist(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchWishlists();
    console.log(wishlist.id)
  }, []); // empty [] dependancy list to stop infinite loop

  // Create Wishlist / Item
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handlePurchaseLinkChange = (e) => {
    setPurchaseLink(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const createItem = () => {
    wishlistService
      .createItem(name, description, image, purchaseLink, price, wishlistId)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
      window.location.href="/wishlist/" + wishlistId;
  };

const deleteWishlist = (id) => {
  fetch(BASE_URL + "wishlist/" + wishlist.id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("bearer-token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    // Data retrieved.
    .then((data) => {
      console.log(JSON.stringify(data));
      window.location.href="/wishlist";
    })
    // Data not retrieved.
    .catch((e) => {
      console.log(e);
    });
    
}
  
  return (
    <div>
      <NavLink to="/wishlist">
        Return to Wishlists
      </NavLink>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Purchase Link</th>
            <th>Price</th>
            <th>Completed</th>
            <th>Delete Item</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.items ? wishlist.items.map((w) => <Item key={w.name} item={w}/>) : null}
        </tbody>
      </table>

      <div className="container has-text-centered">
        <input
          placeholder="Item Name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <input
          placeholder="Description"
          type="text"
          value={description}
          onChange={handleDescChange}
        />
        <input
          placeholder="Image Link"
          type="url"
          value={image}
          onChange={handleImageChange}
        />
        <input
          placeholder="Purchase Link"
          type="url"
          value={purchaseLink}
          onChange={handlePurchaseLinkChange}
        />
        <input
          placeholder="Price"
          type="text"
          value={price}
          onChange={handlePriceChange}
        />

        <button className="button" onClick={createItem}>
          Add Item
        </button>
        <button className="button" onClick={deleteWishlist}>
          Delete Wishlist
        </button>
      </div>
    </div>
  );
}
