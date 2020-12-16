import React, { useState, useEffect } from "react";
import WishlistCard from './WishlistCard';
import { NavLink } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL + "api/";

export default function Wishlists() {
  // const [wishlists, setWishlists] = useState([]);
  const [userWishlists, setUserWishlists] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [id, setId] = useState(0);
  const [showInputs, setShowInputs] = useState(false);
  const [editNameInput, setEditNameInput] = useState("");
  const [editPasswordInput, setEditPasswordInput] = useState("");
  const [editDateInput, setEditDateInput] = useState("");

  const fetchUserWishlists = () => {
    const URL = `${BASE_URL}wishlist/owned`;
    fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("bearer-token")}`,
        "Content-Type": "application/json",
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

  //Create Wishlist (POST API)
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
    fetch(BASE_URL + "wishlist/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("bearer-token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Password: password,
        DueDate: dueDate,
      }),
    })
      // Response received.
      .then((response) => {
        console.log(response);
      })
      // Data retrieved.
      .then((json) => {
        setName("");
        setPassword("");
        setDueDate(""); // Clear input.
        fetchUserWishlists();
      })
      // Data not retrieved.
      .catch(function (error) {
        console.log(error);
      });
  };

  //Update Wishlist (PUT)
  const updateWishlist = (id, name, password, dueDate) => {
    fetch(BASE_URL + "wishlist", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("bearer-token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: id,
        Name: name,
        Password: password,
        DueDate: dueDate,
      }),
    })
      .then((res) => res.json())
      // Data retrieved.
      .then((data) => {
        console.log(JSON.stringify(data));
        fetchUserWishlists();
      })
      // Data not retrieved.
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmit = () => {
    updateWishlist(id, editNameInput, editPasswordInput, editDateInput);

    console.log("Wishlist Updated");
  };

  // const handleNameChangeEdit = (e) => {
  //   setEditNameInput(e.target.value);
  // };

  // const handlePasswordChangeEdit = (e) => {
  //   setEditPasswordInput(e.target.value);
  // };

  // const handleDueDateChangeEdit = (e) => {
  //   setEditDateInput(e.target.value);
  // };

  // const showEditInputs = (id, name, password, duedate) => {
  //   //Hide/show inputs
  //   showInputs ? setShowInputs(false) : setShowInputs(true);

  //   setId(id);
  //   console.log(id);

  //   //Set name input
  //   setEditNameInput(name);

  //   //Set password input
  //   if (password !== null) {
  //     setEditPasswordInput(password);
  //   } else {
  //     setEditPasswordInput("");
  //   }

  //   //Set date input
  //   if (duedate !== null) {
  //     setEditDateInput(duedate.split("T")[0].slice(0, 10));
  //   } else {
  //     setEditDateInput(new Date().toISOString().split("T")[0].slice(0, 10));
  //   }
  // };

  // Delete Wishlist (DELETE)
  const deleteWishlist = (id) => {
    fetch(BASE_URL + "wishlist/" + id + "/", {
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
        fetchUserWishlists();
      })
      // Data not retrieved.
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1>
        {"Hello, you're logged-in as "}{" "}
        <span>{sessionStorage.getItem("loggedIn-email")}</span>
      </h1>
      <p className="display-4 my-3 animate__animated animate__fadeInDown">
        Wishlists
      </p>

      {/* CREATE WISHLIST INPUTS */}
      <div id="createInputs" className="animate__animated animate__fadeInDown">
        <input
          placeholder="Wishlist Name"
          type="text"
          value={name}
          onChange={handleNameChange}
          className="mx-1"
        />
        <input
          placeholder="Password (Optional)"
          type="text"
          value={password}
          onChange={handlePasswordChange}
          className="mx-1"
        />
        <input
          type="date"
          value={dueDate}
          onChange={handleDueDateChange}
          className="mx-1"
        />
        <button className="btn btn-sm btn-primary" onClick={createWishlist}>
          Create Wishlist
        </button>
      </div>

      {/* EDIT WISHLIST INPUTS */}
      {/* <div
        id="editInputs"
        style={{ display: showInputs ? "block" : "none" }}
        className="animate__animated animate__fadeInDown"
      >
        <p className="display-4 text-info">Update Wishlist</p>
        <input
          id="editInputName"
          placeholder="Wishlist Name"
          type="text"
          onChange={handleNameChangeEdit}
          value={editNameInput}
          className="mx-1"
        />
        <input
          id="editInputPassword"
          placeholder="Wishlist Password"
          type="text"
          onChange={handlePasswordChangeEdit}
          value={editPasswordInput}
          className="mx-1"
        />
        <input
          id="editInputDate"
          type="date"
          value={editDateInput}
          onChange={handleDueDateChangeEdit}
          className="mx-1"
        />
        <button className="btn btn-sm btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div> */}

      {/* WishLists */}
      {userWishlists.length === 0 ? (
        <p className="my-5">You do not have any wishlists. Create One Above!</p>
      ) : (
        <div className="container">
          <div className="row">
            {userWishlists.map((wishlist, index) => {
              return (
                <div key={index} className="col-sm-12 col-md-6 col-lg-4">
                  <div className="card my-3 animate__animated animate__heartBeat">
                    <div className="card-body">
                      <WishlistCard index={index} wishlist={wishlist}/>
                      
                      {/* <p className="card-title">
                        <NavLink
                          to={"/wishlist/" + wishlist.id}
                          className="nav-link__wishlist"
                        >
                          {wishlist.name}
                        </NavLink>
                      </p>
                      {wishlist.password !== "" ? (
                        <p className="card-text">
                          Password: {wishlist.password}
                        </p>
                      ) : (
                        <p className="card-text">No Password Set</p>
                      )}
                      {wishlist.dueDate === null ? (
                        <p className="card-text">No Due Date Set</p>
                      ) : (
                        <p className="card-text">
                          Due Date: {wishlist.dueDate}
                        </p>
                      )} */}
                      {/* <button
                        className="button is-info is-light mx-2"
                        onClick={() =>
                          showEditInputs(
                            wishlist.id,
                            wishlist.name,
                            wishlist.password,
                            wishlist.dueDate
                          )
                        }
                      >
                        Update
                      </button> */}
                      <button
                        className="button is-danger is-light"
                        onClick={() => deleteWishlist(wishlist.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
