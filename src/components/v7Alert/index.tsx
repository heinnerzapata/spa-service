import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

export enum ALERT_TYPES {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}

interface IV7AlertProps {
  type: ALERT_TYPES;
  message: string;
  title?: string;
}

const V7Alert: React.SFC<IV7AlertProps> = (props) => (
  <Alert severity={props.type}>
    {props.title && <AlertTitle>{props.title}</AlertTitle>}
    {props.message}
  </Alert>
);

export default V7Alert;
