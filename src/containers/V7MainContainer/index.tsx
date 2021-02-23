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
  validated: boolean;
}

class V7MainContainer extends React.PureComponent<IV7MainProps, IV7MainState> {
  constructor(props: IV7MainProps) {
    super(props);
    this.state = {
      token: getToken(),
      validated: false,
    };
  }

  getPathName = () => window.location.pathname;

  validateProtectedRoute = () => {
    if (
      this.state.token &&
      !_.isEmpty(getToken()) &&
      this.props.onLoginFromToken
    ) {
      const decodedToken: any = jwt.decode(this.state.token);

      if (decodedToken) {
        if (moment().unix() < decodedToken.exp) {
          if (this.props.onLoginFromToken && this.state.token) {
            this.props.onLoginFromToken(this.state.token);
          }
        }
      }
    }
  };

  componentDidMount() {
    debugger;
    this.validateProtectedRoute();
  }

  componentDidUpdate(prevProps: IV7MainProps) {
    if (prevProps.userReducer !== this.props.userReducer) {
      debugger;
      this.setState({ validated: true });
    }
  }

  render() {
    debugger;
    if (this.props.userReducer.isFetching) {
      return <V7Preloader />;
    }

    if (!this.props.userReducer.authenticated && this.state.validated) {
      return <Redirect to='/auth/login' />;
    }

    if (this.props.shouldAuth && !this.state.validated) {
      if (this.state.token) {
        const { exp }: any = jwt.decode(this.state.token);

        if (!exp || moment().unix() > exp) {
          return <Redirect to='/auth/login' />;
        }

        return this.props.children;
      }

      return <Redirect to='/auth/login' />;
    }

    // if (this.state.token) {
    //   const { exp }: any = jwt.decode(this.state.token);

    //   if (!exp || moment().unix() > exp) {
    //     return this.props.children;
    //   }

    //   return <Redirect to='/' />;
    // }

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
  mapDispatchToProps
)(withRouter(V7MainContainer));
