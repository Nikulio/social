import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import "./index.css"

let LoginForm = props => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="login">Login</label>
                <Field name="login" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <Field name="email" component="input" type="password" />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

LoginForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)

class Login extends Component {
    
    submit = (data) => {
        console.log("--- ", data);
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

export default connect(
    mapStateToProps,
)(Login);
