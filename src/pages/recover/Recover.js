import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import PageContainer from "../../uiComponents/pageContainer/PageContainer";
import PageTitle from "../../uiComponents/pageTitle/PageTitle";
import V7Message from "../../uiComponents/v7Message/V7Message";
import UserService from "../../services/user.service";
import { connect } from "react-redux";
import { translate } from 'react-i18next';
import RequestChange from "./components/RequestChange/RequestChange";
import PasswordChange from "./components/PasswordChange/PasswordChange";
import Session from "../../uiComponents/containers/session/Session";
import _ from 'lodash';
import "./Recover.scss";

class Recover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showConfirmMessage: false,
      showInvalidTokenMessage: false,
      showRequestChange: false
    };

    this.checkParamToken = this.checkParamToken.bind(this);
    this.checkRecoverToken = this.checkRecoverToken.bind(this);

    this.userService = UserService;

    this.checkParamToken();

  }

  checkParamToken() {
    if (!_.isNil(this.props.match.params.token)) {
      this.checkRecoverToken(this.props.match.params.token);
    }
  }

  checkRecoverToken(token) {
    this.userService.checkRecoverToken(token)
      .then(result => {
        console.log(result);
        this.setState({ showInvalidTokenMessage: false, showRequestChange: true });
      })
      .catch(error => {
        console.log(error);
        this.setState({ showInvalidTokenMessage: true, showRequestChange: false });
      });
  }

  render() {
    const { t } = this.props;
    return (
      <Session>
        <div className="vol7er-recover">
          <PageTitle title={t('pages.recover.title')} />
          <PageContainer isMarginTopActivated={false}>
            {!this.state.showInvalidTokenMessage ?
              <div>
                {this.state.showRequestChange ?
                  <PasswordChange
                    token={this.props.match.params.token}>
                  </PasswordChange>
                  :
                  <RequestChange></RequestChange>
                }
              </div>
              :
              <V7Message
                text={t('labels.forms.emailRecoverTokenError')}
                type={"error"}></V7Message>
            }
          </PageContainer>
        </div>
      </Session>
    );
  }
}

export default connect(state => state)(withRouter(translate('common')(Recover)));

