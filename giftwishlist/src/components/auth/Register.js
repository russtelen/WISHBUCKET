import React, { Component } from "react";
import "animate.css";
import FormErrors from "../util/FormErrors";
import validateForm from "../util/Validation";

class Register extends Component {
  //state variables for form inputs and errors
  state = {
    email: "",
    password: "",
    confirmpassword: "",
    errors: {
      blankfield: false,
      matchedpassword: false,
    },
  };

  handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    //Perform Validation here
    const error = validateForm(event, this.state);

    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error },
      });
    } else {
      //Integrate Auth here on valid form submission
    }
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
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
