import React, { useState, useEffect, useContext } from "react";
import Item from "./item/Item";
import wishlistService from "../../services/wishlists.js";
import { NavLink } from "react-router-dom";
import { UserAuthContext } from '../UserAuthContext';


export default function Wishlist({ match }) {
  const [wishlist, setWishlist] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [purchaseLink, setPurchaseLink] = useState("");
  const [price, setPrice] = useState("");
  const [showShareNotification, setShowShareNotification] = useState(false);

  // Taken from the url
  const wishlistId = match.params.id;
  const password = new URLSearchParams(window.location.search).get('password');
  const BASE_URL = process.env.REACT_APP_BASE_URL + "api/";

  const { userAuthenticated } = useContext(UserAuthContext);

  const fetchWishlists = () => {
    wishlistService
      .getById(wishlistId, password)
      .then((response) => setWishlist(response))
      .catch((error) => console.log(error));
  };

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

  const createItem = () => {
    wishlistService
      .createItem(name, description, image, purchaseLink, price, wishlistId)
      .then((response) => fetchWishlists())
      .catch((error) => console.log(error));
  };

  const deleteWishlist = () => {
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
        //Could just update the state locally without another fetch
        window.location.href = "/wishlist/"
      })
    // Data not retrieved.
      .catch((e) => {
        console.log(e);
      });
    
  }
  const deleteItem = (wishlistId, itemId) => {

    fetch(BASE_URL + "wishlist/" + wishlistId + "/item/" + itemId, {
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
        //Unnecessary fetch
        fetchWishlists();
      })
    // Data not retrieved.
      .catch((e) => {
        console.log(e);
      });
  }

  const shareWishlist = () => {
    setShowShareNotification(!showShareNotification);
    const dummy = document.createElement('input'),
        text = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  }


  return (
    <div className="table-container">
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
            <th>Update</th>
            <th>Delete Item</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.items ? wishlist.items.map((w) =>
            <tr key={w.id}>
              <Item item={w}/>
              <td>
                <button className="button" onClick={() => deleteItem(w.wishlistID, w.id)}>
                  Delete
                </button>
              </td>
            </tr>)
              : null }
        </tbody>

      </table>
      {userAuthenticated ?
       <div className="container has-text-centered wishlist-inputs">
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
         <button className="button is-danger" onClick={deleteWishlist}>
           Delete Wishlist
         </button>
       </div>
       : 'Log in to edit'}

      <div>
        {showShareNotification ? <div class="notification is-primary is-light wishlist-notification">
                                   <button class="delete" onClick={shareWishlist}></button>
                                   <a href={window.location.href}>Link</a> copied to clipboard.
                                 </div>
         :
         <button className="button" onClick={shareWishlist}>
           Share Wishlist
         </button>
        }

      </div>


    </div>
  );
}
