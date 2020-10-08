import "./v7Image.scss";

import React, { useEffect } from "react";

import cx from "classnames";

interface v7ImageProps {
  style?: React.CSSProperties;
  className?: string;
  src: string;
  type?: "round" | "square";
  noShadow: boolean;
  flip: boolean;
  width: number;
  height: number;
}

const V7Image: React.SFC<v7ImageProps> = (props) => {
  const getImageTypeClass = (type: string) => {
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

  useEffect(() => {
    console.log(props.src);
  }, [props.src]);

  return (
    <img
      src={props.src}
      alt="render"
      className={cx(
        props.className,
        "vol7er-image",
        getImageTypeClass(props.type ? props.type : ""),
        props.noShadow ? "" : "vol7er-image__shadow",
        props.flip ? "vol7er-image__flip" : ""
      )}
      width={props.width}
      height={props.height}
      style={props.style}
    />
  );
};

export default V7Image;
