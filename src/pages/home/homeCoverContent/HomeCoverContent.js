import React from "react";
import { Row, Col, Grid } from "react-flexbox-grid";
import { V7Card } from "uiComponents/components";
import V7Chip from "uiComponents/v7Chip/V7Chip";
import V7Link from "uiComponents/v7Link/V7Link";
import Logo from "uiComponents/logo/Logo";
import { translate } from "react-i18next";
import { COLORS } from "../../../variables/constants/constants";
import { V7Image } from "uiComponents/components";
import "./HomeCoverContent.scss";

import machine_01 from "../../../static/media/images/machine_01.png";

const HomeCoverComponent = props => {
  const cardStyle = {
    backgroundColor: `rgba(0, 0, 0, 0.5)`
  };

  const { t } = props;

  return (
    <Grid className="vol7er-home-cover">
      <Row center="xs" middle="xs" className="vol7er-home-cover__main-row">
        <Col xs={12} lg={8}>
          <div style={{ transform: `translate(-${window.innerWidth/4}px, ${window.innerWidth/40}px)` }}>
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
                <Logo isStrollTop={false} fontSize={28} />
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
};

export default translate("common")(HomeCoverComponent);
