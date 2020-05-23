import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import { withRouter } from 'react-router-dom';
import PageContainer from "../../uiComponents/pageContainer/PageContainer";
import PageTitle from "../../uiComponents/pageTitle/PageTitle";
import { V7Input } from 'uiComponents/components';
import V7Icon from "../../uiComponents/v7Icon/V7Icon";
import V7Button from "../../uiComponents/v7Button/V7Button";
import V7Preloader from "../../uiComponents/v7Preloader/V7Preloader";
import V7Link from "../../uiComponents/v7Link/V7Link";
import faAt from "@fortawesome/fontawesome-free-solid/faAt";
import faKey from "@fortawesome/fontawesome-free-solid/faKey";
import M from 'materialize-css';
import Formsy from 'formsy-react';
import UserService from "../../services/user.service";
import { connect } from "react-redux";
import { setToken } from "../../store/actions/user.action";
import { setUserInfo } from "../../store/actions/user.action";
import { withTranslation } from 'react-i18next';
import queryString from 'query-string';
import _ from 'lodash';
import base64 from 'base-64';
import Session from "../../uiComponents/containers/session/Session";
import "./SignIn.scss";

const defaultSignInRedirectionUrl = '/dashboard';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      canSubmit: false,
      nextPage: ''
    };

    this.userService = UserService;
  }

  componentDidMount() {
    this.setState({ nextPage: this.getNextPage() });
  }

  getNextPage = () => {
    const queryParams = queryString.parse(this.props.location.search);
    return !_.isNil(queryParams.next) ? `/${queryParams.next}` : defaultSignInRedirectionUrl;
  }

  disableButton = () => {
    this.setState({ canSubmit: false });
  }

  enableButton = () => {
    this.setState({ canSubmit: true });
  }

  submit = (model) => {
    this.setState({ isLoading: true });
    this.userService.logInRequest({
      email: model.email,
      password: model.password
    })
      .then(result => {
        this.validCredentials(result);
      })
      .catch(error => {
        this.invalidCredentials();
      });
  }

  validCredentials = (result) => {
    M.toast(this.props.t('pages.signin.welcome'), 1000);
    let userInfo = {
      hexId: result.account.hexId,
      email: result.account.email,
      displayName: result.account.displayName,
      avatar: result.account.avatar,
      firstName: result.account.firstName,
      lastName: result.account.lastName,
      phoneContact: result.account.phoneContact
    };

    this.props.dispatch(setToken(result.token));
    this.props.dispatch(setUserInfo(userInfo));

    localStorage.setItem('token', result.token);
    localStorage.setItem('userInfo', base64.encode(JSON.stringify(userInfo)));

    this.setState({ isLoading: false });

    this.props.history.push(this.state.nextPage);
  }

  invalidCredentials = () => {
    M.toast(this.props.t('pages.signin.invalidCredentials'), 1000);
    this.setState({ isLoading: false });
  }


  render() {
    const { t } = this.props;
    return (
      <Session>
        <div className="vol7er-sign-in">
          <PageTitle title={t('pages.signin.title')} />
          <PageContainer isMarginTopActivated={false}>
            {!this.state.isLoading ?
              <div className="vol7er-sign-in__form-container">
                <Formsy
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
                          className="vol7er-sign-in__form-container__recover">
                          <V7Link
                            to={"/recover"}
                            text={t('labels.forms.recoverPassword')} />
                        </Col>
                        <Col
                          xs={12}
                          className="vol7er-sign-in__form-container__recover">
                          <V7Link
                            to={"/signup"}
                            text={t('labels.forms.dontHaveAccount')} />
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

export default connect(state => state)(withRouter(withTranslation('common')(SignIn)));

