import React from 'react';
import cx from 'classnames';
import { createUseStyles } from 'react-jss';
import { COLORS } from 'variables/constants';
import styles from './v7Chip.module.scss';

interface v7ChipProps {
  className?: string;
  lighBack?: boolean;
  color?: string;
}

const useStyles = createUseStyles({
  v7Chip: {
    color: (props: v7ChipProps) => (props.color ? props.color : COLORS.white),
  },
});

const V7Chip: React.SFC<v7ChipProps> = (props) => {
  const classes = useStyles(props);

  return (
    <div className={cx(props.className, styles.vol7erChip, classes.v7Chip)}>
      {props.children}
    </div>
  );
};

export default V7Chip;
