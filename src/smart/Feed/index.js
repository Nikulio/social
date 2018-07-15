import React, { Component } from "react";
import { connect } from "react-redux";
import NewPost from "./NewPost";
import { withRouter } from "react-router-dom";
import { fetchPosts } from "../../actions";
import "./index.css";

class Feed extends Component {
  displayPosts = () => {
    const { posts } = this.props.user;
    return posts && posts.length > 0 ? (
      posts.map((elem, key) => {
        return (
          <div className="posts__post" key={elem.key}>
            <div className="posts__post-title">#{key + 1} {elem.title}</div>
            <div className="posts__post-text">{elem.text}</div>
          </div>
        );
      })
    ) : (
      <div>No posts :(</div>
    );
  };

  render() {
    return (
      <div className="feed">
        <NewPost />
        <div className="posts">{this.displayPosts()}</div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    (state) => ({
      user: state.user,
    }),
    { fetchPosts },
  )(Feed),
);
