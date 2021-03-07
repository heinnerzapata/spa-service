import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import cx from 'classnames';
import styles from './v7Icon.module.scss';

interface v7IconProps {
  color?: string;
  icon: any;
  size: any;
  className?: string;
  blinker?: boolean;
}

const V7Icon: React.SFC<v7IconProps> = (props) => (
  <FontAwesomeIcon
    className={cx(
      styles.vol7erIcon,
      _.isNil(props.color) ? styles.color : '',
      props.className,
      { [styles.blinker]: props.blinker },
    )}
    icon={props.icon}
    size={props.size}
    color={props.color}
  />
);

export default V7Icon;
