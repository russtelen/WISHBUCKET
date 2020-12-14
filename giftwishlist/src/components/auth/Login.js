import React, { Component } from "react";
import "animate.css";
import FormErrors from "../util/FormErrors";
import validateForm from "../util/Validation";
import { UserAuthContext } from '../UserAuthContext';
import { NavLink } from "react-router-dom";

const LOCALHOST = 44361;

const BASE_URL = process.env.REACT_APP_BASE_URL;

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {
      blankfield: false,
      matchedpassword: false,
    },
  };
  
  // helper function...be sure to list the state variables specific to the form
  clearErrors = () => {
    this.setState({
      errors: {
        blankfield: false,
        //matchedpassword: false
      },
    });
  };

  handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    //Form validation
    this.clearErrors();
    const error = validateForm(event, this.state);

    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error },
      });
    } else {
      //Integrate Auth here on valid form submission
      fetch(`${BASE_URL}Auth/Login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: this.state.email,
          Password: this.state.password,
        }),
      })
        // Response received.
        .then((response) => response.json())
        // Data retrieved.
        .then((json) => {
          console.log(JSON.stringify(json));
          // Store token with session data.
          if (json["status"] === "OK") {
            sessionStorage.setItem("bearer-token", json["token"]);
            sessionStorage.setItem("loggedIn-email", this.state.email);
            // rediredt to Wishlist AFTER sessionStorage updated
            window.location.href="/wishlist";
          } else {
            // error message handling
            console.log("Error in Auth/Login");
          }
        })
        // Data not retrieved
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    const { userAuthenticated, updateUserAuthenticated } = this.context

    return (
      <section className="section auth animate__animated animate__fadeInDown">
        <div className="container">
          <h1 className="display-4 mb-4">Login</h1>
          <FormErrors formerrors={this.state.errors} />
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  id="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <UserAuthContext.Consumer>
                  {({userAuthenticated, updateUserAuthenticated}) => {
                    return (
                        <button 
                          className="button is-success"
                          onClick ={updateUserAuthenticated}
                        >
                          Login
                        </button>
                    );
                  }}
                </UserAuthContext.Consumer>
              </p>
            </div>
          </form>
          <NavLink to="/register">
              Register
          </NavLink>
        </div>
      </section>
    );
  }
}

export default Login;
