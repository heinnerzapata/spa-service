import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import "./V7Message.scss";
import {
  faExclamationCircle,
  faTimes,
  faCheck,
  V7Icon,
} from "@fortawesome/free-solid-svg-icons";

const MESSAGES_TYPES = {
  ALERT: "alert",
  CONFIRM: "confirm",
  ERROR: "error",
};

class V7Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageClass: "vol7er-message__text-alert",
      messageIcon: faExclamationCircle,
    };

    this.getMessageType = this.getMessageType.bind(this);
  }

  componentDidMount() {
    this.getMessageType(this.props.type);
  }

  getMessageType(messageType) {
    switch (messageType) {
      case MESSAGES_TYPES.ALERT: {
        this.setState({
          messageClass: "vol7er-message__text-alert",
          messageIcon: faExclamationCircle,
        });
        break;
      }
      case MESSAGES_TYPES.ERROR: {
        this.setState({
          messageClass: "vol7er-message__text-error",
          messageIcon: faTimes,
        });
        break;
      }
      case MESSAGES_TYPES.CONFIRM: {
        this.setState({
          messageClass: "vol7er-message__text-confirm",
          messageIcon: faCheck,
        });
        break;
      }
      default: {
        this.setState({
          messageClass: "vol7er-message__text-alert",
          messageIcon: faExclamationCircle,
        });
        break;
      }
    }
  }

  render() {
    return (
      <div className="vol7er-message">
        <Row center="xs">
          <Col xs={12} sm={8} lg={4}>
            <div
              className={["vol7er-message__text", this.state.messageClass].join(
                " "
              )}
            >
              <span>{this.props.text}</span>
              <V7Icon icon={this.state.messageIcon} size={"2x"} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default V7Message;
