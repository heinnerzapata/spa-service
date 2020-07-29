import React from "react";
import { WithTranslation } from "react-i18next";
import { V7PageTitle, V7Input, V7Icon, V7Button, V7Link } from "components";
import { V7PageContainer } from "containers";
import { Row, Col } from "react-flexbox-grid";
import Formsy, { addValidationRule } from "formsy-react";
import { faAt, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";
import { RouteComponentProps } from "react-router-dom";
import { setToken } from "utilities/token";
import _ from "lodash";
import { ICredentials } from "models";
import { IUserState } from "store/user/reducer";
import styles from "./signUp.module.scss";
import { toast } from "react-toastify";

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

interface IFormModel extends ICredentials {}

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

    this.addValidationRules();
  }

  componentDidMount() {
    this.setState({ nextPage: this.getNextPage() });
  }

  getNextPage = () => {
    const { t } = this.props;
    const queryParams = queryString.parse(this.props.location.search);

    if (!_.isNil(queryParams.next)) {
      debugger;
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

  submit(model: any, props: ISignInProps) {
    const signUpModel = {
      email: model.email,
      display_name: model.display_name,
      password: model.password,
      first_name: model.first_name,
      last_name: model.last_name,
      phone_contact: model.phone_contact,
    };

    if (props.onSignUp) {
      props
        .onSignUp(signUpModel)
        .then((data: any) => {
          if (data.account) {
            debugger;
            setToken(data.token);
            this.validCredentials();
          }
        })
        .catch((error: any) => {
          this.invalidCredentials();
        });
    }
  }

  validCredentials = () => {
    const { t } = this.props;
    toast.success(
      `${t("toast.welcome")} ${this.props.userReducer.userInfo.display_name} !!`
    );
    this.props.history.push("/dashboard");
  };

  invalidCredentials = () => {
    const { t } = this.props;
    toast.error(`${t("toast.invalidCredentials")}`);
    this.setState({ resetForm: true }, () => {
      this.setState({ resetForm: false });
    });
  };

  addValidationRules() {
    addValidationRule("passwordConfirmation", (values, value) => {
      if (values.password !== values.password_conf) {
        return false;
      }
      return true;
    });
  }

  render() {
    const { t } = this.props;
    return (
      <section className={styles.vol7erSignIn}>
        <V7PageTitle title={t("pages.signup.title")} />
        <V7PageContainer
          page="signup"
          marginTop={100}
          isFull
          showPreloader={this.props.userReducer.isFetching}
        >
          <Formsy
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
          </Formsy>
        </V7PageContainer>
      </section>
    );
  }
}

export default SignUp;
