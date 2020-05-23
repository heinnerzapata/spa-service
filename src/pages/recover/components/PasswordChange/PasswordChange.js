import React, { Component } from 'react';
import Formsy , { addValidationRule } from 'formsy-react';
import { Row, Col } from "react-flexbox-grid";
import { withTranslation } from 'react-i18next';
import V7Button from "../../../../uiComponents/v7Button/V7Button";
import { V7Input } from "uiComponents/components";
import V7Preloader from "../../../../uiComponents/v7Preloader/V7Preloader";
import UserService from "../../../../services/user.service";
import { withRouter } from 'react-router-dom';
import M from 'materialize-css';
import { setToken } from "../../../../store/actions/user.action";
import { setUserInfo } from "../../../../store/actions/user.action";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import base64 from 'base-64';

class PasswordChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      canSubmit: false
    };

    this.userService = UserService;
    this.addValidationRules();
  }

  disableButton = () => {
    this.setState({ canSubmit: false });
  }

  enableButton = () => {
    this.setState({ canSubmit: true });
  }

  submit = (model) => {
    this.setState({ isLoading: true });
    this.userService.changePassword(this.props.token, {
      password: model.password,
      confirm: model.passwordConf
    })
      .then(result => {
        console.log(JSON.stringify(result));
        this.validResetPassword(result);
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        this.invalidResetPassword();
      });
  }

  validResetPassword = (result) => {
    let userInfo = {
      hexId: result.account.hexId,
      email: result.account.email,
      displayName: result.account.displayName,
      avatar: result.account.avatar,
      firstName: result.account.firstName,
      lastName: result.account.lastName,
      phoneContact: result.account.phoneContact
    };

    M.toast(this.props.t('pages.signin.welcome'), 1000);
    this.props.dispatch(setToken(result.token));
    this.props.dispatch(setUserInfo(userInfo));

    localStorage.setItem('token', result.token);
    localStorage.setItem('userInfo', base64.encode(JSON.stringify(userInfo)));
    
    this.setState({ isLoading: false });
    this.props.history.push("/");
  }

  invalidResetPassword = () => {
    this.props.history.push("/");
  }

  addValidationRules = () => {
    addValidationRule('passwordConfirmation', (values, value) => {
      if (values.password !== values.passwordConf) {
        return false;
      }
      return true;
    });
  }

  render() {
    const { t } = this.props;
    return (
      <div className="vol7er-request-change__form-container">
        {!this.state.isLoading ?
          <div>
            <Formsy
              onValidSubmit={this.submit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}>
              <Row center="xs">
                <Col
                  xs={12}
                  sm={8}
                  lg={4}>
                  <V7Input
                    name="password"
                    s={12}
                    validations="isExisty,minLength:3"
                    type="password"
                    validationError={t('errors.forms.notValidPassword')}
                    label={t('labels.forms.newPassword')}
                    required />
                </Col>
              </Row>
              <Row center="xs">
                <Col
                  xs={12}
                  sm={8}
                  lg={4}>
                  <V7Input
                    name="passwordConf"
                    s={12}
                    validations="passwordConfirmation"
                    type="password"
                    validationError={t('errors.forms.notValidPasswordConf')}
                    label={t('labels.forms.passwordConf')}
                    required />
                </Col>
              </Row>
              <Row center="xs">
                <Col
                  xs={12}
                  sm={8}
                  lg={4}>
                  <V7Button
                    text={t('labels.forms.submit')}
                    type="submit"
                    disabled={!this.state.canSubmit}
                  />
                </Col>
              </Row>
            </Formsy>
          </div>
          :
          <V7Preloader />
        }
      </div>
    )
  }
}

PasswordChange.propTypes = {
  token: PropTypes.string
}

export default connect(state => state)(withRouter(withTranslation('common')(PasswordChange)));
