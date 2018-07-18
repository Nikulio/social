import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "./Search";

class Friends extends Component {

  displayFriends = () => {
    const { friends } = this.props;
    return friends && friends.length > 0 ? (
      friends.map(elem => {
        return <div>
          {elem.title}
        </div>;
      })
    ) : (
      <div>No friends :(</div>
    );
  };

  render() {
    return (
      <div className="friends-content">
        <Search/>
        <div className="friends">
          {this.displayFriends()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { friends: state.friends };
}

export default connect(
  mapStateToProps,
)(Friends);
