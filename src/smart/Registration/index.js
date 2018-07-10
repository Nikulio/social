import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from "react-router-dom";
import { Field, reduxForm } from 'redux-form'

import {createUser} from "../../actions";

import "./index.css"
import history from "../../history";

let RegistrationForm = props => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit} className="login-form form">
            <div className="input-wrap">
                <label htmlFor="name">Full name</label>
                <Field name="name" component="input" type="text" />
            </div>
            <div className="input-wrap">
                <label htmlFor="login">Login</label>
                <Field name="login" component="input" type="text" />
            </div>
            <div className="input-wrap">
                <label htmlFor="email">Email</label>
                <Field name="email" component="input" type="text" />
            </div>
            <div className="input-wrap">
                <label htmlFor="password">Password</label>
                <Field name="password" component="input" type="password" />
            </div>
            <div className="input-wrap">
                <label htmlFor="password">Once more</label>
                <Field name="password_repeat" component="input" type="password" />
            </div>
            <div className="input-wrap">
                <button className="btn" type="submit">Submit</button>
            </div>
        </form>
    )
}

RegistrationForm = reduxForm({
    // a unique name for the form
    form: 'registration'
})(RegistrationForm)

class Registration extends Component {
    submit = (data) => {
        this.props.createUser(data);
        history.push("/login")
    }
    render() {
        return (
            <div className="registration">
                <RegistrationForm onSubmit={this.submit} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(
    mapStateToProps, {createUser}
)(Registration));
