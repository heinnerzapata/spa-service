import React, { Component } from "react";
import { V7PageTitle } from "components";
import { V7PageContainer } from "containers";
import { Row, Col } from "react-flexbox-grid";
import { WithTranslation } from "react-i18next";

interface dashboardProps extends WithTranslation {
  t: any;
}

class Dashboard extends Component<dashboardProps> {
  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <V7PageTitle title={t("pages.dashboard.title")} />
        <V7PageContainer page="dashboard" isFull isProtected>
          <Row>
            <Col xs={12} lg={3}>
              Dashboard
            </Col>
          </Row>
        </V7PageContainer>
      </React.Fragment>
    );
  }
}

export default Dashboard;
