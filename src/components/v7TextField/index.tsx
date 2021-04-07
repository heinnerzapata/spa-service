import React, { useEffect, useState } from 'react';
import { COLORS } from 'variables/constants';
import { V7Icon } from 'components';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Input as InputTrap,
} from 'reactstrap';
import styles from './v7TextField.module.scss';

interface IInputProps {
  id: string;
  name: string;
  error?: boolean;
  default?: string;
  value?: string;
  label: string;
  disabled?: boolean;
  type: any;
  errorText: string;
  icon: any;
  placeholder?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
}

const Input: React.FC<IInputProps> = (props) => {
  const [type, setType] = useState(props.type);
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    setType(props.type);
  }, [props]);

  return (
    <Row middle="xs" start="xs">
      <Col xs={12}>
        <Label for="exampleEmail">{props.label}</Label>
      </Col>
      <Col xs={12}>
        <InputGroup className="mb-2  align-self-center" size="lg">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <V7Icon icon={props.icon} size="1x" />
            </InputGroupText>
          </InputGroupAddon>
          <InputTrap
            disabled={props.disabled}
            type={showPassword ? type : 'text'}
            id={props.id}
            name={props.name}
            helpertext={props.errorText}
            defaultValue={props.default}
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value || ''}
            label={props.label}
            error={props.error}
            placeholder={props.placeholder}
          />
        </InputGroup>
      </Col>
    </Row>
  );
};

export default Input;
