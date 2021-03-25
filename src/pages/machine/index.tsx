import React, { useEffect, useCallback, useMemo } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { V7Image, V7TextField, V7Icon } from 'components';
import Moment from 'react-moment';
import {
  faTractor,
  faAd,
  faWifi,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import { COLORS } from 'variables/constants/constants';
import cx from 'classnames';
import styles from './machine.module.scss';

interface v7MachineProps {
  deviceHistory: any;
  deviceSummary: any;
  onGetDeviceInfo?: (machineId: string) => void;
}

const isDeviceConnected = (updatedAt: string) => {
  const startTime = new Date(updatedAt);
  const endTime = new Date();
  const difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
  const resultInMinutes = Math.round(difference / 60000);

  return resultInMinutes < 10;
};

const getSignal = (connected: boolean) => (
  <V7Icon
    icon={faWifi}
    size="1x"
    blinker={!connected}
    color={connected ? COLORS.deviceConnected : COLORS.deviceDisconnected}
  />
);

const Machine: React.FC<v7MachineProps> = (props) => {
  const checkDeviceInfo = useCallback(() => {
    if (
      props.onGetDeviceInfo
      && (!props.deviceHistory || !props.deviceSummary)
    ) {
      props.onGetDeviceInfo('6b98388');
    }
  }, [props]);

  useEffect(() => {
    checkDeviceInfo();
  }, [checkDeviceInfo, props]);

  return (
    <Grid>
      <Row center="xs">
        <Col xs={12} md={5} lg={4}>
          <V7Image
            src="https://bbrskrental.s3-sa-east-1.amazonaws.com/images/product/S570%20(1)-500.jpeg"
            type="round"
            width={250}
            height={250}
            noShadow={false}
            flip={false}
          />
        </Col>
        <Col xs={12} md={7} lg={8}>
          <Row middle="xs" start="xs">
            <Col xs={12}>
              <V7TextField
                disabled={false}
                type="text"
                id="machineName"
                name="machineName"
                value=""
                onChange={() => null}
                onBlur={() => null}
                placeholder="set machine name"
                label="Name"
                errorText="error"
                icon={faTractor}
              />
            </Col>
          </Row>
          <Row middle="xs" start="xs">
            <Col xs={8} md={5}>
              <V7TextField
                disabled={false}
                type="text"
                id="machinePlate"
                name="machinePlate"
                value=""
                onChange={() => null}
                onBlur={() => null}
                placeholder="set machine plate"
                label="Plate"
                errorText="error"
                icon={faAd}
              />
            </Col>
          </Row>
          {props.deviceSummary && (
            <div
              className={cx(styles.connected, {
                [styles.connected]: isDeviceConnected(
                  props.deviceHistory.updated_at,
                ),
                [styles.notConnected]: !isDeviceConnected(
                  props.deviceHistory.updated_at,
                ),
              })}
            >
              <Row middle="xs" start="xs">
                <Col xs={2} lg={1}>
                  {getSignal(isDeviceConnected(props.deviceHistory.updated_at))}
                </Col>
                <Col xs={8}>
                  <h4 className={styles.deviceId}>
                    {props.deviceSummary?.device_id}
                  </h4>
                </Col>
              </Row>
              <Row middle="xs" start="xs">
                <Col xs={2} lg={1}>
                  <V7Icon icon={faCalendar} size="1x" blinker={false} />
                </Col>
                <Col xs={8}>
                  <h4 className={styles.deviceId}>
                    {'Last update: '}
                    <Moment format="LLL" withTitle>
                      {props.deviceHistory.updated_at}
                    </Moment>
                  </h4>
                </Col>
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </Grid>
  );
};

export default Machine;
