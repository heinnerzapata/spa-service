import React from 'react';

import {
  Stepper,
  Step,
  StepLabel,
} from '@material-ui/core';

import SignUpStep1 from './SignUpStep.1';
import SignUpStep2 from './SignUpStep.2';

interface ISignUpSteps {
  values: any;
  t: any;
  getTextError: any;
  showError: any;
  handleChange: any;
  handleBlur: any;
  touched: any;
  errors: any;
}

const SignUpSteps: React.FC<ISignUpSteps> = ({
  values, t, getTextError, showError, handleChange, handleBlur, touched, errors,
}) => {
  const steps = [
    {
      component: <SignUpStep1
        values={values}
        t={t}
        getTextError={getTextError}
        showError={showError}
        handleChange={handleChange}
        handleBlur={handleBlur}
        touched={touched}
        errors={errors}
      />,
      name: 'Basic info',
    },
    {
      component: <SignUpStep2
        values={values}
        t={t}
        getTextError={getTextError}
        showError={showError}
        handleChange={handleChange}
        handleBlur={handleBlur}
        touched={touched}
        errors={errors}
      />,
      name: 'Basic details',
    },
  ];

  return (
    <Stepper>
      {steps.map((step: any, key: number) => (
        <Step key={key}>
          <StepLabel>{step.name}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default SignUpSteps;
