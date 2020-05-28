import React, { Component } from "react";
import "./V7Preloader.scss";
import { V7Logo } from "components";
// import { Preloader } from "react-materialize";

interface v7PreloaderProps {}

const V7Preloader: React.SFC<v7PreloaderProps> = (props) => {
  return (
    <div className="vol7er-preloader">
      {/* <Preloader flashing /> */}
      <V7Logo
        className="vol7er-preloader__logo"
        isStrollTop={false}
        fontSize={26}
      />
    </div>
  );
};

export default V7Preloader;
