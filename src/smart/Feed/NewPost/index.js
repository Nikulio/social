import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import field, {required} from "../../../shared/validation";
import {withRouter} from "react-router-dom";
import {newPost} from "../../../actions";



let NewPostForm = props => {
    const {handleSubmit} = props
    return (
        <form onSubmit={handleSubmit} className="newPost-form form">
            <Field name="title" type="text"
                   component={field} label="Title"
                   validate={[required]}
            />
            <Field name="text" type="text"
                   component={field} label="Full name"
                   validate={[required]}
            />
            <div className="input-wrap">
                <button className="btn" type="submit">Submit</button>
            </div>
        </form>
    )
}

NewPostForm = reduxForm({
    form: 'newPost'
})(NewPostForm)

class NewPost extends Component {
    submit = (data) => {
        const storage = window.localStorage;
        const user = JSON.parse(storage.getItem('user'));
        this.props.newPost(data, user)
    }
    render() {
        return (
            <div>
                <NewPostForm onSubmit={this.submit} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(
    mapStateToProps, {newPost}
)(NewPost));
