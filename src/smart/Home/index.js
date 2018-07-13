import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from "react-router-dom";

import Header from "../Header";
import "./index.css";

class Home extends Component {

    render() {
        return (
            <div className="Home">
                <Header />

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(Home);
