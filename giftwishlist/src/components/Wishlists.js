import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL + "api/";

export default function Wishlists() {
  const [wishlists, setWishlists] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [id, setId] = useState(0);
  const [showInputs, setShowInputs] = useState(false);
  const [editNameInput, setEditNameInput] = useState("");
  const [editPasswordInput, setEditPasswordInput] = useState("");
  const [editDateInput, setEditDateInput] = useState("");
  const [submitDateInput, setSubmitDateInput] = useState("");

  const fetchWishlists = () => {
    fetch(BASE_URL + "wishlist", {
      method: "GET",
      header: {
        Authorization: `Bearer ${sessionStorage.getItem("bearer-token")}`,
      },
    }) // this should be changed to 'wishlists' (plural)
      .then((response) => response.json())
      .then((data) => {
        if (wishlists == undefined) {
          setWishlists([]);
        } else {
          setWishlists(data);
        }
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
      .then((response) => {
        console.log(response);
      })
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
        fetchWishlists();
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

  const handleNameChangeEdit = (e) => {
    setEditNameInput(e.target.value);
  };

  const handlePasswordChangeEdit = (e) => {
    setEditPasswordInput(e.target.value);
  };

  const handleDueDateChangeEdit = (e) => {
    setEditDateInput(e.target.value);
  };

  const showEditInputs = (id, name, password, duedate) => {
    //Hide/show inputs
    showInputs ? setShowInputs(false) : setShowInputs(true);

    setId(id);
    console.log(id);

    //Set name input
    setEditNameInput(name);

    //Set password input
    if (password !== null) {
      setEditPasswordInput(password);
    } else {
      setEditPasswordInput("");
    }

    //Set date input
    if (duedate !== null) {
      setEditDateInput(duedate.split("T")[0].slice(0, 10));
    } else {
      setEditDateInput(new Date().toISOString().split("T")[0].slice(0, 10));
    }
  };


  //For Submit Option on 'Edit WishList' Button
  const handleNameChangeSubmit = (e) => {
    setSubmitNameInput(e.target.value);
  };

  const handlePasswordChangeSubmit = (e) => {
    setSubmitPasswordInput(e.target.value);
  };

  const handleDueDateChangeSubmit = (e) => {
    setSubmitDateInput(e.target.value);
  };

  const showSubmitInputs = (name, password, duedate) => {
    //Hide/show inputs
    showInputs ? setShowInputs(false) : setShowInputs(true);

    //Set name input
    setSubmitNameInput(name);

    //Set password input
    if (password !== null) {
      setSubmitPasswordInput(password);
    } else {
      setSubmitPasswordInput("");
    }

    //Set date input
    if (duedate !== null) {
      setSubmitDateInput(duedate.split("T")[0].slice(0, 10));
    } else {
      setSubmitDateInput(new Date().toISOString().split("T")[0].slice(0, 10));
    }
  };
//End of For Submit Option on 'Edit WishList' Button



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
      <h1>Hello, User (get from AuthDb?)</h1>
      <h1>Wishlists</h1>
      {/* Pending change to CARD Format, instead of Table */}
      {/* Add Conditional to display "No Wishlists" if wishlist array is empty */}

      <div id="createInputs">
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
      </div>

      <div id="editInputs" style={{ display: showInputs ? "block" : "none" }}>
        <input
          id="editInputName"
          placeholder="Wishlist Name"
          type="text"
          onChange={handleNameChangeEdit}
          value={editNameInput}
        />
        <input
          id="editInputPassword"
          placeholder="Wishlist Password"
          type="text"
          onChange={handlePasswordChangeEdit}
          value={editPasswordInput}
        />
        <input
          id="editInputDate"
          type="date"
          value={editDateInput}
          onChange={handleDueDateChangeEdit}
        />
        <button className="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <table className="table is-fullwidth">
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Owner (WishDb)</th>
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
              {/* {console.log(wishlist.id)} */}
              {/* <td>{wishlist.Id}</td>  */}
              <td>{wishlist.ownerId}</td>
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
                  className="button is-info is-light"
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
                </button>
              </td>
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
