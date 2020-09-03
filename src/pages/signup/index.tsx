import React from "react";
import { WithTranslation } from "react-i18next";
import { V7PageTitle, V7Icon, V7Button, V7Link, V7TextField } from "components";
import { V7PageContainer } from "containers";
import { Row, Col } from "react-flexbox-grid";
import {
  faAt,
  faKey,
  faUser,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import queryString from "query-string";
import { RouteComponentProps } from "react-router-dom";
import { setToken } from "utilities/token";
import _ from "lodash";
import { IUserState } from "store/user/reducer";
import styles from "./signUp.module.scss";
import { toast } from "react-toastify";
import * as Yup from "yup";

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
  email: "",
  display_name: "",
  password: "",
  password_conf: "",
  first_name: "",
  last_name: "",
  phone_contact: "",
};

const defaultSignInRedirectionUrl = "/dashboard";

class SignUp extends React.PureComponent<ISignInProps, ISignInState> {
  formRef = React.createRef<any>();

  constructor(props: ISignInProps) {
    super(props);

    this.state = {
      canSubmit: false,
      nextPage: "",
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
      toast.info(`${t("toast.pleaseValidateCredentials")}`);
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
        .catch((error: any) => {
          this.errorOnUserRegister();
        });
    }
  }

  registerSuccess = () => {
    const { t } = this.props;
    toast.success(
      `${t("toast.welcome")} ${this.props.userReducer.userInfo.display_name} !!`
    );
    this.props.history.push("/dashboard");
  };

  errorOnUserRegister = () => {
    const { t } = this.props;
    toast.error(`${t("toast.errorInProcess")}`);
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
      error: string | undefined
    ): string => {
      return error !== undefined && touched && error !== undefined ? error : "";
    };

    const validationsForm = Yup.object().shape({
      first_name: Yup.string()
        .min(3, t("errors.forms.notValidFirstName"))
        .required(t("errors.forms.required")),
      last_name: Yup.string()
        .min(3, t("errors.forms.notValidLastName"))
        .required(t("errors.forms.required")),
      display_name: Yup.string()
        .required(t("errors.forms.required"))
        .min(3, t("errors.forms.notValidDisplayName")),
      email: Yup.string()
        .email(t("errors.forms.notValidEmail"))
        .required(t("errors.forms.required")),
      phone_contact: Yup.string()
        .required(t("errors.forms.required"))
        .min(10, t("errors.forms.notValidPhoneContact")),
      password: Yup.string()
        .min(8, t("errors.forms.notValidPassword"))
        .required(t("errors.forms.required")),
      password_conf: Yup.string()
        .min(8, t("errors.forms.notValidPassword"))
        .required(t("errors.forms.required"))
        .oneOf([Yup.ref("password"), ""], t("errors.forms.confirmNewPassword")),
    });

    return (
      <section className={styles.vol7erSignIn}>
        <V7PageTitle title={t("pages.signup.title")} />
        <V7PageContainer
          page="signup"
          marginTop={100}
          isFull
          showPreloader={this.props.userReducer.isFetching}
        >
          <Formik
            initialValues={initFormValue}
            validateOnChange={true}
            validateOnBlur={true}
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
              <form onSubmit={handleSubmit}>
                <Row center="xs">
                  <Col xs={12} md={6} xl={4}>
                    <V7TextField
                      id={"first_name"}
                      name={"first_name"}
                      type={"text"}
                      label={t("labels.forms.firstName")}
                      disabled={isSubmitting}
                      error={
                        errors.first_name !== undefined && touched.first_name
                      }
                      value={values.first_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      icon={<V7Icon icon={faUser} size={"2x"} />}
                      errorText={getTextError(
                        touched.first_name,
                        errors.first_name
                      )}
                    />
                  </Col>
                </Row>
                <Row center="xs">
                  <Col xs={12} md={6} xl={4}>
                    <V7TextField
                      id={"last_name"}
                      name={"last_name"}
                      type={"text"}
                      label={t("labels.forms.lastName")}
                      disabled={isSubmitting}
                      error={
                        errors.last_name !== undefined && touched.last_name
                      }
                      value={values.last_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      icon={<V7Icon icon={faUser} size={"2x"} />}
                      errorText={getTextError(
                        touched.last_name,
                        errors.last_name
                      )}
                    />
                  </Col>
                </Row>
                <Row center="xs">
                  <Col xs={12} md={6} xl={4}>
                    <V7TextField
                      id={"last_name"}
                      name={"display_name"}
                      type={"text"}
                      label={t("labels.forms.displayName")}
                      disabled={isSubmitting}
                      error={
                        errors.display_name !== undefined &&
                        touched.display_name
                      }
                      value={values.display_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      icon={<V7Icon icon={faUser} size={"2x"} />}
                      errorText={getTextError(
                        touched.display_name,
                        errors.display_name
                      )}
                    />
                  </Col>
                </Row>
                <Row center="xs">
                  <Col xs={12} md={6} xl={4}>
                    <V7TextField
                      id={"email"}
                      name={"email"}
                      type={"text"}
                      label={t("labels.forms.email")}
                      disabled={isSubmitting}
                      error={errors.email !== undefined && touched.email}
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      icon={<V7Icon icon={faAt} size={"2x"} />}
                      errorText={getTextError(touched.email, errors.email)}
                    />
                  </Col>
                </Row>
                <Row center="xs">
                  <Col xs={12} md={6} xl={4}>
                    <V7TextField
                      id={"phone_contact"}
                      name={"phone_contact"}
                      type={"number"}
                      label={t("labels.forms.phoneContact")}
                      disabled={isSubmitting}
                      error={
                        errors.phone_contact !== undefined &&
                        touched.phone_contact
                      }
                      value={values.phone_contact}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      icon={<V7Icon icon={faPhone} size={"2x"} />}
                      errorText={getTextError(
                        touched.phone_contact,
                        errors.phone_contact
                      )}
                    />
                  </Col>
                </Row>
                <Row center="xs">
                  <Col xs={12} md={6} xl={4}>
                    <V7TextField
                      id={"password"}
                      name={"password"}
                      type={"password"}
                      label={t("labels.forms.password")}
                      disabled={isSubmitting}
                      error={errors.password !== undefined && touched.password}
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      icon={<V7Icon icon={faKey} size={"2x"} />}
                      errorText={getTextError(
                        touched.password,
                        errors.password
                      )}
                    />
                  </Col>
                </Row>
                <Row center="xs">
                  <Col xs={12} md={6} xl={4}>
                    <V7TextField
                      id={"password_conf"}
                      name={"password_conf"}
                      type={"password"}
                      label={t("labels.forms.passwordConf")}
                      disabled={isSubmitting}
                      error={
                        errors.password_conf !== undefined &&
                        touched.password_conf
                      }
                      value={values.password_conf}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      icon={<V7Icon icon={faKey} size={"2x"} />}
                      errorText={getTextError(
                        touched.password_conf,
                        errors.password_conf
                      )}
                    />
                  </Col>
                </Row>
                <Row center="xs">
                  <Col xs={12}>
                    <V7Button
                      type="submit"
                      disabled={!(isValid && dirty)}
                      size="large"
                    >
                      {t("labels.forms.submit")}
                    </V7Button>
                  </Col>
                </Row>
                <Row center="xs" className="">
                  <Col xs={12} className={styles.recover}>
                    <V7Link
                      to={"/signin"}
                      text={t("labels.forms.doYouHaveAnAccount")}
                    />
                  </Col>
                </Row>
              </form>
            )}
          </Formik>
          {/* <Formsy
            onValidSubmit={(model: ICredentials) => {
              this.submit(model, this.props);
            }}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            ref={this.formRef}
          >
            <Row center="xs">
              <Col xs={12} sm={8} lg={4}>
                <Row middle="xs">
                  <Col xs={12}>
                    <V7Input
                      name="first_name"
                      s={12}
                      validations="minLength:3"
                      type="text"
                      validationError={t("errors.forms.notValidFirstName")}
                      label={t("labels.forms.firstName")}
                      icon={<V7Icon icon={faUser} size={"2x"} />}
                      defaultValue=""
                      reset={this.state.resetForm}
                      required
                    />
                  </Col>
                </Row>

                <Row middle="xs">
                  <Col xs={12}>
                    <V7Input
                      name="last_name"
                      s={12}
                      validations="minLength:3"
                      type="text"
                      validationError={t("errors.forms.notValidLastName")}
                      label={t("labels.forms.lastName")}
                      icon={<V7Icon icon={faUser} size={"2x"} />}
                      defaultValue=""
                      reset={this.state.resetForm}
                      required
                    />
                  </Col>
                </Row>

                <Row middle="xs">
                  <Col xs={12}>
                    <V7Input
                      name="display_name"
                      s={12}
                      validations="isExisty"
                      type="text"
                      validationError={t("errors.forms.notValidDisplayName")}
                      label={t("labels.forms.displayName")}
                      icon={<V7Icon icon={faAt} size={"2x"} />}
                      defaultValue=""
                      reset={this.state.resetForm}
                      required
                    />
                  </Col>
                </Row>

                <Row middle="xs">
                  <Col xs={12}>
                    <V7Input
                      name="email"
                      s={12}
                      validations="isExisty,isEmail"
                      type="text"
                      validationError={t("errors.forms.notValidEmail")}
                      label={t("labels.forms.email")}
                      icon={<V7Icon icon={faAt} size={"2x"} />}
                      defaultValue=""
                      reset={this.state.resetForm}
                      required
                    />
                  </Col>
                </Row>

                <Row middle="xs">
                  <Col xs={12}>
                    <V7Input
                      name="phone_contact"
                      s={12}
                      validations="isExisty,minLength:3,isNumeric"
                      type="text"
                      validationError={t("errors.forms.notValidPhoneContact")}
                      label={t("labels.forms.phoneContact")}
                      icon={<V7Icon icon={faAt} size={"2x"} />}
                      defaultValue=""
                      reset={this.state.resetForm}
                      required
                    />
                  </Col>
                </Row>

                <Row middle="xs">
                  <Col xs={12}>
                    <V7Input
                      name="password"
                      type="password"
                      s={12}
                      validations="isExisty,minLength:3"
                      validationError={t("errors.forms.notValidPassword")}
                      label={t("labels.forms.password")}
                      icon={<V7Icon icon={faKey} size={"2x"} />}
                      defaultValue=""
                      reset={this.state.resetForm}
                      required
                    />
                  </Col>
                </Row>

                <Row middle="xs">
                  <Col xs={12}>
                    <V7Input
                      name="password_conf"
                      type="password"
                      s={12}
                      validations="passwordConfirmation"
                      validationError={t("errors.forms.notValidPasswordConf")}
                      label={t("labels.forms.passwordConf")}
                      icon={<V7Icon icon={faKey} size={"2x"} />}
                      reset={this.state.resetForm}
                      required
                    />
                  </Col>
                </Row>

                <Row middle="xs">
                  <Col xs={12}>
                    <V7Button
                      type="submit"
                      disabled={!this.state.canSubmit}
                      size="large"
                    >
                      {t("labels.forms.submit")}
                    </V7Button>
                  </Col>
                </Row>
                <Row middle="xs" className="">
                  <Col xs={12} className={styles.recover}>
                    <V7Link
                      to={"/signin"}
                      text={t("labels.forms.doYouHaveAnAccount")}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Formsy> */}
        </V7PageContainer>
      </section>
    );
  }
}

export default SignUp;
