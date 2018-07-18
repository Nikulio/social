import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { acceptFriendship } from "../../actions";
import history from "../../history";

import "./index.css";

class Item extends Component {
  approveFriend = () => {
    const { name } = this.props.user;
    this.props.acceptFriendship();
  };

  render() {
    const { name } = this.props.user;
    return <div onClick={this.approveFriend}>{name}</div>;
  }
}

class Header extends Component {
  state = {
    headerNotif: false,
  };

  handleLogout = () => {
    const storage = window.localStorage;
    storage.removeItem("userID");
    history.push("/login");
  };

  handleNotif = () => {
    this.setState({
      headerNotif: !this.state.headerNotif,
    });
  };

  render() {
    const { name, requests } = this.props.user;
    const friendRequests = requests && requests.length;
    return (
      <div className="header">
        <div className="header__logo">
          <Link to="/">
            <div className="hero-header-item hero-logo" aria-hidden="true">
              <div className="hero-logo-circles">
                <img
                  className="hero-logo-circle"
                  src="https://github-atom-io-herokuapp-com.global.ssl.fastly.net/assets/index-portal-red-semi-085b4e44d49b2ffe935cc1b2b3094ce8.svg"
                  alt="Index portal red semi"
                />
                <img
                  className="hero-logo-circle"
                  src="https://github-atom-io-herokuapp-com.global.ssl.fastly.net/assets/index-portal-red-be5d1b8a52c13bf286560aba3e4c8c30.svg"
                  alt="Index portal red"
                />
                <img
                  className="hero-logo-circle"
                  src="https://github-atom-io-herokuapp-com.global.ssl.fastly.net/assets/index-portal-orange-semi-d2010f0f8e41e03dbf2b5c52166abe4b.svg"
                  alt="Index portal orange semi"
                />
                <img
                  className="hero-logo-circle"
                  src="https://github-atom-io-herokuapp-com.global.ssl.fastly.net/assets/index-portal-orange-b3bddfb758b91d22f43d0e14ed8e29da.svg"
                  alt="Index portal orange"
                />
                <img
                  className="hero-logo-circle"
                  src="https://github-atom-io-herokuapp-com.global.ssl.fastly.net/assets/index-portal-yellow-semi-545681fe77ff01659d472bd379a9f38b.svg"
                  alt="Index portal yellow semi"
                />
                <img
                  className="hero-logo-circle"
                  src="https://github-atom-io-herokuapp-com.global.ssl.fastly.net/assets/index-portal-yellow-ff207a58ad4f450ea9ac0e17224b39f1.svg"
                  alt="Index portal yellow"
                />
                <img
                  className="hero-logo-circle"
                  src="https://github-atom-io-herokuapp-com.global.ssl.fastly.net/assets/index-portal-green-semi-2d5bc571ee90e710d93f7ae7ddd06e85.svg"
                  alt="Index portal green semi"
                />
                <img
                  className="hero-logo-circle"
                  src="https://github-atom-io-herokuapp-com.global.ssl.fastly.net/assets/index-portal-green-6ab85a1e7343a232273868031b242806.svg"
                  alt="Index portal green"
                />
                <img
                  className="hero-logo-circle"
                  src="https://github-atom-io-herokuapp-com.global.ssl.fastly.net/assets/index-portal-blue-semi-7333f1323549be50644411b691b173dd.svg"
                  alt="Index portal blue semi"
                />
                <img
                  className="hero-logo-circle"
                  src="https://github-atom-io-herokuapp-com.global.ssl.fastly.net/assets/index-portal-blue-92fc2c151190795bd0147c03d4fb8352.svg"
                  alt="Index portal blue"
                />
              </div>
            </div>
          </Link>
        </div>
        <div className="header__menu">
          <div
            className="header-notifications header__menu-item"
            onClick={this.handleNotif}
          >
            <i className="material-icons">wc</i>
            {friendRequests > 0 && (
              <div className="header-notifications__count">
                {friendRequests}
              </div>
            )}
          </div>
          <div className="header-user header__menu-item">
            <div className="header-user__logo">
              <i className="material-icons">face</i>
            </div>
            <div className="header-user__name">{name}</div>
          </div>
          <div
            className="header-exit header__menu-item"
            onClick={this.handleLogout}
          >
            <i className="material-icons">exit_to_app</i>
            <div className="header-exit__name">Exit</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    (state) => ({
      user: state.user,
    }),
    { acceptFriendship },
  )(Header),
);
