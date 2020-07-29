import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "./store";
import "./App.scss";
import {
  HomeWrapper,
  SignInWrapper,
  DashboardWrapper,
  SignUpWrapper,
  RecoverWrapper,
} from "wrappers";
// import About from "./pages/about/About";
// import SignUp from "./pages/signup/SignUp";
// import Recover from "./pages/recover/Recover";
// import Dashboard from "./pages/dashboard";
// import Machines from "./pages/machines/machines";
// import Machine from "./pages/machines/containers/machine/machine";
// import Profile from "./pages/profile/Profile";
import { getToken, setToken } from "utilities/token";
import { loginFromToken, userLogOut } from "store/user/actions";
import { V7Footer, V7Header } from "components";
import { IUserState } from "store/user/reducer";

import { ToastContainer } from "react-toastify";

interface IAppProps {
  userReducer: IUserState;
  onLogout: (email: string) => any;
  onLoginFromToken: (token: string) => any;
}

class App extends React.PureComponent<IAppProps, any> {
  componentDidMount() {
    const currentToken = getToken();
    if (currentToken && currentToken !== null && currentToken !== "") {
      this.props.onLoginFromToken(currentToken);
    }
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
          {/* <Route path="/profile" component={Profile} /> */}
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
