import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import { initUser } from "../../actions";
import socketIOClient from "socket.io-client";

import Login from "../Login";
import Registration from "../Registration";
import Header from "../Header";
import history from "../../history";
import Feed from "../Feed";
import Friends from "../Friends";
import Sidenav from "../Sidenav";

import "./index.css";

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
      this.props.initUser(userID);
    } else {
      history.push("/login");
    }

    socket.on("userID", (data) => {
      if (data !== null) {
        storage.setItem("userID", JSON.stringify(data[0]._id));
        const userID = storage.getItem("userID");
        this.props.initUser(userID);
        history.push("/");
      }
    });
  }

  render() {
    return (
      <Switch>
        <Route
          path="/login"
          render={() => <Login userError={this.state.userError} />}
        />
        <Route path="/registration" component={Registration} />;
        <Route
          path="/"
          render={() => {
            return (
              <div className="app">
                <Header />
                <div className="content">
                  <Sidenav />
                  <div className="body">
                    <Switch>
                      <Route exact path="/" component={Feed} />
                      <Route path="/friends" component={Friends} />
                    </Switch>
                  </div>
                </div>
              </div>
            );
          }}
        />;
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
