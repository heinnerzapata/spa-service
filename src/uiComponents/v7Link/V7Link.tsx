import React from "react";
import "./V7Link.scss";
import { Link } from "react-router-dom";
import { COLORS } from "../../variables/constants/constants";

interface v7LinkProps {
  color: string;
  size: number;
  text: string;
  to: string;
  children: any;
}

const V7Link: React.SFC<v7LinkProps> = (props) => {
  const linkStyle = {
    color: props.color ? props.color : COLORS.vol7erOrange,
    fontSize: props.size ? `${props.size}px` : "16px",
  };

  const getContent = (props: v7LinkProps) => {
    return props.text ? props.text : props.children;
  };

  return (
    <Link className="vol7er-link" to={props.to} style={linkStyle}>
      {getContent(props)}
    </Link>
  );
};

export default V7Link;
