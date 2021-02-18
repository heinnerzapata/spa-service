import React from 'react';

import {
  Input,
  FormGroup,
  Label,
} from 'reactstrap';

interface ISignUpStep1 {
  values: any;
  t: any;
  getTextError: any;
  showError: any;
  handleChange: any;
  handleBlur: any;
  touched: any;
  errors: any;
}

const SignUpStep1: React.FC<ISignUpStep1> = ({
  values, t, getTextError, showError, handleChange, handleBlur, touched, errors,
}) => (
  <div className="step step1 mt-5 ">
    <div className="row justify-content-md-center">
      <div className="col col-lg-6">
        <div className="">
          <FormGroup className="mb-3">
            <Label for="email" className="font-medium">
              {t('labels.forms.email')}
            </Label>
            <Input
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              id="email"
              placeholder={t('labels.forms.email')}
              bsSize="lg"
            />
          </FormGroup>
          {
            getTextError(touched.email, errors.email)
            && showError(getTextError(touched.email, errors.email))
            && touched.email
          }
          <FormGroup className="mb-3">
            <Label for="password" className="font-medium">
              {t('labels.forms.password')}
            </Label>
            <Input
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              id="password"
              placeholder={t('labels.forms.password')}
              bsSize="lg"
            />
          </FormGroup>
          {
            getTextError(touched.password, errors.password)
            && showError(getTextError(touched.password, errors.password))
            && touched.password
          }
          <FormGroup className="mb-3">
            <Label for="password_conf" className="font-medium">
              {t('labels.forms.password_conf')}
            </Label>
            <Input
              type="password"
              value={values.password_conf}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password_conf"
              id="password_conf"
              placeholder={t('labels.forms.password_conf')}
              bsSize="lg"
            />
          </FormGroup>
          {
            getTextError(touched.password, errors.password)
            && showError(getTextError(touched.password, errors.password))
            && touched.password
          }
        </div>
      </div>
    </div>
  </div>
);

export default SignUpStep1;
