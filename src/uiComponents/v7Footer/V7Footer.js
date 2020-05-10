import React, { Component } from "react";
import Logo from "../logo/Logo";
import { Footer } from "react-materialize";
import "./V7Footer.scss";

class V7Footer extends Component {
  render() {
    return (
      <Footer
        copyrights=""
        moreLinks={
          <a className="grey-text text-lighten-4 right" href="#!">
            {" "}
          </a>
        }
        links={
          <ul>
            <li>
              <a className="grey-text text-lighten-3" href="#!">
                {" "}
              </a>
            </li>
            <li>
              <a className="grey-text text-lighten-3" href="#!">
                {" "}
              </a>
            </li>
          </ul>
        }
        className="example vol7er-footer"
      >
        <Logo fontSize={14}></Logo>
        <p className="grey-text text-lighten-4"></p>
      </Footer>
    );
  }
}

export default V7Footer;
