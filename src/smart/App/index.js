import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import { initUser } from "../../actions";
import socketIOClient from "socket.io-client";

import Login from "../Login";
import Friends from "../Friends";
import Registration from "../Registration";
import Home from "../Home";
import history from "../../history";


class App extends Component {
  state = {
    endpoint: "http://127.0.0.1:5000",
    userError: false,
  };

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    const storage = window.localStorage;
    const userID = storage.getItem("userID");

    if (userID) {
      console.log("--- ", userID);
      this.props.initUser(userID);
      // history.push("/");
    } else {
      history.push("/login");
    }

    socket.on("userID", (data) => {
      if (Object.keys(data).length > 0) {
        storage.setItem("userID", JSON.stringify(data[0]._id));
        const userID = storage.getItem("userID");
        this.props.initUser(userID);
        history.push("/");
      } else {
        this.setState({
          userError: true,
        });
      }
    });


  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route
          path="/login"
          render={() => <Login userError={this.state.userError} />}
        />
        <Route path="/registration" component={Registration} />;
        <Route path="/friends" component={Friends} />;
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default withRouter(
  connect(
    mapStateToProps,
    { initUser },
  )(App),
);
