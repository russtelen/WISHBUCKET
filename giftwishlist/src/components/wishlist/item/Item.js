import React from 'react';

const BASE_URL = "https://giftwishlist1.azurewebsites.net/api/";

const Item = (props) => {
    const itemData = props.item;
    const formatPrice = (price) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })

        return formatter.format(price);
    }

    const deleteItem = (wishlistId, itemId) => {
        
        console.log("deleteItm button clicked for" + itemId + "in wishlistId" + wishlistId);
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
              console.log(JSON.stringify(data));
            //   fetchWishlists();
            })
            // Data not retrieved.
            .catch((e) => {
              console.log(e);
            });
            window.location.href="/wishlist/" + wishlistId;
    }

    const handleCompletedStatus = (wishlistId, itemId) => {
        console.log("completed button clickedfor" + itemId + "in wishlistId" + wishlistId);
        fetch(BASE_URL + "wishlist/" + wishlistId + "/item/" + itemId, {
            method: "PUT",
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
            //   fetchWishlists();
            })
            // Data not retrieved.
            .catch((e) => {
              console.log(e);
            });
            window.location.href="/wishlist/" + wishlistId;
    }

    return (
        <tr>
            <td>{itemData.name}</td>
            <td>{itemData.description}</td>
            <td><img src={itemData.imageURL} alt={itemData.name}></img></td>
            <td><a href={itemData.purchaseURL}>Purchase</a></td>
            <td>{formatPrice(itemData.price)}</td>
            <td>
                <button className="button" onClick={() => handleCompletedStatus(itemData.wishlistID, itemData.id)}>
                    {itemData.isComplete ? '✔' : '❌'}
                </button>
            </td>
            <td>
                <buttom className="button" onClick={() => deleteItem(itemData.wishlistID, itemData.id)}>
                    Delete
                </buttom>
            </td>
        </tr>
    )
}

export default Item;
