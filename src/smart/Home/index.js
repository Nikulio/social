import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from "react-router-dom";

import Header from "../Header";
import Feed from "../Feed";
import "./index.css";
import {fetchPosts} from "../../actions";

class Home extends Component {

    render() {
        return (
            <div className="Home">
                <Header/>
                <div className="content">
                    <Feed/>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps, {fetchPosts}
)(Home);
