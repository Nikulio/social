import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";

import "./index.css"

class Sidenav extends Component {
  render() {
    return (
      <div className="side-nav">
        <Link className="side-nav__element" to="/">Feed</Link>
        <Link className="side-nav__element" to="/friends">Friends</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
)(Sidenav);
