import React from 'react';
import { V7Image, V7Icon } from 'components';
import imgIOT from 'assets/images/big/imgIOT.png';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from 'variables/constants/constants';
import styles from './v7DeviceCard.module.scss';

interface v7DeviceCardProps {
  connected?: boolean;
  name: string;
  plate: string;
  img?: string;
  acum: string;
}

const V7DeviceCard: React.FC<v7DeviceCardProps> = (props) => (
  <div className={styles.container}>
    <article className={styles.card}>
      <div className={styles.status} />
      <div className={styles.signal}>
        <V7Icon
          icon={faWifi}
          size="2x"
          blinker={!props.connected}
          color={
            props.connected ? COLORS.deviceConnected : COLORS.deviceDisconnected
          }
        />
      </div>
      <div className={styles.imageContainer}>
        <V7Image
          className={styles.image}
          src={props.img ? props.img : imgIOT}
          type="round"
          width={150}
          height={150}
          noShadow={false}
          flip={false}
        />
      </div>
      <div className={styles.contentContainer}>
        <h3 className={styles.title}>{props.name}</h3>
        <h5 className={styles.plate}>{props.plate}</h5>
        <h1>{props.acum}</h1>
        <h6 className={styles.viewMore}>view more</h6>
      </div>
    </article>
  </div>
);

export default V7DeviceCard;
