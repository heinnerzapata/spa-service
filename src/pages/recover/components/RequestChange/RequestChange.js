import React, { Component } from 'react';
import Formsy from 'formsy-react';
import { Row, Col } from "react-flexbox-grid";
import { withTranslation } from 'react-i18next';
import V7Button from "../../../../uiComponents/v7Button/V7Button";
import V7Message from "../../../../uiComponents/v7Message/V7Message";
import { V7Input } from "uiComponents/components";
import V7Preloader from "../../../../uiComponents/v7Preloader/V7Preloader";
import UserService from "../../../../services/user.service";
import { withRouter } from 'react-router-dom';

class RequestChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      canSubmit: false
    };

    this.userService = UserService;
  }

  disableButton = () => {
    this.setState({ canSubmit: false });
  }

  enableButton = () => {
    this.setState({ canSubmit: true });
  }

  submit = (model) => {
    this.setState({ isLoading: true });
    this.userService.recoverPassword({
      email: model.email
    })
      .then(result => {
        console.log(JSON.stringify(result));
        this.validEmail();
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        this.invalidEmail();
      });
  }

  validEmail = () => {
    this.setState({ isLoading: false, showConfirmMessage: true });
  }

  invalidEmail = () => {
    this.setState({ isLoading: false, showConfirmMessage: false });
    this.props.history.push("/");
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
                    name="email"
                    s={12}
                    validations="isExisty,isEmail"
                    type="text"
                    validationError={t('errors.forms.notValidEmail')}
                    label={t('labels.forms.email')}
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
            {this.state.showConfirmMessage &&
              <V7Message text={t('labels.forms.emailRecoverSent')}
                type="alert"></V7Message>
            }
          </div>
          :
          <V7Preloader />
        }
      </div>
    )
  }
}

export default withRouter(withTranslation('common')(RequestChange));
