import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import VideoCover from "../../uiComponents/videoCover/VideoCover";
import PageContainer from "../../uiComponents/pageContainer/PageContainer";
import { Session } from "containers";
import HomeCoverComponent from "./homeCoverContent";
import { WithTranslation } from "react-i18next";
import "./home.scss";
import { RouteComponentProps } from "react-router-dom";

interface homeProps extends WithTranslation {
  t: any;
}

interface homeState {
  width: number;
}

class Home extends Component<homeProps, homeState, RouteComponentProps> {
  state = {
    width: window.innerWidth,
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
            <HomeCoverComponent t={this.props.t} />
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

export default Home;
