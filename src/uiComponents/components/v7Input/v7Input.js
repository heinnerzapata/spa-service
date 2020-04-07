import React, { useEffect } from "react";
import { Input } from "react-materialize";
import { Row, Col } from "react-flexbox-grid";
import { withFormsy } from "formsy-react";
import "./v7Input.scss";

const V7Input = props => {
  const onChange = event => {
    props.setValue(event.currentTarget.value);
  };

  const updateValue = () => {
    if (props.defaultValue) {
      props.setValue(props.defaultValue);
    }
  };

  useEffect(() => {
    updateValue();
    return () => {
      updateValue();
    };
  }, []);

  return (
    <div className="vol7er-input">
      <Row middle="xs">
        <Col className={!props.icon ? "vol7er-input__hide-icon" : ""} xs={1}>
          {props.icon}
        </Col>
        <Col xs={props.icon ? 11 : 12}>
          {/* <Input
            name={props.name}
            s={props.s}
            label={props.label}
            onChange={onChange}
            type={props.type}
            defaultValue={props.defaultValue}
            error={props.getErrorMessage()} /> */}
          <input type="text" />
        </Col>
      </Row>
    </div>
  );
};

export default withFormsy(V7Input);
