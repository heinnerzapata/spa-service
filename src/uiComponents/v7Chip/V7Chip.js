import React, { Component } from "react";
import "./V7Chip.scss";

class V7Chip extends Component {
  render() {
    return (
      <div className={[this.props.className, "vol7er-chip"].join(" ")}>
        {this.props.children}
      </div>
    );
  }
}

export default V7Chip;
