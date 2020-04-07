import React from 'react';
import { Dropdown } from 'react-materialize';
import './v7Dropdown.scss';

const V7Dropdown = (props) => {
  return (
    <Dropdown className="vol7er-dropdown" trigger={
      <span>{props.trigger}</span>
    }>
      {props.list}
    </Dropdown>
  );
};

export default V7Dropdown;
