import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import field, { required } from "../../../shared/validation";
import { withRouter } from "react-router-dom";
import { newPost } from "../../../actions";
import "./index.css";

let NewPostForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="newPost-form form">
      <Field
        name="title"
        type="text"
        component={field}
        label="Title"
        validate={[required]}
      />
      <Field
        name="text"
        type="text"
        component={field}
        label="Full name"
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

NewPostForm = reduxForm({
  form: "newPost",
})(NewPostForm);

class NewPost extends Component {
  submit = (data) => {
    const { _id } = this.props.user;
    this.props.newPost(data, _id);
  };

  render() {
    return (
      <div className="newPost">
        <NewPostForm onSubmit={this.submit} />
      </div>
    );
  }
}

export default withRouter(
  connect(
    (state) => ({
      user: state.user,
    }),
    { newPost },
  )(NewPost)
);
