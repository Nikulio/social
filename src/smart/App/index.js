import React, {Component} from "react";
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";
import {Redirect} from "react-router-dom";
import Login from "../Login";
import Registration from "../Registration";
import history from "../../history";


class App extends Component {

    componentDidMount() {
        if (1 + 1 === 3) {
            history.push("/login")
        }

    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/login" component={Login}/>;
                    <Route path="/registration" component={Registration}/>;
                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default App;
