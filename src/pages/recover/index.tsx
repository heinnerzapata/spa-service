import React from 'react';
import {
  ALERT_TYPES,
  V7Alert,
  V7Link,
} from 'components';
import { Col, Row } from 'react-flexbox-grid';

import { IUserState } from 'store/user/reducer';

import { RouteComponentProps } from 'react-router-dom';
import { WithTranslation } from 'react-i18next';
import { setToken } from 'utilities/tokenHelper';
import { toast } from 'react-toastify';
import FormPassword from './formPassword';
import FormEmail from './formEmail';

interface IRecoverProps extends WithTranslation, RouteComponentProps {
  t: any;
  userReducer: IUserState;
  match: any;
  onRecoverPassword: (email: string) => any;
  onRestorePassword: (password: string, hash: string) => any;
  onCheckRecoverHash: (hash: string) => any;
}

interface IRecoverState {
  isValidHash: boolean;
  isEmailSent: boolean;
}

class Recover extends React.PureComponent<IRecoverProps, IRecoverState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isValidHash: true,
      isEmailSent: false,
    };
  }

  invalidateHash = () => {
    this.setState({ isValidHash: false });
  };

  onFormEmailSubmit = async (email: string) => {
    const { t } = this.props;
    try {
      await this.props.onRecoverPassword(email);
      this.setState({ isEmailSent: true });
    } catch (error) {
      toast.error(`${t('toast.invalidEmail')}`);
      this.setState({ isEmailSent: false });
    }
  };

  onFormPasswordSubmit = async (password: string) => {
    const { t } = this.props;
    try {
      const userInfo = await this.props.onRestorePassword(
        password,
        this.props.match.params.hash,
      );
      toast.success(`${t('password changed')}`);
      setToken(userInfo.token);
      this.props.history.push('/dashboard');
    } catch (error) {
      toast.error(`${t('toast.errorInProcess')}`);
    }
  };

  render() {
    const { t } = this.props;

    const { hash } = this.props.match.params;

    return (
      <>
        {hash && (
        <>
          {this.state.isValidHash && (
          <FormPassword
            history={this.props.history}
            onFormEmailSubmit={this.onFormPasswordSubmit}
            t={t}
          />
          )}
          {!this.state.isValidHash && (
          <>
            <Row center="xs">
              <Col xs={12} md={9} lg={6} xl={4}>
                <V7Alert
                  type={ALERT_TYPES.ERROR}
                  message={t('labels.forms.emailRecoverTokenError')}
                />
              </Col>
            </Row>
            <br />
            <Row center="xs">
              <Col xs={12} md={9} lg={6} xl={4}>
                <V7Link to="/" text={t('labels.forms.return')} />
              </Col>
            </Row>
          </>
          )}
        </>
        )}
        {!hash && (
        <>
          <FormEmail onFormEmailSubmit={this.onFormEmailSubmit} t={t} />
          <br />
          {this.state.isEmailSent && (
          <>
            <Row center="xs">
              <Col xs={12} md={6} xl={4}>
                <V7Alert
                  type={ALERT_TYPES.SUCCESS}
                  message={t('labels.forms.emailRecoverSent')}
                />
              </Col>
            </Row>
          </>
          )}
        </>
        )}
      </>
    );
  }
}

export default Recover;
