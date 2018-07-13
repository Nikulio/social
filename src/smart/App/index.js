import React, {Component} from "react";
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";
import {Redirect} from "react-router-dom";
import socketIOClient from 'socket.io-client'

import Login from "../Login";
import Registration from "../Registration";
import Home from "../Home";
import history from "../../history";
const storage = window.localStorage

const Wrapper = (props) => {
    return (
        <div className="wrapper">
            {props.children}
        </div>
    )
}

class App extends Component {

    state = {
        endpoint: "http://127.0.0.1:5000",
        userError: false
    }

    componentDidMount() {
        const socket = socketIOClient(this.state.endpoint)
        const userID = storage.getItem('userID');

        socket.on('userID', (data) => {
            console.log("--- kek", data);
            if (Object.keys(data).length > 0) {
                console.log("--- lol", );
                storage.setItem("userID", JSON.stringify(data))
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
        return (
            <Wrapper storage={storage}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login"
                           render={ () => <Login userError={this.state.userError} /> }/>
                    <Route path="/registration" component={Registration}/>;
                </Switch>
            </Wrapper>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default App;
