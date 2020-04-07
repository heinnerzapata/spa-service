import React from 'react';
import { Card } from "react-materialize";
import './v7Card.scss';

const V7Card = (props) => {
  return (
    <Card
      style={props.style}
      className={props.className}
      textClassName={props.textClassName}
      title={props.title}
      actions={props.actions}>
      {props.children}
    </Card>
  );
};

export default V7Card;