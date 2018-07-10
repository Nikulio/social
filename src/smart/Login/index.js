import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from "react-router-dom";
import { Field, reduxForm } from 'redux-form'

import field, {required} from "../../shared/validation";
import "./index.css"
import {loginUser} from "../../actions";


let LoginForm = props => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit} className="login-form form">
            <Field name="login" type="text"
                   component={field} label="Login"
                   validate={[required]}
            />
            <Field name="password" type="password"
                   component={field} label="Password"
                   validate={[required]}
            />
            <div className="input-wrap">
                <Link to="/registration">New? Create SocAccount</Link>
            </div>
            <div className="input-wrap">
                <button className="btn" type="submit">Submit</button>
            </div>
        </form>
    )
}

LoginForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)

class Login extends Component {
    submit = (data) => {
        this.props.loginUser(data);
    }
    render() {
        return (
            <div className="login">
                <LoginForm onSubmit={this.submit} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(
    mapStateToProps, {loginUser}
)(Login));
