import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

export enum ALERT_TYPES {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success",
}

interface v7AlertProps {
  type: ALERT_TYPES;
  message: string;
  title?: string;
}

const V7Alert: React.SFC<v7AlertProps> = (props) => {
  return (
    <Alert severity={props.type}>
      {props.title && <AlertTitle>{props.title}</AlertTitle>}
      {props.message}
    </Alert>
  );
};

export default V7Alert;
