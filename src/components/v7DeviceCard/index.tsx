import React from 'react';
import { V7Image } from 'components';
import imgIOT from 'assets/images/big/imgIOT.png';
import styles from './v7DeviceCard.module.scss';

interface v7DeviceCardProps {}

const V7DeviceCard: React.FC<v7DeviceCardProps> = (props) => (
  <div className={styles.container}>
    <article className={styles.card}>
      <div className={styles.cardLink}>
        <V7Image
          className={styles.image}
          src={imgIOT}
          type="round"
          width={150}
          height={150}
          noShadow={false}
          flip={false}
        />
      </div>
    </article>
  </div>
);

export default V7DeviceCard;
