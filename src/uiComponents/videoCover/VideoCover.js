import React from "react";
import video from "../../static/media/video/cover1.mp4";
import "./VideoCover.scss";

class VideoCover extends React.Component {
  render() {
    return (
      <section className="video-cover">
        <video className={"video-cover__video"} loop autoPlay muted>
          <source src={video} type="video/mp4" />
        </video>
        <div className="video-cover__children">{this.props.children}</div>
        <div className="video-cover__back" />
      </section>
    );
  }
}

export default VideoCover;
