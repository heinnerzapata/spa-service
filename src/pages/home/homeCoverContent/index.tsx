import React from "react";
import { Row, Col, Grid } from "react-flexbox-grid";
import { COLORS } from "../../../variables/constants/constants";
import { V7Image, V7Link, V7Card, V7Logo, V7Chip } from "components";
import { RouteComponentProps } from "react-router-dom";
import "./HomeCoverContent.scss";
import { withRouter } from "react-router";

import machine_01 from "static/media/images/machine_01.png";

interface homeCoverContentProps extends RouteComponentProps {
  t: any;
}

class HomeCoverComponent extends React.PureComponent<homeCoverContentProps> {
  render() {
    const cardStyle = {
      backgroundColor: `rgba(0, 0, 0, 0.5)`,
      paddingTop: `20px`,
      paddingBottom: `20px`,
    };

    const { t } = this.props;
    return (
      <Grid className="vol7er-home-cover">
        <Row center="xs" middle="xs" className="vol7er-home-cover__main-row">
          <Col xs={12} lg={8}>
            <div
              style={{
                transform: `translate(-${window.innerWidth / 4}px, ${
                  window.innerWidth / 40
                }px)`,
              }}
            >
              <V7Image
                noShadow
                flip
                src={machine_01}
                width={window.innerWidth / 2}
                height={window.innerWidth / 2}
              />
            </div>
          </Col>
          <Col xs={12} lg={4}>
            <V7Card style={cardStyle}>
              <Row>
                <Col xs={12}>
                  <V7Logo isStrollTop={false} fontSize={28} />
                </Col>
              </Row>
              <Row center="xs">
                <Col xs={8}>
                  <V7Link to={"/signup"} color={COLORS.white} size={26}>
                    <V7Chip lighBack>{t("pages.home.join")}</V7Chip>
                  </V7Link>
                </Col>
              </Row>
            </V7Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withRouter(HomeCoverComponent);
