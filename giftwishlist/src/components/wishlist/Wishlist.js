import React, { useState, useEffect } from "react";
import Item from './item/Item';
import wishlistService from '../../services/wishlists.js';

const BASE_URL = "https://localhost:44361/api/";

export default function Wishlist({ match }) {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlists = () => {
    const wishlistId = match.params.id;
    wishlistService.getById(wishlistId)
      .then(response =>
        setWishlist(response))
      .catch(error => console.log(error))
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
          {wishlist.items ? wishlist.items.map(w => <Item key={w.Name} item={w}/>) : ''}
        </tbody>
      </table>
    </div>
  );
}
