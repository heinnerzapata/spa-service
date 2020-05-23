import React, { Component } from "react";
import PageContainer from "../../uiComponents/pageContainer/PageContainer";
import PageTitle from "../../uiComponents/pageTitle/PageTitle";
import { withTranslation } from 'react-i18next';
import Session from "../../uiComponents/containers/session/Session";

class About extends Component {
  render() {
    return (
      <Session>
        <PageTitle title={this.props.t('pages.about.title')}></PageTitle>
        <PageContainer isMarginTopActivated={false}>
          About Content HZ 6
        </PageContainer>
      </Session>
    );
  }
}

export default withTranslation('common')(About);
