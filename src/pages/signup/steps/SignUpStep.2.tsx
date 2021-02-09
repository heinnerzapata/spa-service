import React from 'react';

import {
  Input,
  FormGroup,
  Label,
} from 'reactstrap';

interface ISignUpStep2 {
  values: any;
  t: any;
  getTextError: any;
  showError: any;
  handleChange: any;
  handleBlur: any;
  touched: any;
  errors: any;
}

const SignUpStep2: React.FC<ISignUpStep2> = ({
  values, t, getTextError, showError, handleChange, handleBlur, touched, errors,
}) => (
  <div className="step step1 mt-5 ">
    <div className="row justify-content-md-center">
      <div className="col col-lg-6">
        <div className="">
          <FormGroup className="mb-3">
            <Label for="username" className="font-medium">
              {t('labels.forms.userName')}
            </Label>
            <Input
              type="text"
              value={values.display_name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="username"
              id="username"
              placeholder={t('labels.forms.userName')}
              bsSize="lg"
            />
          </FormGroup>
          {
            getTextError(touched.display_name, errors.display_name)
              && showError(getTextError(touched.display_name, errors.display_name))
              && touched.display_name
          }
          <FormGroup className="mb-3">
            <Label for="phone_contact" className="font-medium">
              {t('labels.forms.phone_contact')}
            </Label>
            <Input
              type="text"
              value={values.phone_contact}
              onChange={handleChange}
              onBlur={handleBlur}
              name="phone_contact"
              id="phone_contact"
              placeholder={t('labels.forms.phone_contact')}
              bsSize="lg"
            />
          </FormGroup>
        </div>
      </div>
    </div>
  </div>
);

export default SignUpStep2;
