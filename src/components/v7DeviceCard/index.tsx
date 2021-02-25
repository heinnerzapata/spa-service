import React from 'react';
import { V7Image } from 'components';
import imgIOT from 'assets/images/big/imgIOT.png';
import styles from './v7DeviceCard.module.scss';

interface v7DeviceCardProps {}

const V7DeviceCard: React.FC<v7DeviceCardProps> = () => (
  <div className={styles.container}>
    <article className={styles.card}>
      <div className={styles.status} />
      <div className={styles.imageContainer}>
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
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Device 1</h1>
      </div>
    </article>
  </div>
);

export default V7DeviceCard;
