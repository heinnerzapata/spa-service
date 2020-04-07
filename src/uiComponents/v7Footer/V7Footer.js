import React, { Component } from "react";
import Logo from "../logo/Logo";
import {Footer} from 'react-materialize';
import "./V7Footer.scss";

class V7Footer extends Component {
  render() {
    return (

      <Footer copyrights="&copy 2015 Copyright Text"
        moreLinks={
          <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
        }
        links={
          <ul>
            <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
            <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
            <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
            <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
          </ul>
        }
        className='example vol7er-footer'
        >
          <Logo fontSize={14}></Logo>
          <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
        </Footer>
    );
  }
}

export default V7Footer;
