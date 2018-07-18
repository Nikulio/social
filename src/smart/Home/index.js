import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../Header";
import Feed from "../Feed";
import Sidenav from "../Sidenav";
import "./index.css";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Header />
        <div className="content">
          <Sidenav />
          <Feed />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(
  mapStateToProps,
)(Home);
