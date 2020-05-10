import React, { Component } from "react";
import { connect } from "react-redux";
import { setMessage } from "../../store/actions/message";
import { Row, Col } from "react-flexbox-grid";
import VideoCover from "../../uiComponents/videoCover/VideoCover";
import PageContainer from "../../uiComponents/pageContainer/PageContainer";
import Session from "../../uiComponents/containers/session/Session";
import HomeCoverComponent from "./homeCoverContent/HomeCoverContent";

import "./Home.scss";

class Home extends Component {
  state = {
    width: window.innerWidth
  };

  _onChange = value => {
    this.props.dispatch(setMessage(value));
  };

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  render() {
    const { width } = this.state;
    const isMobile = width < 992;
    return (
      <Session>
        {!isMobile && (
          <VideoCover>
            <HomeCoverComponent />
          </VideoCover>
        )}
        <PageContainer isMarginTopActivated={true}>
          <Row>
            <Col xs={12} lg={3}></Col>
          </Row>
        </PageContainer>
      </Session>
    );
  }
}

export default connect(state => state)(Home);
