import React, { Component } from "react";
import { connect } from "react-redux";

import Search from "./Search";
import {fetchUserFriends} from "../../actions";

class Friends extends Component {

  componentDidUpdate() {
    const {friends} = this.props
    if (friends) {
      this.props.fetchUserFriends(friends);
    }
  }

  render() {
    return (
      <div className="friends-content">
        <Search/>
        <div className="friends">
          Soon...
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { friends: state.user.friends };
}

export default connect(
  mapStateToProps, {fetchUserFriends}
)(Friends);
