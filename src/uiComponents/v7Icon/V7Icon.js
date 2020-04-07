import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import "./V7Icon.scss";
import _ from 'lodash';

class V7Icon extends Component {
  render() {
    return <FontAwesomeIcon
              className={ _.isNil(this.props.color) ? 'vol7er-icon vol7er-icon__color' : 'vol7er-icon' }
              icon={this.props.icon}
              size={this.props.size}
              color={this.props.color} />;
  }
}

export default V7Icon;
