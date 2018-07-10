import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from "react-router-dom";
import  { Redirect } from 'react-router-dom'
import Login from "../Login";

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Redirect to='/login'/>
                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default App
