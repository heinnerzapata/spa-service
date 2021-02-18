import React from 'react';
import {
  Col, Row, Card, CardBody,
} from 'reactstrap';

const GeneralMaintenanceCards: React.FC = () => (
  <>
    <Row>
      <Col lg="3" md="6">
        <Card>
          <CardBody>
            <div className="d-flex flex-row">
              <div className="round round-lg align-self-center round-info">
                <i className="mdi mdi-shield-outline" />
              </div>
              <div className="ml-2 align-self-center">
                <h3 className="mb-0 font-light">49</h3>
                <h5 className="text-muted mb-0">Total Preventive WO</h5>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col lg="3" md="6">
        <Card>
          <CardBody>
            <div className="d-flex flex-row">
              <div className="round round-lg align-self-center round-danger">
                <i className="mdi mdi-image-broken-variant" />
              </div>
              <div className="ml-2 align-self-center">
                <h3 className="mb-0 font-lgiht">76</h3>
                <h5 className="text-muted mb-0">Total Corrective WO</h5>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col lg="3" md="6">
        <Card>
          <CardBody>
            <div className="d-flex flex-row">
              <div className="round round-lg align-self-center round-primary">
                <i className="mdi mdi-currency-usd" />
              </div>
              <div className="ml-2 align-self-center">
                <h3 className="mb-0 font-lgiht">$1795</h3>
                <h5 className="text-muted mb-0">Avg. Maintenance Cost</h5>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col lg="3" md="6">
        <Card>
          <CardBody>
            <div className="d-flex flex-row">
              <div className="round round-lg align-self-center round-light">
                <i className="mdi mdi-pulse" />
              </div>
              <div className="ml-2 align-self-center">
                <h3 className="mb-0 font-lgiht">54 /day</h3>
                <h5 className="text-muted mb-0">Avg. Monthly Report</h5>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </>
);

export default GeneralMaintenanceCards;
