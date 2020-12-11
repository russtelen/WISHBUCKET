import React, { useState, useEffect } from "react";
import Item from "./item/Item";
import wishlistService from "../../services/wishlists.js";

export default function Wishlist({ match }) {
  const [wishlist, setWishlist] = useState([]);
  const [createdItem, setCreatedItem] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [purchaseLink, setPurchaseLink] = useState("");
  const [price, setPrice] = useState("");
  const [complete, setComplete] = useState(false);

  // Taken from the url
  const wishlistId = match.params.id;

  const fetchWishlists = () => {
    wishlistService
      .getById(wishlistId)
      .then((response) => setWishlist(response))
      .catch((error) => console.log(error));
  };

  const createItem = () => {
    wishlistService
      .createItem(createdItem, wishlistId)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const handleNameChange = (e) => {
    setCreatedItem({
      ...createdItem,
      name: e.target.value,
    });
  };

  useEffect(() => {
    fetchWishlists();
  }, []); // empty [] dependancy list to stop infinite loop

  return (
    <div>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Purchase Link</th>
            <th>Price</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.items
            ? wishlist.items.map((w) => <Item key={w.name} item={w} />)
            : ""}
        </tbody>
      </table>

      <div className="container has-text-centered">
        <input
          placeholder="Wishlist Name"
          type="text"
          value={createdItem.name}
          onChange={handleNameChange}
        />

        <button className="button" onClick={createItem}>
          Create Wishlist
        </button>
      </div>
    </div>
  );
}
