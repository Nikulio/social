import React, {Component} from "react";
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";
import {Redirect} from "react-router-dom";
import socketIOClient from 'socket.io-client'

import Login from "../Login";
import Registration from "../Registration";
import Home from "../Home";
import history from "../../history";


class App extends Component {

    state = {
        endpoint: "http://127.0.0.1:5000",
        userError: false
    }

    componentDidMount() {
        const socket = socketIOClient(this.state.endpoint)
        const storage = window.localStorage;
        const userID = localStorage.getItem('userID');

        socket.on('userID', (data) => {
            console.log("--- kek", data);
            if (Object.keys(data).length > 0) {
                console.log("--- lol", );
                storage.setItem("userID", data.userID)
                history.push("/")
            } else {
                console.log("--- sdfsd");
                this.setState({
                    userError : true
                })
            }
        })

        if (userID) {
            history.push("/")
        } else {
            history.push("/login")
        }
    }

    render() {
        console.log("--- this.state.userError", this.state.userError);
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login"
                           render={ () => <Login userError={this.state.userError} /> }/>
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
