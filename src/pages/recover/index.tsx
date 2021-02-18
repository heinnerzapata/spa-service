import React from 'react';
import {
  ALERT_TYPES,
  V7Alert,
  V7Link,
  V7PageTitle,
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
  isPasswordView: boolean;
  isValidHash: boolean;
  isEmailSent: boolean;
  hash: string;
}

class Recover extends React.PureComponent<IRecoverProps, IRecoverState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isPasswordView: false,
      isValidHash: false,
      isEmailSent: false,
      hash: '',
    };
  }

  componentDidMount() {
    const { hash } = this.props.match.params;
    if (hash) {
      this.setState({ isPasswordView: true });
      this.props
        .onCheckRecoverHash(hash)
        .then(() => {
          this.setState({ isValidHash: true, hash });
        })
        .catch(() => {
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
      toast.error(`${t('toast.invalidEmail')}`);
      this.setState({ isEmailSent: false });
    }
  };

  onFormPasswordSubmit = async (password: string) => {
    const { t } = this.props;
    try {
      const userInfo = await this.props.onRestorePassword(
        password,
        this.state.hash,
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

    return (
      <section>
        <V7PageTitle title={t('pages.recover.title')} />
        {this.state.isPasswordView && (
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

        {!this.state.isPasswordView && (
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
      </section>
    );
  }
}

export default Recover;
