import React, { Component } from "react";
import PageTitle from "./../../../../uiComponents/pageTitle/PageTitle";
import Session from "./../../../../uiComponents/containers/session/Session";
import PageContainer from "./../../../../uiComponents/pageContainer/PageContainer";
import { withTranslation } from "react-i18next";
import MachineInfo from "../machineInfo/machineInfo";

class Machine extends Component {
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
        <div className="vol7er-machine">
          <PageTitle title={t("pages.machine.title")} />
          <PageContainer isMarginTopActivated={false}>
            {this.state.sessionValid && <MachineInfo />}
          </PageContainer>
        </div>
      </Session>
    );
  }
}

export default withTranslation("common")(Machine);
