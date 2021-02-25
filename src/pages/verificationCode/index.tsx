/* eslint-disable react/no-unused-state */
import React from 'react';
import * as Yup from 'yup';

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
import { V7Logo } from 'components';

import { IUserState } from 'store/user/reducer';

import { RouteComponentProps } from 'react-router-dom';
import { WithTranslation } from 'react-i18next';
import _ from 'lodash';
import queryString from 'query-string';
import { setToken } from 'utilities/tokenHelper';
import { toast } from 'react-toastify';

const defaultSignInRedirectionUrl = '/dashboard';

interface IVerificationCodeProps extends WithTranslation, RouteComponentProps {
  t: any;
  userReducer: IUserState;
  onSignUp?: (userInfo: any) => any;
}

interface IVerificationCodeState {
  canSubmit: boolean;
  nextPage: string;
  resetForm: boolean;
}

interface IFormModel {
  email: string;
  password: string;
  passwordConfirm: string;
  verificationCode: string;
}

const initFormValue: IFormModel = {
  email: '',
  password: '',
  passwordConfirm: '',
  verificationCode: '',
};

class VerificationCode extends React.PureComponent<
IVerificationCodeProps,
IVerificationCodeState
> {
  formRef = React.createRef<any>();

  constructor(props: IVerificationCodeProps) {
    super(props);

    this.state = {
      canSubmit: false,
      nextPage: '',
      resetForm: false,
    };
  }

  componentDidMount() {
    this.setState({ nextPage: this.getNextPage() });
  }

  getNextPage = () => {
    const { t } = this.props;
    const queryParams = queryString.parse(this.props.location.search);

    if (!_.isNil(queryParams.next)) {
      toast.info(`${t('toast.pleaseValidateCredentials')}`);
    }

    return !_.isNil(queryParams.next)
      ? `/${queryParams.next}`
      : defaultSignInRedirectionUrl;
  };

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  submit(model: IFormModel) {
    const { onSignUp } = this.props;

    const signUpModel = {
      email: model.email,
      password: model.password,
      passwordConfirm: model.passwordConfirm,
      verificationCode: model.verificationCode,
    };

    if (onSignUp) {
      onSignUp(signUpModel)
        .then((data: any) => {
          if (data.account) {
            setToken(data.token);
            this.registerSuccess();
          }
        })
        .catch(() => {
          this.errorOnUserRegister();
        });
    }
  }

  registerSuccess = () => {
    const { t } = this.props;
    toast.success(
      `${t('toast.welcome')} ${this.props.userReducer.userInfo.display_name} !!`,
    );
    this.props.history.push('/dashboard');
  };

  errorOnUserRegister = () => {
    const { t } = this.props;
    toast.error(`${t('toast.errorInProcess')}`);
    this.setState({ resetForm: true }, () => {
      this.setState({ resetForm: false });
    });
  };

  onSubmit = async (model: IFormModel, resetForm: any) => {
    this.submit(model);
    resetForm({});
  };

  render() {
    const { t } = this.props;

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

    const validationsForm = Yup.object().shape({
      first_name: Yup.string()
        .min(3, t('errors.forms.notValidFirstName'))
        .required(t('errors.forms.required')),
      last_name: Yup.string()
        .min(3, t('errors.forms.notValidLastName'))
        .required(t('errors.forms.required')),
      display_name: Yup.string()
        .required(t('errors.forms.required'))
        .min(3, t('errors.forms.notValidDisplayName')),
      email: Yup.string()
        .email(t('errors.forms.notValidEmail'))
        .required(t('errors.forms.required')),
      phone_contact: Yup.string()
        .required(t('errors.forms.required'))
        .min(10, t('errors.forms.notValidPhoneContact')),
      password: Yup.string()
        .min(8, t('errors.forms.notValidPassword'))
        .required(t('errors.forms.required')),
      password_conf: Yup.string()
        .min(8, t('errors.forms.notValidPassword'))
        .required(t('errors.forms.required'))
        .oneOf([Yup.ref('password'), ''], t('errors.forms.confirmNewPassword')),
    });

    return (
      <div className="auth-wrapper d-flex no-block justify-content-center align-items-center">
        <div
          className="auth-box text-white"
          style={{ backgroundColor: '#263238fa' }}
        >
          <div id="loginform">
            <div className="logo text-white display-5">
              <span className="db">
                <V7Logo
                  className="vol7er-preloader__logo"
                  isScrollTop={false}
                  fontSize={34}
                />
              </span>
              <h5
                className="text-white font-medium mb-3"
                style={{ fontSize: '18px' }}
              >
                {t('pages.verificationCode.title')}
              </h5>
              <p
                className="op-1 mt-4"
                style={{ fontSize: '18px', borderTop: 'solid 3px #ffb22b' }}
              >
                {t('pages.verificationCode.message')}
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
                    this.onSubmit(values, resetForm);
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
                              <i className="fas fa-at" />
                            </InputGroupText>
                          </InputGroupAddon>
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
                        </InputGroup>
                        {getTextError(touched.email, errors.email)
                          && showError(
                            getTextError(touched.email, errors.email),
                          )
                          && touched.email}
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
                        {getTextError(touched.password, errors.password)
                          && showError(
                            getTextError(touched.password, errors.password),
                          )
                          && touched.password}
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
                        {getTextError(
                          touched.passwordConfirm,
                          errors.passwordConfirm,
                        )
                          && showError(
                            getTextError(
                              touched.passwordConfirm,
                              errors.passwordConfirm,
                            ),
                          )
                          && touched.passwordConfirm}
                        <Label for="verifiactionCode" className="font-medium">
                          {t('labels.forms.verificationCode')}
                        </Label>
                        <InputGroup className="mb-2" size="lg">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-unlock-alt" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            value={values.verificationCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="verifiactionCode"
                            id="verifiactionCode"
                            placeholder={t('labels.forms.verificationCode')}
                            bsSize="lg"
                          />
                        </InputGroup>
                        {getTextError(
                          touched.verificationCode,
                          errors.verificationCode,
                        )
                          && showError(
                            getTextError(
                              touched.verificationCode,
                              errors.verificationCode,
                            ),
                          )
                          && touched.verificationCode}
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
            <div
              style={{ fontSize: '12px' }}
              className="text-center float-right"
            >
              {t('labels.forms.alreadyHaveAnAccount')}
              <a href="/auth/login" className="text-info ml-1">
                <b>{t('labels.forms.logIn')}</b>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VerificationCode;
