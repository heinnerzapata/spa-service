import React from "react";
import "./v7Card.scss";
import Box from "@material-ui/core/Box";

interface v7CardProps {
  style?: React.CSSProperties;
}

const V7Card: React.SFC<v7CardProps> = (props) => {
  return (
    <Box style={props.style ? props.style : {}} component="div">
      {props.children}
    </Box>
  );
};

export default V7Card;
