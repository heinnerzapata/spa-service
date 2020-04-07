import React, { Component } from 'react';
import "./V7Preloader.scss";
import Logo from "../logo/Logo";
import { Preloader } from 'react-materialize';

class V7Preloader extends Component {
  render() {
    return (
      <div className="vol7er-preloader">
        <Preloader flashing />
        <Logo
          className="vol7er-preloader__logo"
          isStrollTop={false}
          fontSize={26} />
      </div>
    );
  }

}

export default V7Preloader;