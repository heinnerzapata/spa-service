/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { WithTranslation } from 'react-i18next';
import _ from 'lodash';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  CustomInput,
  Form,
  Row,
  Col,
  Label,
  Button,
} from 'reactstrap';

import { Formik } from 'formik';

import { V7Logo } from 'components';
import queryString from 'query-string';
import { setToken } from 'utilities/tokenHelper';
import { RouteComponentProps } from 'react-router-dom';
import { ICredentials } from 'models';
import { IUserState } from 'store/user/reducer';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

interface ISignInProps extends WithTranslation, RouteComponentProps {
  t: any;
  userReducer: IUserState;
  onloginFromCredentials?: (Credentials: ICredentials) => any;
}

interface ISignInState {
  canSubmit: boolean;
  nextPage: string;
  resetForm: boolean;
}

interface IFormModel extends ICredentials {}

const defaultSignInRedirectionUrl = '/dashboards';

const initFormValue: IFormModel = {
  email: '',
  password: '',
};

class SignIn extends React.PureComponent<ISignInProps, ISignInState> {
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

  submit(model: IFormModel) {
    const { onloginFromCredentials } = this.props;
    if (onloginFromCredentials) {
      onloginFromCredentials(model)
        .then((data: any) => {
          if (data.account) {
            setToken(data.token);
            this.validCredentials();
          }
        })
        .catch(() => {
          this.invalidCredentials();
        });
    }
  }

  validCredentials = () => {
    const { t } = this.props;
    toast.success(
      `${t('toast.welcome')} ${this.props.userReducer.userInfo.display_name} !!`,
    );
    this.props.history.push(this.state.nextPage);
  };

  invalidCredentials = () => {
    const { t } = this.props;
    toast.error(`${t('toast.invalidCredentials')}`);
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

    const validationsForm = Yup.object().shape({
      email: Yup.string()
        .email(t('errors.forms.notValidEmail'))
        .required(t('errors.forms.required')),
      password: Yup.string()
        .min(8, t('errors.forms.notValidPassword'))
        .required(t('errors.forms.required')),
    });

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
      <div className="auth-wrapper align-items-center d-flex">
        <div className="container">
          <div>
            <Row className="no-gutters justify-content-center">
              <Col md="6" lg="4" className="text-white" style={{ backgroundColor: '#263238fa' }}>
                <div className="p-4">
                  <h2 className="text-white display-5">
                    {t('pages.signin.hi')}
                    <br />
                    <span style={{ color: '#ffb22b' }} className="font-bold">
                      {t('pages.signin.welcome')}
                      <V7Logo className="vol7er-preloader__logo" isScrollTop={false} fontSize={34} />
                    </span>
                  </h2>
                  <br />
                  <p className="op-1 mt-4" style={{ fontSize: '26px', borderTop: 'solid 3px #ffb22b' }}>
                    {t('pages.signin.message')}
                  </p>
                </div>
              </Col>
              <Col md="6" lg="4" className="text-white" style={{ backgroundColor: '#2b2c2de3' }}>
                <div className="p-4">
                  <h3 className="font-medium mb-3 text-info">
                    {t('pages.signin.title')}
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
                      handleSubmit,
                      isSubmitting,
                      isValid,
                      dirty,
                    }) => (
                      <Form
                        autoComplete="off"
                        onSubmit={handleSubmit}
                        className="mt-3"
                        id="loginform"
                        action="/dashbaords"
                      >
                        <>
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
                              disabled={isSubmitting}
                              type="email"
                              id="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder={t('labels.forms.email')}
                            />
                          </InputGroup>
                          {
                            getTextError(touched.email, errors.email)
                              && showError(getTextError(touched.email, errors.email))
                              && touched.email
                          }
                          <Label for="password" className="mt-3 font-medium">
                            {t('labels.forms.password')}
                          </Label>
                          <InputGroup className="mb-3" size="lg">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fas fa-key" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              disabled={isSubmitting}
                              type="password"
                              id="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder={t('labels.forms.password')}
                            />
                          </InputGroup>
                          {
                            getTextError(touched.password, errors.password)
                              && showError(getTextError(touched.password, errors.password))
                              && touched.password
                          }
                          <div className="d-flex no-block align-items-center mb-4 mt-4">
                            <CustomInput
                              type="checkbox"
                              id="exampleCustomCheckbox"
                              label={t('labels.forms.rememberMe')}
                            />
                            <div className="ml-auto">
                              <a
                                href="/auth/recover"
                                id="to-recover"
                                className="forgot text-white float-right"
                              >
                                <i className="fa fa-lock mr-1" />
                                {t('labels.forms.forgotPassword')}
                              </a>
                            </div>
                          </div>
                          <Row className="mb-3">
                            <Col xs="12">
                              <Button
                                color="primary"
                                className={`${(isValid && dirty) ? '' : 'disabled'}`}
                                style={{
                                  backgroundColor: '#44a0ff',
                                  borderColor: '#44a0ff',
                                }}
                                size="lg"
                                type="submit"
                                block
                                disabled={!(isValid && dirty)}
                              >
                                {t('labels.forms.logIn')}
                              </Button>
                            </Col>
                          </Row>
                          <div style={{ fontSize: '12px' }} className="text-center float-right">
                            {t('labels.forms.dontHaveAnAccount')}
                            <a href="/auth/register" className="text-info ml-1">
                              <b>
                                {t('labels.forms.signUp')}
                              </b>
                            </a>
                          </div>
                          <div style={{ fontSize: '12px' }} className="text-center float-right">
                            {t('labels.forms.doYouHaveAVerificationCode')}
                            <a href="/auth/verification-code" className="text-info ml-1">
                              <b>
                                {t('pages.verificationCode.title')}
                              </b>
                            </a>
                          </div>
                          <br />
                          <br />
                        </>
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

export default SignIn;
