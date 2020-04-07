import React from "react";
import "./v7CardLinkImage.scss";
import V7Link from "../../v7Link/V7Link";

const V7CardLinkImage = props => {
  const imageStyle = {
    backgroundImage: `url(${props.background})`,
    backgroundPosition: "center",
    backgroundSize: "cover"
  };

  const parentStyle = {
    width: "100%",
    height: props.minHeight
  };

  return (
    <V7Link to={props.url}>
      <div style={parentStyle} class="vol7er-card-link-image__parent">
        <div style={imageStyle} class="vol7er-card-link-image__child">
          <div className={"vol7er-card-link-image__text"}>
            <div>{props.title}</div>
          </div>
        </div>
      </div>
    </V7Link>
  );
};

export default V7CardLinkImage;
