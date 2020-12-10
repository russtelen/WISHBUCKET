import React, { useState, useEffect } from "react";
import Item from './item/Item';

const BASE_URL = "https://localhost:44361/api/";

export default function Wishlists({ match }) {
  const [wishlist, setWishlist] = useState({});

  const mockItems =[ {
    Name: "Test item",
    Description: "Test description",
    Price: 12.99
  }]

  const fetchWishlists = () => {
    fetch(BASE_URL + "wishlist") // this should be changed to 'wishlists' (plural)
      .then((response) => response.json())
      .then((data) => {
        setWishlist(data);
      })
      .catch((err) => {
        console.log(`An error has occurred: ${err}`);
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
            {/* <th>Id</th> */}
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Purchase Link</th>
            <th>Price</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {mockItems.map(i => <Item item={i} />)}
        </tbody>
      </table>
    </div>
  );
}