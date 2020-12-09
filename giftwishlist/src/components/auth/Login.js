import React, { Component } from "react";
import "animate.css";
import FormErrors from "../util/FormErrors";
import validateForm from "../util/Validation";

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
                <button className="button is-success">Login</button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default Login;
