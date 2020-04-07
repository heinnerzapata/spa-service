import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import { withRouter } from 'react-router-dom';
import PageContainer from "../../uiComponents/pageContainer/PageContainer";
import PageTitle from "../../uiComponents/pageTitle/PageTitle";
import { V7Input } from "uiComponents/components";
import V7Icon from "../../uiComponents/v7Icon/V7Icon";
import V7Button from "../../uiComponents/v7Button/V7Button";
import V7Preloader from "../../uiComponents/v7Preloader/V7Preloader";
import V7Link from "../../uiComponents/v7Link/V7Link";
import faUser from "@fortawesome/fontawesome-free-solid/faUser";
import faKey from "@fortawesome/fontawesome-free-solid/faKey";
import faAt from "@fortawesome/fontawesome-free-solid/faAt";
import M from 'materialize-css';
import Formsy, { addValidationRule } from 'formsy-react';
import UserService from "../../services/user.service";
import { connect } from "react-redux";
import { setToken } from "../../store/actions/user.action";
import { setUserInfo } from "../../store/actions/user.action";
import { translate } from 'react-i18next';
import Session from "../../uiComponents/containers/session/Session";
import './SignUp.scss';

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      canSubmit: false
    };

    this.submit = this.submit.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.validCredentials = this.validCredentials.bind(this);
    this.invalidCredentials = this.invalidCredentials.bind(this);
    this.addValidationRules = this.addValidationRules.bind(this);

    this.userService = UserService;
    this.addValidationRules();
  }

  addValidationRules() {
    addValidationRule('passwordConfirmation', (values, value) => {
      if (values.password !== values.passwordConf) {
        return false;
      }
      return true;
    });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  submit(model) {
    this.setState({ isLoading: true });
    this.userService.signUpRequest({
      email: model.email,
      password: model.password,
      firstName: model.firstName,
      lastName: model.lastName,
      phoneContact: model.phoneContact,
      displayName: `${model.firstName} . ${model.lastName}`
    })
      .then(result => {
        this.validCredentials(result);
      })
      .catch(error => {
        this.invalidCredentials();
      });
  }

  validCredentials(result) {
    M.toast(this.props.t('pages.signup.welcome'), 1000);
    this.props.dispatch(setToken(result.token));
    this.props.dispatch(setUserInfo({
      hexId: result.account.hexId,
      email: result.account.email,
      displayName: result.account.displayName,
      avatar: result.account.avatar,
      firstName: result.account.firstName,
      lastName: result.account.lastName,
      phoneContact: result.account.phoneContact
    }));
    this.setState({ isLoading: false });
    this.props.history.push("/");
  }

  invalidCredentials() {
    M.toast(this.props.t('pages.signup.errorOnUserCreation'), 1000);
    this.setState({ isLoading: false });
  }

  changeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { t } = this.props;
    return (
      <Session>
        <div className="vol7er-sign-up">
          <PageTitle title={t('pages.signup.title')} />
          <PageContainer isMarginTopActivated={false}>
            {!this.state.isLoading ?
              <div className="vol7er-sign-up__form-container">
                <Formsy
                  ref="form"
                  onValidSubmit={this.submit}
                  onValid={this.enableButton}
                  onInvalid={this.disableButton}>
                  <Row center="xs">
                    <Col xs={12}
                      sm={8}
                      lg={4}>
                      <Row middle="xs">
                        <Col xs={12}>
                          <V7Input
                            name="firstName"
                            s={12}
                            validations="minLength:3"
                            type="text"
                            validationError={t('errors.forms.notValidFirstName')}
                            label={t('labels.forms.firstName')}
                            icon={
                              <V7Icon
                                icon={faUser}
                                size={"2x"} />
                            }
                            required />
                        </Col>
                      </Row>
                      <Row middle="xs">
                        <Col xs={12}>
                          <V7Input
                            name="lastName"
                            s={12}
                            validations="minLength:3"
                            type="text"
                            validationError={t('errors.forms.notValidLastName')}
                            label={t('labels.forms.lastName')}
                            icon={
                              <V7Icon
                                icon={faUser}
                                size={"2x"} />
                            }
                            required />
                        </Col>
                      </Row>
                      <Row middle="xs">
                        <Col xs={12}>
                          <V7Input
                            name="email"
                            s={12}
                            validations="isExisty,isEmail"
                            type="text"
                            validationError={t('errors.forms.notValidEmail')}
                            label={t('labels.forms.email')}
                            icon={
                              <V7Icon
                                icon={faAt}
                                size={"2x"} />
                            }
                            required />
                        </Col>
                      </Row>
                      <Row middle="xs">
                        <Col xs={12}>
                          <V7Input
                            name="phoneContact"
                            s={12}
                            validations="isExisty,minLength:3,isNumeric"
                            type="text"
                            validationError={t('errors.forms.notValidPhoneContact')}
                            label={t('labels.forms.phoneContact')}
                            icon={
                              <V7Icon
                                icon={faAt}
                                size={"2x"} />
                            }
                            required />
                        </Col>
                      </Row>
                      <Row middle="xs">
                        <Col xs={12}>
                          <V7Input
                            name="password"
                            type="password"
                            s={12}
                            validations="isExisty,minLength:3"
                            validationError={t('errors.forms.notValidPassword')}
                            label={t('labels.forms.password')}
                            icon={
                              <V7Icon
                                icon={faKey}
                                size={"2x"} />
                            }
                            required />
                        </Col>
                      </Row>
                      <Row middle="xs">
                        <Col xs={12}>
                          <V7Input
                            name="passwordConf"
                            type="password"
                            s={12}
                            validations="passwordConfirmation"
                            validationError={t('errors.forms.notValidPasswordConf')}
                            label={t('labels.forms.passwordConf')}
                            icon={
                              <V7Icon
                                icon={faKey}
                                size={"2x"} />
                            }
                            required />
                        </Col>
                      </Row>
                      <Row moddle="xs">
                        <Col xs={12}>
                          <V7Button
                            text={t('labels.forms.submit')}
                            type="submit"
                            disabled={!this.state.canSubmit}
                          />
                        </Col>
                      </Row>
                      <Row
                        moddle="xs"
                        className="">
                        <Col
                          xs={12}
                          className="vol7er-sign-in__form-container__recover ">
                          <V7Link
                            to={"/recover"}
                            text={t('labels.forms.recoverPassword')} />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Formsy>
              </div>
              :
              <V7Preloader />
            }
          </PageContainer>
        </div>
      </Session>
    );
  }
}

export default connect(state => state)(withRouter(translate('common')(SignUp)));
