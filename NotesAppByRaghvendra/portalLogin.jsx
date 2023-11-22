import React, { Component } from "react";
import http from "../services/httpService.js";
import auth from "../services/authPassportService.js";
import { Link } from "react-router-dom";
class LoginAuth extends Component {
  state = {
    form: { email: "", password: "" },

    errors: {},
  };
  handleChange = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.form[input.name] = input.value;
    this.setState(s1);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let { form } = this.state;
    if (this.validate(form)) this.login("/login", this.state.form);
  };
  async login(url, obj) {
    try {
      let headerKey = "x-auth-token";
      let response = await http.post(url, obj);
      let { data, headers } = response;
      let token = headers[headerKey];
      alert("Login Successful!");
      console.log("Login token", token);
      console.log("Login Data", data);
      auth.storeToken(token);
      window.location = "/home";
    } catch (ex) {
      let s1 = { ...this.state };
      console.log(ex.response);
      let errMsg = `${ex.response.status} ${ex.response.statusText}`;
      s1.errors.server = errMsg;
      this.setState(s1);
    }
  }
  validate = (user) => {
    let s1 = { ...this.state };
    !user.email
      ? (s1.errors.email = "email must be entered")
      : (s1.errors.email = "");
    !user.password
      ? (s1.errors.password = "password must be entered")
      : (s1.errors.password = "");
    this.setState(s1);
    return !s1.errors.email && !s1.errors.password ? true : false;
  };
  render() {
    let { email, password } = this.state.form;
    let { edit, errors, errMsg } = this.state;
    // console.log(errors);
    return (
      <div className="container border col-lg-4 col-sm-12 p-4 my-4 rounded-5 ">
        <h2 className="text-center">Login</h2>
        <div className="col-12 my-2">
          <div className="form-group">
            <h5>Email</h5>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.handleChange}
            ></input>
            {errors.email ? (
              <span className="text-danger">{errors.email}</span>
            ) : errors.server ? (
              <span className="text-danger">{errors.server}</span>
            ) : (
              ""
            )}
          </div>
        </div>
        <span>We will never share your Details with anyone else.</span>
        <div className="col-12 my-2">
          <div className="form-group">
            <h5>Password</h5>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            ></input>
            {errors.password ? (
              <span className="text-danger">{errors.password}</span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="form-group text-center">
          <button
            className="btn btn-primary m-2 text-center"
            onClick={this.handleSubmit}
          >
            {"Login"}
          </button>
        </div>
        <div className="register text-center">
          <span>New User ?</span>
          <span className="text-info" style={{ cursor: "pointer" }}>
            <Link to="/registration">
              <button className="btn btn-trans border">Sign Up</button>
            </Link>
          </span>
        </div>
      </div>
    );
  }
}
export default LoginAuth;
