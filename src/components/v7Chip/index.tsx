import React from "react";
import "./v7Chip.scss";
import cx from "classnames";

interface v7ChipProps {
  className?: string;
  lighBack?: boolean;
}

const V7Chip: React.SFC<v7ChipProps> = (props) => {
  return (
    <div className={cx(props.className, "vol7er-chip")}>{props.children}</div>
  );
};

export default V7Chip;
