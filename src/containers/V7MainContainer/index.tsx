/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';

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

class V7MainContainer extends React.PureComponent<IV7MainProps> {
  token = getToken();

  getPathName = () => window.location.pathname;

  validateProtectedRoute = () => {
    const token = getToken();

    if (token && !_.isEmpty(getToken()) && this.props.onLoginFromToken) {
      const decodedToken: any = jwt.decode(token);

      if (decodedToken) {
        if (moment().unix() < decodedToken.exp) {
          this.props.onLoginFromToken(token);
        }
      }
    }
  };

  componentDidMount() {
    this.validateProtectedRoute();
  }

  render() {
    if (this.props.userReducer.isFetching) {
      return <V7Preloader />;
    }
    if (this.props.shouldAuth) {
      if (this.token) {
        const { exp }: any = jwt.decode(this.token);

        if (!exp || moment().unix() > exp) {
          return <Redirect to="/auth/login" />;
        }

        return this.props.children;
      }

      return <Redirect to="/auth/login" />;
    }

    if (this.token) {
      const { exp }: any = jwt.decode(this.token);

      if (!exp || moment().unix() > exp) {
        return this.props.children;
      }

      return <Redirect to="/" />;
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
