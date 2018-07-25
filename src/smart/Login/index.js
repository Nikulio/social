import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import socketIOClient from "socket.io-client";

import field, { required } from "../../shared/validation";
import "./index.css";
import { loginUser } from "../../actions";

let LoginForm = (props) => {
  const { handleSubmit, userError } = props;
  return (
    <form onSubmit={handleSubmit} className="login-form form">
      <Field
        name="user"
        type="text"
        component={field}
        label="Login"
        validate={[required]}
      />
      <Field
        name="password"
        type="password"
        component={field}
        label="Password"
        validate={[required]}
      />
      {userError && (
        <div className="input-wrap">
          <div className="error-text">access denied</div>
        </div>
      )}
      <div className="input-wrap">
        <Link to="/registration">New? Create Account</Link>
      </div>

      <div className="input-wrap">
        <button className="btn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

LoginForm = reduxForm({
  // a unique name for the form
  form: "login",
})(LoginForm);

class Login extends Component {

  state = {
    endpoint: "http://127.0.0.1:5000",
    userError: false,
  };

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on("userID", (data) => {
      if (data === null) {
        this.setState({
          userError: true
        })
      } else {
        this.setState({
          userError: false
        })
      }
    })
  }


  componentWillUnmount() {
    this.setState({
      userError: false
    })
  }


  submit = (data) => {
    this.props.loginUser(data);
  };

  render() {
    const { userError } = this.state;
    return (
      <div className="login">
        <LoginForm userError={userError} onSubmit={this.submit} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default withRouter(
  connect(
    mapStateToProps,
    { loginUser },
  )(Login),
);
