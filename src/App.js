import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history'
import "./App.scss";

import Home from "./pages/home/Home";
import About from "./pages/about/About";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Recover from "./pages/recover/Recover";
import Dashboard from "./pages/dashboard/Dashboard";
import Machines from "./pages/machines/machines";
import Machine from "./pages/machines/containers/machine/machine";
import Profile from "./pages/profile/Profile";

import Header from "./uiComponents/header/Header";
import V7Footer from "./uiComponents/v7Footer/V7Footer";

class App extends Component {
  render() {
    return (
      <section>
        {/*<BrowserRouter> */}
        <Router history={createBrowserHistory({ basename: process.env.PUBLIC_URL })}>
          <section>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
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

export default App;
