import React, { Component } from "react";
import { Row, Col, Grid } from "react-flexbox-grid";
import { V7Input } from "uiComponents/components";
import V7Button from "../../../../uiComponents/v7Button/V7Button";
import V7Icon from "../../../../uiComponents/v7Icon/V7Icon";
import Formsy, { addValidationRule } from "formsy-react";
import {
  faUser,
  faAt,
  faPhone,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import UserService from "../../../../services/user.service";
import V7Preloader from "../../../../uiComponents/v7Preloader/V7Preloader";
import { setToken, setUserInfo } from "store/user/actions";
import { V7Image, V7Padding, V7Title } from "uiComponents/components";
import M from "materialize-css";
import base64 from "base-64";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

class UserData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      canSubmit: false,
    };

    this.userService = UserService;

    this.addValidationRules();
  }

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  submit = (model) => {
    this.setState({ isLoading: true });
    this.userService
      .editUserAccount(this.props.userReducer.userInfo.hexId, {
        email: model.email,
        password: model.password,
        firstName: model.firstName,
        lastName: model.lastName,
        phoneContact: model.phoneContact,
        displayName: `${model.firstName} . ${model.lastName}`,
        avatar: this.props.userReducer.userInfo.avatar,
      })
      .then((result) => {
        this.validEditAccount(result);
      })
      .catch((error) => {
        this.invalidEditAccount();
      });
  };

  validEditAccount = (result) => {
    M.toast(this.props.t("pages.signin.welcome"), 1000);
    let userInfo = {
      hexId: result.account.hexId,
      email: result.account.email,
      displayName: result.account.displayName,
      avatar: result.account.avatar,
      firstName: result.account.firstName,
      lastName: result.account.lastName,
      phoneContact: result.account.phoneContact,
    };

    this.props.dispatch(setToken(result.token));
    this.props.dispatch(setUserInfo(userInfo));

    localStorage.setItem("token", result.token);
    localStorage.setItem("userInfo", base64.encode(JSON.stringify(userInfo)));

    this.setState({ isLoading: false });
  };

  invalidEditAccount = () => {
    this.setState({ isLoading: false });
  };

  addValidationRules = () => {
    addValidationRule("passwordConfirmation", (values, value) => {
      if (values.password !== values.passwordConf) {
        return false;
      }
      return true;
    });
  };
  render() {
    const { t } = this.props;
    const paddingStyle = {
      left: 0,
      right: 0,
      top: 20,
      bottom: 20,
    };
    return (
      <section>
        {!this.state.isLoading ? (
          <V7Padding padding={paddingStyle}>
            <Grid>
              <Row middle="xs" center="xs">
                <Col xs={12} lg={4}>
                  <V7Image
                    src={this.props.userReducer.userInfo.avatar}
                    type="round"
                    width={"200"}
                    height={"200"}
                  />
                </Col>
                <Col xs={12} lg={8}>
                  <Formsy
                    onValidSubmit={this.submit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                  >
                    <Row middle="xs" start="xs">
                      <Col xs={12}>
                        <V7Title
                          text={t("labels.forms.userInfo")}
                          size={24}
                          bold={true}
                        />
                      </Col>
                    </Row>
                    <Row middle="xs" start="xs">
                      <Col xs={12} md={6}>
                        <Row middle="xs">
                          <Col xs={12}>
                            <V7Input
                              name="firstName"
                              s={12}
                              validations="minLength:3"
                              type="text"
                              validationError={t(
                                "errors.forms.notValidFirstName"
                              )}
                              label={t("labels.forms.firstName")}
                              defaultValue={
                                this.props.userReducer.userInfo.firstName
                              }
                              icon={<V7Icon icon={faUser} size={"2x"} />}
                              required
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={12} md={6}>
                        <Row middle="xs">
                          <Col xs={12}>
                            <V7Input
                              name="lastName"
                              s={12}
                              validations="minLength:3"
                              type="text"
                              validationError={t(
                                "errors.forms.notValidLastName"
                              )}
                              label={t("labels.forms.lastName")}
                              defaultValue={
                                this.props.userReducer.userInfo.lastName
                              }
                              icon={<V7Icon icon={faUser} size={"2x"} />}
                              required
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row middle="xs" start="xs">
                      <Col xs={12} md={6}>
                        <Row middle="xs">
                          <Col xs={12}>
                            <V7Input
                              name="email"
                              s={12}
                              validations="isExisty,isEmail"
                              type="text"
                              validationError={t("errors.forms.notValidEmail")}
                              label={t("labels.forms.email")}
                              defaultValue={
                                this.props.userReducer.userInfo.email
                              }
                              icon={<V7Icon icon={faAt} size={"2x"} />}
                              required
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={12} md={6}>
                        <Row middle="xs">
                          <Col xs={12}>
                            <V7Input
                              name="phoneContact"
                              s={12}
                              validations="isExisty,minLength:3,isNumeric"
                              type="text"
                              validationError={t(
                                "errors.forms.notValidPhoneContact"
                              )}
                              label={t("labels.forms.phoneContact")}
                              defaultValue={
                                this.props.userReducer.userInfo.phoneContact
                              }
                              icon={<V7Icon icon={faPhone} size={"2x"} />}
                              required
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row middle="xs" start="xs">
                      <Col xs={12} md={6}>
                        <Row middle="xs">
                          <Col xs={12}>
                            <V7Input
                              name="password"
                              type="password"
                              s={12}
                              validations="isExisty,minLength:3"
                              validationError={t(
                                "errors.forms.notValidPassword"
                              )}
                              label={t("labels.forms.password")}
                              icon={<V7Icon icon={faKey} size={"2x"} />}
                              required
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={12} md={6}>
                        <Row middle="xs">
                          <Col xs={12}>
                            <V7Input
                              name="passwordConf"
                              type="password"
                              s={12}
                              validations="passwordConfirmation"
                              validationError={t(
                                "errors.forms.notValidPasswordConf"
                              )}
                              label={t("labels.forms.passwordConf")}
                              icon={<V7Icon icon={faKey} size={"2x"} />}
                              required
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <V7Button
                          text={t("labels.forms.submit")}
                          type="submit"
                          disabled={!this.state.canSubmit}
                        />
                      </Col>
                    </Row>
                  </Formsy>
                </Col>
              </Row>
            </Grid>
          </V7Padding>
        ) : (
          <V7Preloader />
        )}
      </section>
    );
  }
}

export default connect((state) => state)(
  withRouter(withTranslation("common")(UserData))
);
