import { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errorMsg: "",
  };

  onFailure = (errorMsg) => {
    this.setState({ errorMsg });
  };

  onSuccess = (jwtToken) => {
    const { history } = this.props; // Use history instead of navigate
    Cookies.set("jwt_token", jwtToken, { expires: 2 });
    history.replace("/");
  };

  getData = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch("https://apis.ccbp.in/login", options);
    const data = await response.json();
    if (response.ok) {
      this.onSuccess(data.jwt_token);
    } else {
      this.onFailure(data.error_msg);
    }
  };

  handleUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken) {
      const { history } = this.props;
      history.replace("/");
    }

    const { username, password, errorMsg } = this.state;
    return (
      <div className="bg-login">
        <div className="Lg-Form-container">
          <img
            className="login-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="login-form" onSubmit={this.getData}>
            <label className="form-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="login-input"
              id="username"
              type="text"
              value={username}
              placeholder="Username"
              onChange={this.handleUsername}
            />
            <label className="form-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="login-input"
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={this.handlePassword}
            />
            <button className="login-btn" type="submit">
              Login
            </button>
            {errorMsg && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
