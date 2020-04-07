import React, { Component } from "react";
import { Button } from "react-materialize";
import "./V7Button.scss";

class V7Button extends Component {
  onClick = e => {
    if (this.props.type !== 'submit') {
      e.preventDefault();
      this.props.onClick(e);
    }
  };

  render() {
    return (
        <Button
          waves="light"
          onClick={ e => this.onClick(e)}
          className={ this.props.className }
          type={this.props.type}
          disabled={this.props.disabled}
        >
          {this.props.text}
        </Button>
    );
  }
}

export default V7Button;
