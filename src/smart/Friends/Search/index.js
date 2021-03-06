import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import Item from "./Item";

import field, { required } from "../../../shared/validation";
import { findUser } from "../../../actions";
import "./index.css";

let SearchForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="search-form form">
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
  displaySearchResult = () => {
    const { search } = this.props;
    const res = search.search_friends;
    return res && res.length > 0 ? (
      res.map((element, key) => {
        element.order = key + 1
        return <Item key={element._id} user={element}/>;
      })
    ) : (
      <div />
    );
  };

  render() {

    console.log("--- ", this.props.user.friends);

    return (
      <div className="search">
        <SearchForm onSubmit={this.submit}/>
        <div className="searchResult">{this.displaySearchResult()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
    user : state.user
  };
}

export default connect(
  mapStateToProps,
  { findUser },
)(Search);
