import React, { Component } from "react";
import PropTypes from 'prop-types';
import "../../fonts/orbitron/orbitron.scss";
import "./Logo.scss";

class Logo extends Component {
  render() {
    return (
      <section
      className={["vol7er-logo", this.props.className].join(" ")}
        style={{ fontSize: this.props.fontSize }}
      >
        <span className="vol7er-logo-text">VOL</span>
        <span
          className={
            this.props.isScrollTop
              ? "vol7er-logo-7--grey"
              : "vol7er-logo-7--orange"
          }
        >
          7
        </span>
        <span className="vol7er-logo-text">ER</span>
      </section>
    );
  }
}

Logo.propTypes = {
  className: PropTypes.string,
  fontSize: PropTypes.number,
  isScrollTop: PropTypes.bool
}

export default Logo;
