import React from 'react';
import PropTypes from 'prop-types';

const V7Padding = (props) => {
  const style = {
    paddingLeft: props.padding ? `${props.padding.left}px` : '0px',
    paddingRight: props.padding ? `${props.padding.right}px` : '0px',
    paddingTop: props.padding ? `${props.padding.top}px` : '0px',
    paddingBottom: props.padding ? `${props.padding.bottom}px` : '0px'
  };
  return (
    <div
      style={style}>
      {props.children}
    </div>
  )
}

V7Padding.propTypes = {
  padding: PropTypes.object
}

export default V7Padding;