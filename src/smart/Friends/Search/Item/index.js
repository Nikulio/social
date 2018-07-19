import React, { Component } from "react";
import {connect} from "react-redux";
import {addFriendToList} from "../../../../actions";

import "./index.css";

class Item extends Component {
  addFriend = () => {
    const storage = window.localStorage;
    const {_id} = this.props.user;
    const userID = JSON.parse(storage.getItem("userID"));
    this.props.addFriendToList(userID, _id);
  }
  render() {
    const {name, email, order} = this.props.user
    return (
      <div className="searchResult__result">
        <div className="searchResult__order">{order}</div>
        <div className='searchResult__title'>name : {name}</div>
        <div className='searchResult__content'>email : {email}</div>
        <div className="searchResult__button" onClick={this.addFriend}>
          <i className="material-icons">
            person_add
          </i>
        </div>
      </div>
    );
  }
}

export default connect(null, {addFriendToList})(Item)
