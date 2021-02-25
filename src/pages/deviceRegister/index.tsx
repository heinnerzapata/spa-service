import React from 'react';
import {
  Row,
  Col,
} from 'reactstrap';

import { V7DeviceCard } from 'components';

const DeviceRegister: React.FC = () => (
  <div>
    <h4 className="mb-5">Available devices</h4>
    <Row>
      <Col xs="12" md="3">
        <V7DeviceCard />
      </Col>
      <Col xs="12" md="3">
        <V7DeviceCard />
      </Col>
      <Col xs="12" md="3">
        <V7DeviceCard />
      </Col>
      <Col xs="12" md="3">
        <V7DeviceCard />
      </Col>
    </Row>
  </div>
);

export default DeviceRegister;
