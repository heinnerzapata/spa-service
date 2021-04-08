/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';

import { ThunkDispatch } from 'redux-thunk';
import _ from 'lodash';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import { IAppState } from 'store';
import { IUserState } from 'store/user/reducer';
import { loginFromToken } from 'store/user/actions';
import { getToken } from 'utilities/tokenHelper';
import { V7Preloader } from 'components';

interface IV7MainProps extends RouteComponentProps {
  userReducer: IUserState;
  shouldAuth: boolean;
  children: any;
  onLoginFromToken?: (token: string) => any;
}

interface IV7MainState {
  token: string | null;
}

class V7MainContainer extends React.PureComponent<IV7MainProps, IV7MainState> {
  constructor(props: IV7MainProps) {
    super(props);
    this.state = {
      token: getToken(),
    };
  }

  getPathName = () => window.location.pathname;

  validateProtectedRoute = () => {
    if (
      this.state.token
      && !_.isEmpty(getToken())
      && this.props.onLoginFromToken
    ) {
      const decodedToken: any = jwt.decode(this.state.token);

      if (decodedToken) {
        if (moment().unix() < decodedToken.exp) {
          if (this.props.onLoginFromToken && this.state.token) {
            this.props.onLoginFromToken(this.state.token);
          }
        }
      }
    } else {
      this.props.history.push('/auth/login');
    }
  };

  componentDidMount() {
    this.validateProtectedRoute();
  }

  render() {
    if (
      (this.props.userReducer.isFetching
        && this.props.location.pathname !== '/auth/login')
      || (!this.props.userReducer.isFetching
        && !this.props.userReducer.authenticated)
    ) {
      return <V7Preloader />;
    }

    if (
      !this.props.userReducer.authenticated
      && this.props.userReducer.validated
      && this.props.location.pathname !== '/auth/login'
    ) {
      return <Redirect to="/auth/login" />;
    }

    if (
      this.props.userReducer.authenticated
      && this.props.location.pathname === '/auth/login'
    ) {
      return <Redirect to="/dashboards/main-dashboard" />;
    }

    if (
      !(
        this.props.userReducer.authenticated
        || this.props.location.pathname === '/auth/login'
      )
    ) {
      return <V7Preloader />;
    }

    return this.props.children;
  }
}

const mapStateToProps = (state: IAppState) => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
  onLoginFromToken: (token: string) => dispatch(loginFromToken(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(V7MainContainer));
