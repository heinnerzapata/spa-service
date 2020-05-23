import React, { Component } from "react";
import PageTitle from "../../uiComponents/pageTitle/PageTitle";
import Session from "../../uiComponents/containers/session/Session";
import PageContainer from "../../uiComponents/pageContainer/PageContainer";
import MachinesList from "./containers/machinesList/machinesList";
import { withTranslation } from "react-i18next";

class Machines extends Component {
  state = {
    sessionValid: false
  };

  handleSessionValid = event => {
    this.setState({ sessionValid: event });
  };

  render() {
    const { t } = this.props;
    return (
      <Session next={"profile"} onSessionResult={this.handleSessionValid}>
        <div className="vol7er-machines">
          <PageTitle title={t("pages.machines.title")} />
          <PageContainer isMarginTopActivated={false}>
            {this.state.sessionValid && <MachinesList />}
          </PageContainer>
        </div>
      </Session>
    );
  }
}

export default withTranslation("common")(Machines);
