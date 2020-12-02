import "./App.scss";

import {
  DashboardWrapper,
  HomeWrapper,
  ProfileWrapper,
  RecoverWrapper,
  SignInWrapper,
  SignUpWrapper,
  CompanyWrapper,
} from "wrappers";
import { Route, Switch } from "react-router-dom";
import { V7Footer, V7Header } from "components";
// import { getToken, setToken } from "utilities/token";
import { setToken } from "utilities/token";
import { loginFromToken, userLogOut } from "store/user/actions";

import { IAppState } from "./store";
import { IUserState } from "store/user/reducer";
import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";

interface IAppProps {
  userReducer: IUserState;
  onLogout: (email: string) => any;
  onLoginFromToken: (token: string) => any;
}

class App extends React.PureComponent<IAppProps, any> {
  componentDidMount() {
    // const currentToken = getToken();
    // if (currentToken && currentToken !== null && currentToken !== "") {
    //   this.props
    //     .onLoginFromToken(currentToken)
    //     .then((result: any) => {})
    //     .catch((error: any) => {});
    // }
  }

  logOut = () => {
    this.props
      .onLogout(this.props.userReducer.userInfo.email)
      .then((result: any) => {
        setToken("");
      });
  };

  render() {
    return (
      <>
        <V7Header userReducer={this.props.userReducer} onLogOut={this.logOut} />
        <Switch>
          <Route exact path="/" component={HomeWrapper} />
          <Route path="/signin" component={SignInWrapper} />
          <Route path="/signup" component={SignUpWrapper} />
          <Route path="/recover/:hash?" component={RecoverWrapper} />
          {/* <Route path="/about" component={About} />
              <Route path="/recover/:token?" component={Recover} /> */}
          <Route path="/company" component={CompanyWrapper} />
          <Route path="/profile" component={ProfileWrapper} />
          <Route path="/dashboard" component={DashboardWrapper} />
          {/* <Route path="/machines/:hexId" component={Machine} />
          <Route path="/machiness" component={Machines} /> */}
        </Switch>
        <V7Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  userReducer: state.userReducer,
});
function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    onLoginFromToken: (token: string) => dispatch(loginFromToken(token)),
    onLogout: (email: string) => dispatch(userLogOut(email)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
