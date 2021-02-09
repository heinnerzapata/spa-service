import React from 'react';
import {
  Card, CardBody, CardTitle, CardSubtitle, Row, Col,
} from 'reactstrap';

import { Line } from 'react-chartjs-2';

import RegisterHistoryTitleGraphic from './graphic.registerHistory.titles.dashboard';

const lineData = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8],
  datasets: [
    {
      label: 'Income',
      borderWidth: 2,
      backgroundColor: 'rgba(0, 136, 229,.1)',
      borderColor: 'rgb(30, 136, 229)',
      pointBorderColor: 'rgb(30, 136, 229)',
      pointBackgroundColor: 'rgb(30, 136, 229)',
      data: [0, 5, 6, 8, 20, 7, 8, 12],
    },
    {
      label: 'Outcome',
      borderWidth: 2,
      backgroundColor: 'rgba(79,195,247,.1)',
      borderColor: 'rgb(79,195,247)',
      pointBorderColor: 'rgb(79,195,247)',
      pointBackgroundColor: 'rgb(79,195,247)',
      data: [0, 3, 4, 5, 15, 3, 3, 10],
    },
  ],
};

const RegisterHistoryGraphic: React.FC = () => (
  <Card>
    <CardBody>
      <div className="d-flex flex-wrap">
        <div>
          <CardTitle>Register History</CardTitle>
          <CardSubtitle>Overview of managed data</CardSubtitle>
        </div>
        <div className="ml-auto align-self-center">
          <div className="d-flex no-block align-items-center justify-content-center">
            <div>
              <h6 className="text-success">
                <i className="fa fa-circle font-10 mr-2" />
                Total Received
              </h6>
            </div>
            <div className="ml-3">
              <h6 className="text-info">
                <i className="fa fa-circle font-10 mr-2" />
                Registers Saved
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="campaign ct-charts mt-3">
        <div
          className="chart-wrapper"
          style={{ width: '100%', margin: '0 auto', height: 250 }}
        >
          <Line
            data={lineData}
            options={{
              maintainAspectRatio: false,
              legend: {
                display: false,
                labels: { fontFamily: 'Poppins' },
              },
              scales: {
                yAxes: [
                  {
                    stacked: true,
                    gridLines: { display: false },
                    ticks: { fontFamily: 'Poppins' },
                  },
                ],
                xAxes: [
                  {
                    gridLines: { display: false },
                    ticks: { fontFamily: 'Poppins' },
                  },
                ],
              },
            }}
          />
        </div>
      </div>
      <Row className="text-center">
        <Col lg="4" md="4" className="mt-3">
          <RegisterHistoryTitleGraphic textTitle="5098" textSubtitle="Total Received" />
        </Col>
        <Col lg="4" md="4" className="mt-3">
          <RegisterHistoryTitleGraphic textTitle="4156" textSubtitle="Registers Saved" />
        </Col>
        <Col lg="4" md="4" className="mt-3">
          <RegisterHistoryTitleGraphic textTitle="95.5%" textSubtitle="Registers Rate" />
        </Col>
      </Row>
    </CardBody>
  </Card>
);

export default RegisterHistoryGraphic;
