import React, { useState } from "react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Item = (props) => {
  const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

    return formatter.format(price);
  };

  const [itemData, setItemData] = useState(props.item);
  const [showInputs, setShowInputs] = useState(false);
  const [editNameInput, setEditNameInput] = useState(itemData.name);
  const [editDescriptionInput, setEditDescriptionInput] = useState(
    itemData.description
  );
  const [editPurchaseURL, setEditPurchaseURL] = useState(itemData.purchaseURL);
  const [editPrice, setEditPrice] = useState(itemData.price);

  const toggleCompletedStatus = async (wishlistId, itemId) => {
    const response = await fetch(
      BASE_URL + "api/wishlist/" + wishlistId + "/item/" + itemId,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("bearer-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Id: itemId,
          isComplete: !itemData.isComplete,
          wishlistID: wishlistId,
        }),
      }
    ).catch((err) => console.log(err));
    if (response.status > 400) {
      return response;
    }
    setItemData({ ...itemData, ...{ isComplete: !itemData.isComplete } });
    return await response.json();
    // window.location.href="/wishlist/" + wishlistId;
  };

  const updateItem = () => {
    console.log("update clicked");
    fetch(
      BASE_URL + "api/wishlist/" + itemData.wishlistID + "/item/" + itemData.id,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("bearer-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Id: itemData.id,
          Name: editNameInput, // editable
          IsComplete: itemData.isComplete,
          wishlistID: itemData.wishlistID,
          Description: editDescriptionInput, // editable
          ImageURL: itemData.purchaseURL, // editable
          PurchaseURL: editPurchaseURL, // editable
          Price: editPrice, // editable
        }),
      }
    )
      .then((res) => res.json())
      // Data retrieved.
      .then((data) => {
        console.log(JSON.stringify(data));
        setShowInputs(!showInputs);
        // window.location.href="/wishlist/" + itemData.wishlistID;
        // fetchUserWishlists();
      })
      // Data not retrieved.
      .catch((e) => {
        console.log(e);
      });
  };

  const showEditInputs = () => {
    setShowInputs(!showInputs);
  };
  // const initializeNameChangeEdit = () => {
  //   setEditNameInput("");
  // }

  const handleNameChangeEdit = (e) => {
    setEditNameInput(e.target.value);
    console.log("name changed");
  };

  const handleDescriptionChangeEdit = (e) => {
    setEditDescriptionInput(e.target.value);
  };

  const handlePurchaseURLChangeEdit = (e) => {
    setEditPurchaseURL(e.target.value);
  };

  const handlePriceChangeEdit = (e) => {
    setEditPrice(e.target.value);
  };

  const isUrl = (url) => url && url.includes("http");

  return (
    <>
      <td>
        {showInputs ? (
          <input
            onChange={handleNameChangeEdit}
            placeholder={itemData.name}
            className="w-75 text-center"
          />
        ) : (
          <strong>{itemData.name}</strong>
        )}
      </td>
      <td>
        {showInputs ? (
          <input
            onChange={handleDescriptionChangeEdit}
            value={itemData.description}
            className="w-75 text-center"
          />
        ) : (
          itemData.description
        )}
      </td>
      <td>
        {isUrl(itemData.imageURL) ? (
          <img
            width="100px"
            height="100px"
            src={itemData.imageURL}
            alt={itemData.name}
          ></img>
        ) : (
          "N/A"
        )}
      </td>
      <td>
        {showInputs ? (
          <input
            onChange={handlePurchaseURLChangeEdit}
            value={itemData.purchaseURL}
            className="w-75 text-center"
          />
        ) : (
          <a href={itemData.purchaseURL} target="blank">
            Purchase
          </a>
        )}
      </td>
      <td>
        {showInputs ? (
          <input
            onCharge={handlePriceChangeEdit}
            value={formatPrice(itemData.price)}
            className="w-75 text-center"
          />
        ) : (
          formatPrice(itemData.price)
        )}
      </td>
      <td>
        <button
          className="button"
          onClick={() =>
            toggleCompletedStatus(itemData.wishlistID, itemData.id)
          }
        >
          {itemData.isComplete ? "✔" : "❌"}
        </button>
      </td>
      <td>
        {showInputs ? (
          <div>
            <button
              className="btn btn-sm btn-success m-1"
              onClick={() => updateItem()}
            >
              Confirm
            </button>
            <button
              className="btn btn-sm btn-warning"
              onClick={
                () => showEditInputs()
                // wishlist.id,
                // wishlist.name,
                // wishlist.password,
                // wishlist.dueDate
              }
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="btn btn-sm btn-info"
            onClick={
              () => showEditInputs()
              // wishlist.id,
              // wishlist.name,
              // wishlist.password,
              // wishlist.dueDate
            }
          >
            Update
          </button>
        )}
      </td>
    </>
  );
};

export default Item;
