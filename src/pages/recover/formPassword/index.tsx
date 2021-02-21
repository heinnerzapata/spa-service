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

interface IFormPassword {
  t: any;
  history: any;
  onFormEmailSubmit: (password: string) => void;
}

interface IFormModel {
  password: string;
  passwordConfirm: string;
}

const initFormValue: IFormModel = {
  password: '',
  passwordConfirm: '',
};

const FormPassword: React.FC<IFormPassword> = (props) => {
  const { t } = props;

  const validationsForm = Yup.object().shape({
    password: Yup.string().required(t('errors.forms.required')),
    passwordConfirm: Yup.string()
      .min(8, t('errors.forms.notValidPassword'))
      .required(t('errors.forms.required'))
      .oneOf([Yup.ref('password'), ''], t('errors.forms.confirmNewPassword')),
  });

  const onSubmit = async (password: string, resetForm: any) => {
    props.onFormEmailSubmit(password);
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
              {t('pages.recover.messagePassword')}
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
                  onSubmit(values.password, resetForm);
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
                      <Label for="password" className="font-medium">
                        {t('labels.forms.newPassword')}
                      </Label>
                      <InputGroup className="mb-2" size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-key" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          disabled={isSubmitting}
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="password"
                          id="password"
                          placeholder={t('labels.forms.newPassword')}
                          bsSize="lg"
                        />
                      </InputGroup>
                      {
                        getTextError(touched.password, errors.password)
                        && showError(getTextError(touched.password, errors.password))
                        && touched.password
                      }
                      <Label for="password_conf" className="font-medium">
                        {t('labels.forms.passwordConf')}
                      </Label>
                      <InputGroup className="mb-2" size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-key" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          disabled={isSubmitting}
                          type="password"
                          value={values.passwordConfirm}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="password_conf"
                          id="password_conf"
                          placeholder={t('labels.forms.passwordConf')}
                          bsSize="lg"
                          autoComplete="new-password"
                        />
                      </InputGroup>
                      {
                        getTextError(touched.passwordConfirm, errors.passwordConfirm)
                        && showError(getTextError(touched.passwordConfirm, errors.passwordConfirm))
                        && touched.passwordConfirm
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
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default FormPassword;
