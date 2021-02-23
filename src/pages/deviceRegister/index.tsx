import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
} from 'reactstrap';

import { V7DeviceCard } from 'components';

import imgIOT from '../../assets/images/big/imgIOT.png';

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
        {/* <Card>
          <CardImg top width="100%" src={imgIOT} />
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the cards content.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card> */}
        <V7DeviceCard />
      </Col>
      <Col xs="12" md="3">
        <V7DeviceCard />
      </Col>
    </Row>
  </div>
);

export default DeviceRegister;
