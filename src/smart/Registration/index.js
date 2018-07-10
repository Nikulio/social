import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from "react-router-dom";
import {Field, reduxForm} from 'redux-form'

import {createUser} from "../../actions";
import field, {required, email} from "../../shared/validation";


import "./index.css"
import history from "../../history";

let RegistrationForm = props => {
    const {handleSubmit, passMatch} = props
    return (
        <form onSubmit={handleSubmit} className="login-form form">
            <Field name="name" type="text"
                   component={field} label="Full name"
                   validate={[required]}
            />
            <Field name="login" type="text"
                   component={field} label="Login"
                   validate={[required]}
            />
            <Field name="email" type="text"
                   component={field} label="Email"
                   validate={[required, email]}
            />
            <Field name="password" error={!!passMatch} type="password"
                   component={field} label="Password"
                   validate={[required]}
            />
            <Field name="password_repeat" error={!!passMatch} type="password"
                   component={field} label="Once more"
                   validate={[required]}
            />
            {passMatch && (
                <div className="input-wrap">
                    <div className="error-text">passwords don't match</div>
                </div>
            )}
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

    state = {
        notMatch: false
    }

    submit = (data) => {
        if (data.password === data.password_repeat) {
            this.setState({
                notMatch: false
            })
            this.props.createUser(data);
            history.push("/login")
        }
        else {
            this.setState({
                notMatch: true
            })
        }

    }

    render() {
        return (
            <div className="registration">
                <RegistrationForm passMatch={this.state.notMatch} onSubmit={this.submit}/>
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
