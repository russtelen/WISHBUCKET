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

  // const createItem = () => {
  //   wishlistService
  //     .createItem(createdItem, wishlistId)
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  // };

  // const handleNameChange = (e) => {
  //   setCreatedItem({
  //     ...createdItem,
  //     name: e.target.value,
  //   });
  // };

  useEffect(() => {
    fetchWishlists();
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

  const handleCompleteChange = (e) => {
    setComplete(e.target.value);
  };
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
        <input
          placeholder="Wishlist Name"
          type="checkbox"
          value={complete}
          onChange={handleCompleteChange}
        />

        <button className="button" onClick={() => {}}>
          Add Item
        </button>
      </div>
    </div>
  );
}
