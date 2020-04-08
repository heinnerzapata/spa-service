import React, { Component } from "react";
import PageContainer from "../../uiComponents/pageContainer/PageContainer";
import PageTitle from "../../uiComponents/pageTitle/PageTitle";
import { translate } from 'react-i18next';
import Session from "../../uiComponents/containers/session/Session";

class About extends Component {
  render() {
    return (
      <Session>
        <PageTitle title={this.props.t('pages.about.title')}></PageTitle>
        <PageContainer isMarginTopActivated={false}>
          About Content HZ 2
        </PageContainer>
      </Session>
    );
  }
}

export default translate('common')(About);
