import React from "react";
import styles from "./v7Icon.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import cx from "classnames";

interface v7IconProps {
  color?: string;
  icon: any;
  size: any;
  className?: string;
}

const V7Icon: React.SFC<v7IconProps> = (props) => {
  return (
    <FontAwesomeIcon
      className={cx(
        styles.vol7erIcon,
        _.isNil(props.color) ? styles.color : "",
        props.className
      )}
      icon={props.icon}
      size={props.size}
      color={props.color}
    />
  );
};

export default V7Icon;
