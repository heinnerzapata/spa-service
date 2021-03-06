import React from 'react';
import { Link } from 'react-router-dom';
import styles from './V7Link.module.scss';
import { COLORS } from '../../variables/constants/constants';

interface v7LinkProps {
  color?: string;
  size?: number;
  text?: string;
  to: string;
  children?: any;
}

const V7Link: React.SFC<v7LinkProps> = (props) => {
  const linkStyle = {
    color: props.color ? props.color : COLORS.vol7erOrange,
    fontSize: props.size ? `${props.size}px` : '16px',
  };

  const getContent = (props2: v7LinkProps) => (props2.text ? props2.text : props2.children);

  return (
    <Link
      className={props.color ? '' : styles.vol7erLink}
      to={props.to}
      style={props.color ? linkStyle : {}}
    >
      {getContent(props)}
    </Link>
  );
};

export default V7Link;
