import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

import field, { required } from "../../../shared/validation";
import { findUser } from "../../../actions";

let SearchForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="login-form form">
      <Field
        name="login"
        type="text"
        component={field}
        label="type..."
        validate={[required]}
      />
      <div className="input-wrap">
        <button className="btn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

SearchForm = reduxForm({
  form: "search",
})(SearchForm);

class Search extends Component {
  submit = (data) => {
    this.props.findUser(data);
  };
  addFriend = (e) => {
    e.preventDefault();
    console.log("--- ", e.getAttribute("data-from"));
  };
  displaySearchResult = () => {
    const { search } = this.props;
    const res = search.search_friends;
    const storage = window.localStorage;
    const user = JSON.parse(storage.getItem("userID"))
    return res && res.length > 0 ? (
      res.map((element) => {
        return (
          <div className="searchResult__result" key={element._id}>
            <div className="searchResult__result-title">{element.login}</div>
            <a
              href="#"
              className="btn"
              data-from={user}
              data-to={element._id}
              onClick={this.addFriend}
            >
              Add friend
            </a>
          </div>
        );
      })
    ) : (
      <div>Results is empty</div>
    );
  };

  render() {
    return (
      <div className="search">
        <SearchForm onSubmit={this.submit} />
        <div className="searchResult">{this.displaySearchResult()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
  };
}

export default connect(
  mapStateToProps,
  { findUser },
)(Search);
