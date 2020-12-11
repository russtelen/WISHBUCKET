import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const BASE_URL = "https://giftwishlist1.azurewebsites.net/api/";

export default function Wishlists() {
  const [wishlists, setWishlists] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dueDate, setDueDate] = useState("");

  const fetchWishlists = () => {
    fetch(BASE_URL + "wishlist", {
      method: "GET",
      header: {
        Authorization: `Bearer ${sessionStorage.getItem("bearer-token")}`,
      },
    }) // this should be changed to 'wishlists' (plural)
      .then((response) => response.json())
      .then((data) => {
        setWishlists(data);
      })
      .catch((err) => {
        console.log(`An error has occurred: ${err}`);
      });
  };

  useEffect(() => {
    fetchWishlists();
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
      .then((response) => {})
      // Data retrieved.
      .then((json) => {
        console.log(JSON.stringify(json));
        setName("");
        setPassword("");
        setDueDate(""); // Clear input.
        fetchWishlists();
      })
      // Data not retrieved.
      .catch(function (error) {
        console.log(error);
      });
  };

  //Update Wishlist (PUT)
  const updateToDo = (name, password, dueDate) => {
    fetch(BASE_URL + "wishlist", {
      method: "PUT",
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
      .then((res) => res.json())
      // Data retrieved.
      .then((data) => {
        console.log(JSON.stringify(data));
        fetchWishlists();
      })
      // Data not retrieved.
      .catch((e) => {
        console.log(e);
      });
  };

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
        fetchWishlists();
      })
      // Data not retrieved.
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <h1>Wishlists</h1>
      {/* Pending change to CARD Format, instead of Table */}
      {/* Add Conditional to display "No Wishlists" if wishlist array is empty */}

      <input
        placeholder="Wishlist Name"
        type="text"
        value={name}
        onChange={handleNameChange}
      />
      <input
        placeholder="Wishlist Password"
        type="text"
        value={password}
        onChange={handlePasswordChange}
      />
      <input type="date" value={dueDate} onChange={handleDueDateChange} />
      <button className="button" onClick={createWishlist}>
        Create Wishlist
      </button>

      <table className="table is-fullwidth">
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Name</th>
            <th>Password</th>
            <th>DueDate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {wishlists.map((wishlist) => (
            <tr>
              {console.log(wishlist.id)}
              {/* <td>{wishlist.Id}</td>  */}
              <td>
                <NavLink
                  to={"/wishlist/" + wishlist.id}
                  className="nav-link__wishlist"
                >
                  {wishlist.name}
                </NavLink>
              </td>
              <td>{wishlist.password}</td>
              <td>{wishlist.dueDate}</td>
              <td>
                <button
                  className="button is-danger is-light"
                  onClick={() => deleteWishlist(wishlist.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

{
  /* <td>
  <input
    type="checkbox"
    value={todo.isComplete}
    checked={todo.isComplete}
    onChange={(e) => updateToDo(todo.id, e.target.checked)}
  />
</td>; */
}
