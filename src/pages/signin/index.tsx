import React from "react";
import { WithTranslation } from "react-i18next";
import { V7PageTitle, V7Icon, V7Button, V7Link, V7TextField } from "components";
import { Formik } from "formik";
import { V7PageContainer } from "containers";
import { Row, Col } from "react-flexbox-grid";
import { faAt, faKey } from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";
import { setToken } from "utilities/token";
import { RouteComponentProps } from "react-router-dom";
import _ from "lodash";
import { ICredentials } from "models";
import { IUserState } from "store/user/reducer";
import styles from "./signIn.module.scss";
import { toast } from "react-toastify";
import * as Yup from "yup";

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

const defaultSignInRedirectionUrl = "/dashboard";

const initFormValue: IFormModel = {
  email: "",
  password: "",
};

class SignIn extends React.PureComponent<ISignInProps, ISignInState> {
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
        .catch((err: any) => {
          this.invalidCredentials();
        });
    }
  }

  validCredentials = () => {
    const { t } = this.props;
    toast.success(
      `${t("toast.welcome")} ${this.props.userReducer.userInfo.display_name} !!`
    );
    this.props.history.push(this.state.nextPage);
  };

  invalidCredentials = () => {
    const { t } = this.props;
    toast.error(`${t("toast.invalidCredentials")}`);
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
        .email(t("errors.forms.notValidEmail"))
        .required(t("errors.forms.required")),
      password: Yup.string()
        .min(8, t("errors.forms.notValidPassword"))
        .required(t("errors.forms.required")),
    });

    const getTextError = (
      touched: boolean | undefined,
      error: string | undefined
    ): string => {
      return error !== undefined && touched && error !== undefined ? error : "";
    };

    return (
      <section className={styles.vol7erSignIn}>
        <V7PageTitle title={t("pages.signin.title")} />
        <V7PageContainer
          page="signin"
          marginTop={150}
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
                    <V7Button
                      type="submit"
                      disabled={!(isValid && dirty)}
                      size="large"
                    >
                      {t("labels.forms.submit")}
                    </V7Button>
                  </Col>
                </Row>
                <Row center="xs" middle="xs" className="">
                  <Col xs={12} className={styles.recover}>
                    <V7Link
                      to={"/recover"}
                      text={t("labels.forms.recoverPassword")}
                    />
                  </Col>
                  <Col xs={12} className={styles.recover}>
                    <V7Link
                      to={"/signup"}
                      text={t("labels.forms.dontHaveAccount")}
                    />
                  </Col>
                </Row>
              </form>
            )}
          </Formik>
        </V7PageContainer>
      </section>
    );
  }
}

export default SignIn;
