import React, { Component } from "react";
import {connect} from "react-redux";
import {addFriendToList} from "../../../../actions";

class Item extends Component {
  addFriend = () => {
    const storage = window.localStorage;
    const {_id} = this.props.user;
    const userID = JSON.parse(storage.getItem("userID"));
    this.props.addFriendToList(userID, _id);
  }
  render() {
    const {name} = this.props.user
    return (
      <div className="searchResult__result">
        <div>{name}</div>
        <button onClick={this.addFriend}>Add friend</button>
      </div>
    );
  }
}

export default connect(null, {addFriendToList})(Item)
