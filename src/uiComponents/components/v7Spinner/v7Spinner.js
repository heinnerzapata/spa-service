import React from "react";
import { Preloader } from 'react-materialize';

const V7Spinner = props => {
  return (
    <div className="vol7er-spinner">
      <Preloader flashing />
    </div>
  );
};

export default V7Spinner;
