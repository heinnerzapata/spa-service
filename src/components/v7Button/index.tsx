import React from 'react';
import Button from '@material-ui/core/Button';
import { COLORS } from 'variables/constants';
import { makeStyles } from '@material-ui/styles';

interface v7ButtonProps {
  disabled?: boolean;
  type?: string;
  onClick?: (e: any) => void;
  visualType?: 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
}

const useStyles = makeStyles({
  root: {
    marginRight: '5px',
    marginLeft: '5px',
    color: (props: any) => (props.visualType === 'outlined' ? COLORS.white : COLORS.white),
    backgroundColor: (props: any) => (props.visualType === 'outlined' ? 'transparent' : COLORS.vol7erMain),
    '&:hover': {
      backgroundColor: (props: any) => (props.visualType === 'outlined' ? 'transparent' : COLORS.vol7erMain),
    },
  },
});

const V7Button: React.SFC<v7ButtonProps> = (props) => {
  const onClick = (e: any) => {
    if (props.type !== 'submit') {
      e.preventDefault();
      if (props.onClick) {
        props.onClick(e);
      }
    }
  };

  const classes = useStyles({
    visualType: props.visualType ? props.visualType : 'contained',
  });

  return (
    <Button
      type={props.type === 'submit' ? 'submit' : 'button'}
      className={classes.root}
      disabled={props.disabled}
      onClick={(e) => onClick(e)}
      variant={props.visualType ? props.visualType : 'contained'}
      size={props.size ? props.size : 'medium'}
    >
      {props.children}
    </Button>
  );
};

export default V7Button;
