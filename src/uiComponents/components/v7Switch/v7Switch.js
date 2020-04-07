import React from 'react';
import { COLORS } from './../../../variables/constants/constants';
import './v7Switch.scss';
import Switch from "react-switch";
import PropTypes from 'prop-types';

const V7Switch = (props) => {
  return (
    <div className="vol7er-switch">
      <div className="">
        <span className="vol7er-switch__optLeft">
          { props.optLeft }
        </span>
      </div>
      <div>
        <Switch
              checked={props.checked}
              onChange={props.onChange}
              onColor={ COLORS.vol7erTitleGray }
              onHandleColor={ COLORS.white }
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"
        />
      </div>
      <div>
        <span className="vol7er-switch__optRight">
          { props.optRight }
        </span>
      </div>
    </div>
  )
}

V7Switch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func
}

export default V7Switch;