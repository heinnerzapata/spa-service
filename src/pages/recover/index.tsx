import {
  ALERT_TYPES,
  V7Alert,
  V7Link,
  V7PageTitle,
} from "components";
import { Col, Row } from "react-flexbox-grid";

import FormEmail from "./formEmail";
import FormPassword from "./formPassword";
import { IUserState } from "store/user/reducer";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { V7PageContainer } from "containers";
import { WithTranslation } from "react-i18next";
import { setToken } from "utilities/token";
import { toast } from "react-toastify";

interface IRecoverProps extends WithTranslation, RouteComponentProps {
  t: any;
  userReducer: IUserState;
  match: any;
  onRecoverPassword: (email: string) => any;
  onRestorePassword: (password: string, hash: string) => any;
  onCheckRecoverHash: (hash: string) => any;
}

interface IRecoverState {
  isPasswordView: boolean;
  isValidHash: boolean;
  isEmailSent: boolean;
  hash: string;
}

class Recover extends React.PureComponent<IRecoverProps, IRecoverState> {
  state = {
    isPasswordView: false,
    isValidHash: false,
    isEmailSent: false,
    hash: "",
  };

  componentDidMount() {
    const hash = this.props.match.params.hash;
    if (hash) {
      this.setState({ isPasswordView: true });
      this.props
        .onCheckRecoverHash(hash)
        .then((result: any) => {
          this.setState({ isValidHash: true, hash });
        })
        .catch((err: any) => {
          this.setState({ isValidHash: false });
        });
    }
  }

  onFormEmailSubmit = async (email: string) => {
    const { t } = this.props;
    try {
      await this.props.onRecoverPassword(email);
      this.setState({ isEmailSent: true });
    } catch (error) {
      toast.error(`${t("toast.invalidEmail")}`);
      this.setState({ isEmailSent: false });
    }
  };

  onFormPasswordSubmit = async (password: string) => {
    const { t } = this.props;
    try {
      const userInfo = await this.props.onRestorePassword(
        password,
        this.state.hash
      );
      toast.success(`${t("password changed")}`);
      setToken(userInfo.token);
      this.props.history.push("/dashboard");
    } catch (error) {
      toast.error(`${t("toast.errorInProcess")}`);
    }
  };

  render() {
    const { t } = this.props;
    return (
      <section>
        <V7PageTitle title={t("pages.recover.title")} />
        <V7PageContainer
          page="recover"
          marginTop={150}
          showPreloader={this.props.userReducer.isFetching}
          isFull
        >
          {this.state.isPasswordView && (
            <React.Fragment>
              {this.state.isValidHash && (
                <FormPassword
                  history={this.props.history}
                  onFormEmailSubmit={this.onFormPasswordSubmit}
                  t={t}
                />
              )}
              {!this.state.isValidHash && (
                <React.Fragment>
                  <Row center="xs">
                    <Col xs={12} md={9} lg={6} xl={4}>
                      <V7Alert
                        type={ALERT_TYPES.ERROR}
                        message={t("labels.forms.emailRecoverTokenError")}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row center="xs">
                    <Col xs={12} md={9} lg={6} xl={4}>
                      <V7Link to={"/"} text={t("labels.forms.return")} />
                    </Col>
                  </Row>
                </React.Fragment>
              )}
            </React.Fragment>
          )}

          {!this.state.isPasswordView && (
            <React.Fragment>
              <FormEmail onFormEmailSubmit={this.onFormEmailSubmit} t={t} />
              <br />
              {this.state.isEmailSent && (
                <React.Fragment>
                  <Row center="xs">
                    <Col xs={12} md={6} xl={4}>
                      <V7Alert
                        type={ALERT_TYPES.SUCCESS}
                        message={t("labels.forms.emailRecoverSent")}
                      />
                    </Col>
                  </Row>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </V7PageContainer>
      </section>
    );
  }
}

export default Recover;
