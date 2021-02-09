import React from 'react';
import { WithTranslation } from 'react-i18next';
import {
  /* Card, CardBody, CardTitle, CardSubtitle, */ Row, Col,
} from 'reactstrap';
// import PerfectScrollbar from 'react-perfect-scrollbar';

import {
  V7Dashboard /* ,V7Sidebar */,
  // GeneralMaintenanceCards,
  // CardBandwidth,
} from 'components';

interface IDashboardProps extends WithTranslation {
  t: any;
}

const Dashboard: React.FC<IDashboardProps> = () => (
  <div>
    <V7Dashboard.GeneralMaintenanceCards />
    <Row>
      <Col lg="4" md="12">
        <V7Dashboard.ManagedWorkOrdersCard />
        <V7Dashboard.DeviceRegistersCountCard />
      </Col>
      <Col md="12" xl="8" xlg="9">
        <V7Dashboard.RegisterHistoryGraphic />
      </Col>
    </Row>
  </div>
);

export default Dashboard;
