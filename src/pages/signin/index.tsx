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
import { ICredentials } from "models";
import { IUserState } from "store/user/reducer";
import styles from "./signIn.module.scss";

interface ISignInProps extends WithTranslation, RouteComponentProps {
  t: any;
  userReducer: IUserState;
  onloginFromCredentials?: (Credentials: ICredentials) => void;
}

interface ISignInState {
  canSubmit: boolean;
  nextPage: string;
}

interface IFormModel extends ICredentials {}

const defaultSignInRedirectionUrl = "/dashboard";

class SignIn extends React.PureComponent<ISignInProps, ISignInState> {
  constructor(props: ISignInProps) {
    super(props);

    this.state = {
      canSubmit: false,
      nextPage: "",
    };
  }

  componentDidMount() {
    this.setState({ nextPage: this.getNextPage() });
  }

  componentDidUpdate(nextProps: ISignInProps) {
    if (nextProps.userReducer.authenticated) {
      this.validCredentials();
    }
  }

  getNextPage = () => {
    const queryParams = queryString.parse(this.props.location.search);
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

  submit(model: IFormModel, props: ISignInProps) {
    if (props.onloginFromCredentials) {
      props.onloginFromCredentials(model);
    }
  }

  validCredentials = () => {
    this.props.history.push(this.state.nextPage);
  };

  invalidCredentials = () => {
    // M.toast(this.props.t("pages.signin.invalidCredentials"), 1000);
  };

  render() {
    const { t } = this.props;
    return (
      <section className={styles.vol7erSignIn}>
        <V7PageTitle title={t("pages.signin.title")} />
        <V7PageContainer
          marginTop={150}
          showPreloader={this.props.userReducer.isFetching}
        >
          <Formsy
            onValidSubmit={(model: ICredentials) => {
              this.submit(model, this.props);
            }}
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
                      size="large"
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
