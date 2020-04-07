import React from 'react';
import Stepper from 'react-stepper-horizontal';
import { COLORS } from '../../../variables/constants/constants';

const V7Stepper = (props) => {
  return(
   <section className="vol7er-stepper">
    <Stepper 
      steps={ props.steps } 
      activeStep={ props.activeStep }
      activeColor={ COLORS.vol7erMain }
      completeColor={ COLORS.vol7erMainLight }>
    </Stepper>
   </section>
  );
}

export default V7Stepper;