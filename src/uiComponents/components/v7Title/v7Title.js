import React from 'react';
import PropTypes from 'prop-types';
import './v7Title.scss';
import _ from 'lodash';

const V7Title = (props) => {
  let componentStyle = {
    fontSize: `${props.size}px`,
    fontWeight: (props.bold) ? 'bold' : 'normal'
  }
  return (
    <div className="vol7er-title">
      <span
        className={props.color || "vol7er-title__text"}
        style={ (props.color) ? _.merge(componentStyle, {color: props.color}) : componentStyle}>
        {props.text}
      </span>
    </div>
  )
}

V7Title.propTypes = {
  size: PropTypes.number,
  bold: PropTypes.bool,
  text: PropTypes.string,
  color: PropTypes.string
}

export default V7Title;