import React from "react";
import { WithTranslation } from "react-i18next";
import {
  V7PageTitle,
  V7TextField,
  V7Button,
  V7Icon,
  V7Alert,
  V7Link,
  ALERT_TYPES,
} from "components";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { V7PageContainer } from "containers";
import { Row, Col } from "react-flexbox-grid";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { IUserState } from "store/user/reducer";
import * as Yup from "yup";
import FormEmail from "./formEmail";
import FormPassword from "./formPassword";

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
  hash: string;
}

class Recover extends React.PureComponent<IRecoverProps, IRecoverState> {
  state = {
    isPasswordView: false,
    isValidHash: false,
    hash: "",
  };

  componentDidMount() {
    const hash = this.props.match.params.hash;
    if (hash) {
      this.setState({ isPasswordView: true });
      this.props
        .onCheckRecoverHash(hash)
        .then((result: any) => {
          this.setState({ isValidHash: true });
        })
        .catch((err: any) => {
          this.setState({ isValidHash: false });
        });
    }
  }

  validateTokenParam = (token: string) => {};

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
                  onRestorePassword={this.props.onRestorePassword}
                  hash={this.state.hash}
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
            <FormEmail onRecoverPassword={this.props.onRecoverPassword} t={t} />
          )}
        </V7PageContainer>
      </section>
    );
  }
}

export default Recover;
