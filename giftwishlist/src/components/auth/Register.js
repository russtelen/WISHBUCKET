import React, { Component } from "react";
import "animate.css";
import FormErrors from "../util/FormErrors";
import validateForm from "../util/Validation";

// const LOCALHOST = 44361;
const BASE_URL = process.env.REACT_APP_BASE_URL;

class Register extends Component {
  //state variables for form inputs and errors
  state = {
    email: "",
    password: "",
    confirmpassword: "",
    errors: {
      blankfield: false,
      matchedpassword: false,
      failedregister: false
    },
  };

  // helper function...be sure to list the state variables specific to the form
  clearErrors = () => {
    this.setState({
      errors: {
        blankfield: false,
        failedregister: false
      },
    });
  };

  handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    //Perform Validation here
    this.clearErrors();
    const error = validateForm(event, this.state);

    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error },
      });
    } else {
      //Integrate Auth here on valid form submission
      fetch(`${BASE_URL}/Auth/Register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: this.state.email,
          Password: this.state.password,
          ConfirmPassword: this.state.confirmpassword,
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
            window.location.href="/login";
          } else {
            this.setState({
              errors: { ...this.state.errors, ...{failedregister: true} },
            });
          }
        })
        // Data not retrieved.
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
    return (
      <section className="section auth animate__animated animate__fadeInDown">
        <div className="container">
          <h1 className="display-4 mb-4">Register</h1>
          <FormErrors formerrors={this.state.errors} />
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="email"
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
                <input
                  className="input"
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm password"
                  value={this.state.confirmpassword}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">Register</button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
export default Register;
