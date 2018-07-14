import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewPost from "./NewPost";
import {withRouter} from "react-router-dom";
import "./index.css"

class Feed extends Component {
    render() {
        return (
            <div className="feed">
                <NewPost />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(
    mapStateToProps,
)(Feed));
