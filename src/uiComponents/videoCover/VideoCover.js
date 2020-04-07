import React from "react";
import { Player } from "video-react";
import video from "../../static/media/video/cover1.mp4";
import "./video-react.scss";
import "./VideoCover.scss";

class VideoCover extends React.Component {
  componentDidMount() {
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  handleStateChange(state, prevState) {
    if (state.ended) {
      this.refs.player.play();
    }
  }

  render() {
    return (
      <section className="video-cover">
        <Player ref="player" playsInline={true} autoPlay={true}>
          <source src={video} type="video/mp4" />
        </Player>
        <div className="video-cover__children">
          { this.props.children }
        </div>
        <div className="video-cover__back" />
      </section>
    );
  }
}

export default VideoCover;
