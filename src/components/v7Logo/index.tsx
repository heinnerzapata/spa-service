import React from "react";
import "./v7Logo.scss";
import cx from "classnames";
import "fonts/orbitron/orbitron.scss";

interface v7LogoProps {
  className?: string;
  fontSize: number;
  isStrollTop: boolean;
}

const V7Logo: React.SFC<v7LogoProps> = (props) => {
  return (
    <section
      className={cx("vol7er-logo", props.className)}
      style={{ fontSize: props.fontSize }}
    >
      <span className="vol7er-logo-text">VOL</span>
      <span
        className={
          props.isStrollTop ? "vol7er-logo-7--grey" : "vol7er-logo-7--orange"
        }
      >
        7
      </span>
      <span className="vol7er-logo-text">ER</span>
    </section>
  );
};

export default V7Logo;
