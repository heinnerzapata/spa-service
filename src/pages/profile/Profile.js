import React, { Component } from 'react';
import ProfileLayout from './components/profileLayout/profileLayout';
import PageContainer from '../../uiComponents/pageContainer/PageContainer';
import PageTitle from '../../uiComponents/pageTitle/PageTitle';
import Session from '../../uiComponents/containers/session/Session';
import UserData from './containers/userData/userData';
import Subscription from './containers/subscription/subscription';
import { V7Tabs } from 'uiComponents/components';
import { translate } from 'react-i18next';

class Profile extends Component {
  render() {
    const { t } = this.props;
    const tabs = [
      {
        title: t('pages.profile.tabs.userData'),
        item: <UserData />,
        active: true
      },
      {
        title: t('pages.profile.tabs.subscription'),
        item: <Subscription />
      }
    ];
    return (
      <Session
        next={'profile'}>
        <PageTitle
          title={t('pages.profile.title')} />
        <PageContainer
          isMarginTopActivated={false}>
          <ProfileLayout>
            <V7Tabs
              tabs={tabs}
              backGray={false} />
          </ProfileLayout>
        </PageContainer>
      </Session>
    );
  }
}

export default translate('common')(Profile);