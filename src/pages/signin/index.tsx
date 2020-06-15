import React from "react";
import { WithTranslation } from "react-i18next";
import {
  V7PageTitle,
  V7PageContainer,
  V7Input,
  V7Icon,
  V7Button,
  V7Link,
} from "components";
import { Row, Col } from "react-flexbox-grid";
import Formsy from "formsy-react";
import faAt from "@fortawesome/fontawesome-free-solid/faAt";
import faKey from "@fortawesome/fontawesome-free-solid/faKey";
import queryString from "query-string";
import { RouteComponentProps } from "react-router-dom";
import _ from "lodash";

import styles from "./signIn.module.scss";

interface signInProps extends WithTranslation, RouteComponentProps {
  t: any;
}

interface signInState {
  isLoading: boolean;
  canSubmit: boolean;
  nextPage: string;
}

const defaultSignInRedirectionUrl = "/dashboard";

class SignIn extends React.PureComponent<signInProps, signInState> {
  constructor(props: signInProps) {
    super(props);

    this.state = {
      isLoading: false,
      canSubmit: false,
      nextPage: "",
    };

    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);

    //this.userService = UserService;
  }

  componentDidMount() {
    this.setState({ nextPage: this.getNextPage() });
  }

  getNextPage = () => {
    const queryParams = queryString.parse(this.props.location.search);
    return !_.isNil(queryParams.next)
      ? `/${queryParams.next}`
      : defaultSignInRedirectionUrl;
  };

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  submit(model: any) {
    // this.setState({ isLoading: true });
    // this.userService
    //   .logInRequest({
    //     email: model.email,
    //     password: model.password,
    //   })
    //   .then((result) => {
    //     this.validCredentials(result);
    //   })
    //   .catch((error) => {
    //     this.invalidCredentials();
    //   });

    debugger;
  }

  validCredentials = (result: any) => {
    // M.toast(this.props.t("pages.signin.welcome"), 1000);
    // let userInfo = {
    //   hexId: result.account.hexId,
    //   email: result.account.email,
    //   displayName: result.account.displayName,
    //   avatar: result.account.avatar,
    //   firstName: result.account.firstName,
    //   lastName: result.account.lastName,
    //   phoneContact: result.account.phoneContact,
    // };
    // this.props.dispatch(setToken(result.token));
    // this.props.dispatch(setUserInfo(userInfo));
    // localStorage.setItem("token", result.token);
    // localStorage.setItem("userInfo", base64.encode(JSON.stringify(userInfo)));
    // this.setState({ isLoading: false });
    // this.props.history.push(this.state.nextPage);
  };

  invalidCredentials = () => {
    // M.toast(this.props.t("pages.signin.invalidCredentials"), 1000);
    this.setState({ isLoading: false });
  };

  render() {
    const { t } = this.props;
    return (
      <section className={styles.vol7erSignIn}>
        <V7PageTitle title={t("pages.signin.title")} />
        <V7PageContainer marginTop={150}>
          <Formsy
            onValidSubmit={this.submit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
          >
            <Row center="xs">
              <Col xs={12} sm={8} lg={4}>
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
                      required
                    />
                  </Col>
                </Row>
                <Row middle="xs">
                  <Col xs={12}>
                    <V7Button
                      text={t("labels.forms.submit")}
                      type="submit"
                      disabled={!this.state.canSubmit}
                    />
                  </Col>
                </Row>
                <Row middle="xs" className="">
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
              </Col>
            </Row>
          </Formsy>
        </V7PageContainer>
      </section>
    );
  }
}

export default SignIn;
