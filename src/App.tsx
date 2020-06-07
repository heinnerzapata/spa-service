import React from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "./store";
import "./App.scss";
import { HomeWrapper } from "wrappers";
import About from "./pages/about/About";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Recover from "./pages/recover/Recover";
import Dashboard from "./pages/dashboard/Dashboard";
import Machines from "./pages/machines/machines";
import Machine from "./pages/machines/containers/machine/machine";
import Profile from "./pages/profile/Profile";
import { getToken } from "utilities/token";
import { loginFromToken } from "store/user/actions";

import Header from "./uiComponents/header/Header";
import V7Footer from "./uiComponents/v7Footer/V7Footer";

interface IAppProps {
  onLoginFromToken: (token: string) => void;
}

class App extends React.PureComponent<IAppProps, any> {
  componentDidMount() {
    const currentToken = getToken();
    if (currentToken !== null) {
      this.props.onLoginFromToken(currentToken);
    }
  }

  render() {
    return (
      <section>
        {/*<BrowserRouter> */}
        <Router
          history={createBrowserHistory({ basename: process.env.PUBLIC_URL })}
        >
          <section>
            <Header />
            <Switch>
              <Route exact path="/" component={HomeWrapper} />
              <Route path="/about" component={About} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/recover/:token?" component={Recover} />
              <Route path="/profile" component={Profile} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/machines/:hexId" component={Machine} />
              <Route path="/machines" component={Machines} />
            </Switch>
            <V7Footer />
          </section>
        </Router>
      </section>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({});
function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    onLoginFromToken: (token: string) => dispatch(loginFromToken(token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
