import React from "react";
import PropTypes from "prop-types";
import "./v7Image.scss";

const V7Image = props => {
  const getImageTypeClass = type => {
    let result = "";
    switch (type) {
      case "round": {
        result = "vol7er-image__round";
        break;
      }
      case "square": {
        result = "vol7er-image__square";
        break;
      }
      default:
        break;
    }
    return result;
  };

  return (
    <img
      src={props.src}
      alt="render"
      className={[
        "vol7er-image",
        getImageTypeClass(props.type),
        props.noShadow ? "" : "vol7er-image__shadow",
        props.flip ? "vol7er-image__flip" : ""
      ].join(" ")}
      width={props.width}
      height={props.height}
      style={props.style}
    />
  );
};

V7Image.propTypes = {
  type: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

export default V7Image;
