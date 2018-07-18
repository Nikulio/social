import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import Item from "./Item";

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
  displaySearchResult = () => {
    const { search } = this.props;
    const res = search.search_friends;
    return res && res.length > 0 ? (
      res.map((element) => {
        return <Item key={element._id} user={element}/>;
      })
    ) : (
      <div>Results is empty</div>
    );
  };

  render() {
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
  };
}

export default connect(
  mapStateToProps,
  { findUser },
)(Search);
