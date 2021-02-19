/* eslint-disable react/no-unused-state */
import React from 'react';
import * as Yup from 'yup';

import {
  Input,
  CustomInput,
  FormGroup,
  Form,
  Row,
  Col,
  Label,
  Button,
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

import authBg2 from 'assets/images/big/v7-auth-bg2.jpg';

interface ISignInProps extends WithTranslation, RouteComponentProps {
  t: any;
  userReducer: IUserState;
  onSignUp?: (userInfo: any) => any;
}

interface ISignInState {
  canSubmit: boolean;
  nextPage: string;
  resetForm: boolean;
}

interface IFormModel {
  email: string;
  display_name: string;
  password: string;
  password_conf: string;
  first_name: string;
  last_name: string;
  phone_contact: string;
}

const initFormValue: IFormModel = {
  email: '',
  display_name: '',
  password: '',
  password_conf: '',
  first_name: '',
  last_name: '',
  phone_contact: '',
};

const defaultSignInRedirectionUrl = '/dashboard';

class SignUp extends React.PureComponent<ISignInProps, ISignInState> {
  formRef = React.createRef<any>();

  constructor(props: ISignInProps) {
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
      display_name: model.display_name,
      password: model.password,
      first_name: model.first_name,
      last_name: model.last_name,
      phone_contact: model.phone_contact,
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
      <div
        className="auth-wrapper align-items-center d-flex"
        style={{
          backgroundImage: `url(${authBg2})`,
          backgroundSize: 'cover',
          height: '100vh',
          flexDirection: 'column-reverse',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container">
          <div>
            <Row className="no-gutters justify-content-center">
              <Col md="6" lg="4" className="text-white" style={{ backgroundColor: '#263238fa' }}>
                <div className="p-4">
                  <h2 className="text-white display-5">
                    {t('pages.signup.hi')}
                    <br />
                    <span style={{ color: '#ffb22b' }} className="font-bold">
                      {t('pages.signup.welcome')}
                      <V7Logo className="vol7er-preloader__logo" isScrollTop={false} fontSize={34} />
                    </span>
                  </h2>
                  <br />
                  <br />
                  <br />
                  <p className="op-1 mt-4" style={{ fontSize: '26px', borderTop: 'solid 3px #ffb22b' }}>
                    {t('pages.signup.message')}
                  </p>
                </div>
              </Col>
              <Col md="6" lg="4" className="text-white" style={{ backgroundColor: '#2b2c2d70' }}>
                <div className="p-4">
                  <h3 className="font-medium mb-3 text-info">
                    {t('pages.signup.title')}
                  </h3>
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
                      // handleSubmit,
                      // isSubmitting,
                      isValid,
                      dirty,
                    }) => (
                      <Form className="mt-3" id="signupform" action="/dashbaords">
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
                            {t('labels.forms.passwordConf')}
                          </Label>
                          <Input
                            type="password"
                            value={values.password_conf}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password_conf"
                            id="password_conf"
                            placeholder={t('labels.forms.passwordConf')}
                            bsSize="lg"
                          />
                        </FormGroup>
                        {
                          getTextError(touched.password_conf, errors.password_conf)
                          && showError(getTextError(touched.password_conf, errors.password_conf))
                          && touched.password_conf
                        }
                        <CustomInput
                          type="checkbox"
                          id="exampleCustomCheckbox"
                          label={t('labels.forms.agreeAllTerms')}
                        />
                        <br />
                        <Row className="mb-3 mt-3">
                          <Col xs="12">
                            <Button
                              type="submit"
                              // onClick={this.doRegister}
                              className={`text-uppercase ${!(isValid && dirty) ? '' : 'disabled'}`}
                              style={{
                                backgroundColor: '#44a0ff',
                                borderColor: '#44a0ff',
                              }}
                              color="primary"
                              size="lg"
                              block
                              disabled={!(isValid && dirty)}
                            >
                              {t('labels.forms.signUp')}
                            </Button>
                          </Col>
                        </Row>
                        <br />
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
                        <br />
                      </Form>
                    )}
                  </Formik>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
