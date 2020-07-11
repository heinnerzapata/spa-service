import React, { Component } from "react";
import { connect } from "react-redux";
import base64 from "base-64";
import UserService from "./../../../services/user.service";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import V7Preloader from "./../../v7Preloader/V7Preloader";
import { setToken, setUserInfo } from "store/user/actions";

class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      token: "",
      isLoading: false,
    };
    this.userService = UserService;
  }

  componentDidMount = () => {
    this.checkCurrentSession();
  };

  checkCurrentSession = () => {
    this.decodeSessionParams();
  };

  checkToken() {
    this.setState({ isLoading: true });
    this.userService
      .checkUserToken(this.state.userInfo.hexId)
      .then((result) => {
        this.setUserInfo(result);
      })
      .catch((error) => {
        if (this.props.onSessionResult) {
          this.props.onSessionResult(false);
        }
        if (this.props.next) {
          this.launchSignInPage();
        }
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  setUserInfo(result) {
    let userInfo = {
      hexId: result.account.hexId,
      email: result.account.email,
      displayName: result.account.displayName,
      avatar: result.account.avatar,
      firstName: result.account.firstName,
      lastName: result.account.lastName,
      phoneContact: result.account.phoneContact,
      company: result.account.company,
    };
    this.props.dispatch(setToken(result.token));
    this.props.dispatch(setUserInfo(userInfo));
    if (this.props.onSessionResult) {
      this.props.onSessionResult(true);
    }
  }

  launchSignInPage = () => {
    const signInQuery = { next: this.props.next };
    this.props.history.push({
      pathname: "/signin",
      search: `?${queryString.stringify(signInQuery)}`,
    });
  };

  decodeSessionParams = () => {
    const userInfo = window.localStorage.getItem("userInfo");
    const token = window.localStorage.getItem("token");

    let userInfoDecoded = {};
    // let tokenDecoded = '';

    if (!_.isNil(userInfo) && userInfo !== "null") {
      userInfoDecoded = JSON.parse(base64.decode(userInfo));
    }

    // if (!_.isNil(token) && token !== 'null') {
    //   tokenDecoded = token;
    // }

    this.setState({ userInfo: userInfoDecoded, token }, () => {
      this.props.dispatch(setToken(token));
      if (
        !_.isEmpty(this.state.userInfo.hexId) &&
        !_.isEmpty(this.state.token)
      ) {
        this.checkToken();
      } else if (this.props.next) {
        this.launchSignInPage();
      }
    });
  };

  render() {
    return (
      <section>
        {!this.state.isLoading ? (
          <section>{this.props.children}</section>
        ) : (
          <V7Preloader />
        )}
      </section>
    );
  }
}

export default connect((state) => state)(withRouter(Session));
