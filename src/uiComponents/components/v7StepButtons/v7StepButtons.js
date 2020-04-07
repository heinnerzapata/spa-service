import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import V7Button from './../../v7Button/V7Button';
import PropTypes from 'prop-types';
import './v7StepButtons.scss';

const V7StepComponent = (props) => {
  const getButtonContentFirst = (props) => {
    if (!props.firstText) return;
    return (
      <Col xs={6} md={2}>
        <V7Button
          text={props.firstText}
          type={props.firstType ? props.firstType : 'click'}
          disabled={props.disabledFirst}
          onClick={props.onClickFirst ? props.onClickFirst : () => { }} />
      </Col>
    );
  }

  const getButtonContentSecond = (props) => {
    if (!props.secondText) return;
    return (
      <Col xs={6} md={2}>
        <V7Button
          text={props.secondText}
          type={props.secondType ? props.secondType: 'click'}
          disabled={props.disabledSecond}
          onClick={props.onClickSecond ? props.onClickSecond : () => { }} />
      </Col>
    );
  }
  return (
    <div className="vol7er-step-component">
      <Row center="xs">
        {getButtonContentFirst(props)}
        {getButtonContentSecond(props)}
      </Row>
    </div>
  );
}

// V7StepComponent.propTypes = {
//   firstText: PropTypes.oneOfType([PropTypes.text, undefined]),
//   secondText: PropTypes.oneOfType([PropTypes.text, undefined]),
//   onClickFirst: PropTypes.oneOfType([PropTypes.func, undefined]),
//   onClickSecond: PropTypes.oneOfType([PropTypes.func, undefined])
// }

export default V7StepComponent;