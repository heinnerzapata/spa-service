import React from "react";
import "./v7Icon.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";

interface v7IconProps {
  color?: string;
  icon: any;
  size: any;
}

const V7Icon: React.SFC<v7IconProps> = (props) => {
  return (
    <FontAwesomeIcon
      className={
        _.isNil(props.color) ? "vol7er-icon vol7er-icon__color" : "vol7er-icon"
      }
      icon={props.icon}
      size={props.size}
      color={props.color}
    />
  );
};

export default V7Icon;
