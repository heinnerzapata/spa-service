import React from 'react';
import { Row, Col } from 'reactstrap';

import { V7DeviceCard } from 'components';

const MachineRegister: React.FC = () => (
  <div>
    <h4 className="mb-5">Available machines</h4>
    <Row>
      <Col xs="12" sm="6" md="4" lg="3">
        <V7DeviceCard
          connected
          name="Mini Charger 001"
          plate="MC001"
          acum="345.000 KM"
        />
      </Col>
      <Col xs="12" sm="6" md="4" lg="3">
        <V7DeviceCard
          connected
          name="Mini Charger 002"
          plate="MC002"
          img="https://bbrskrental.s3-sa-east-1.amazonaws.com/images/product/S570%20(1)-500.jpeg"
          acum="350.348 KM"
        />
      </Col>
      <Col xs="12" sm="6" md="4" lg="3">
        <V7DeviceCard
          connected={false}
          name="Mini Charger 002"
          plate="MC003"
          img="https://s7d2.scene7.com/is/image/Caterpillar/CM20190926-d30ea-dd374?$cc-g$&fmt=pjpeg"
          acum="23.010 KM"
        />
      </Col>
      <Col xs="12" sm="6" md="4" lg="3">
        <V7DeviceCard
          connected
          name="Mini Charger 003"
          plate="MC004"
          acum="89.310 KM"
        />
      </Col>
    </Row>
  </div>
);

export default MachineRegister;
