import React from 'react';

import {
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  Row,
  Col,
  Input,
  Button,
  Label,
} from 'reactstrap';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { V7Logo } from 'components';

interface IFormEmail {
  t: any;
  onFormEmailSubmit: (email: string) => void;
}

interface IFormModel {
  email: string;
}

const initFormValue: IFormModel = {
  email: '',
};

const FormEmail: React.SFC<IFormEmail> = (props) => {
  const { t } = props;

  const validationsForm = Yup.object().shape({
    email: Yup.string()
      .email(t('errors.forms.notValidEmail'))
      .required(t('errors.forms.required')),
  });

  const onSubmit = async (email: string, resetForm: any) => {
    props.onFormEmailSubmit(email);
    resetForm({});
  };

  const getTextError = (
    touched: boolean | undefined,
    error: string | undefined,
  ): string => (error !== undefined && touched && error !== undefined ? error : '');

  const showError = (info: any) => (
    <span className="error">
      *
      {info}
      <br />
    </span>
  );

  return (
    <div className="auth-wrapper d-flex no-block justify-content-center align-items-center">
      <div className="auth-box text-white" style={{ backgroundColor: '#263238fa' }}>
        <div id="loginform">
          <div className="logo text-white display-5">
            <span className="db">
              <V7Logo className="vol7er-preloader__logo" isScrollTop={false} fontSize={34} />
            </span>
            <h5 className="text-white font-medium mb-3" style={{ fontSize: '18px' }}>
              {t('pages.recover.title')}
            </h5>
            <p className="op-1 mt-4" style={{ fontSize: '18px', borderTop: 'solid 3px #ffb22b' }}>
              {t('pages.recover.message')}
            </p>
          </div>
          <Row>
            <Col xs="12">
              <Formik
                initialValues={initFormValue}
                validateOnChange
                validateOnBlur
                validationSchema={validationsForm}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  onSubmit(values.email, resetForm);
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  isValid,
                  dirty,
                }) => (
                  <Form
                    onSubmit={handleSubmit}
                    autoComplete="false"
                    className="mt-3"
                    id="loginform"
                    action="/dashboards"
                  >
                    <FormGroup>
                      <Label for="email" className="font-medium">
                        {t('labels.forms.email')}
                      </Label>
                      <InputGroup className="mb-2" size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="email"
                          name="email"
                          bsSize="lg"
                          id="email"
                          disabled={isSubmitting}
                          placeholder={t('labels.forms.email')}
                          required
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </InputGroup>
                      {
                        getTextError(touched.email, errors.email)
                          && showError(getTextError(touched.email, errors.email))
                          && touched.email
                      }
                    </FormGroup>
                    <Row className="mb-4">
                      <Col xs="12">
                        <Button
                          color="primary"
                          size="lg"
                          type="submit"
                          className="text-uppercase"
                          block
                          disabled={!(isValid && dirty)}
                          style={{
                            backgroundColor: '#44a0ff',
                            borderColor: '#44a0ff',
                          }}
                        >
                          {t('labels.forms.submit')}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
              <div style={{ fontSize: '12px' }} className="text-center float-right">
                {t('labels.forms.alreadyHaveAnAccount')}
                <a
                  href="/auth/login"
                  className="text-info ml-1"
                >
                  <b>
                    {t('labels.forms.logIn')}
                  </b>
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default FormEmail;
