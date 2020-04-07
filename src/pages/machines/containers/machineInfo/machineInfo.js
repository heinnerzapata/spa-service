import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import MachineService from "../../../../services/machine.service";
import { withRouter } from "react-router-dom";
import { V7Title, V7Spinner } from "uiComponents/components";

class MachineInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      machineInfo: {},
      loading: false
    };
    this.machineService = MachineService;
  }
  componentDidMount() {
    this.getMachineInfo();
  }

  getMachineInfo = () => {
    this.setState({ loading: true });
    this.machineService
      .getMachine(this.props.match.params.hexId)
      .then(machineInfo => {
        this.setState({ machineInfo });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div className="vol7er-machine-info">
        <Grid>
          <Row center="xs">
            <Col xs={12}>
              {!this.state.loading ? (
                <V7Title
                  text={`${this.state.machineInfo.plate} / ${
                    this.state.machineInfo.description
                  }`}
                  size={24}
                  bold={true}
                />
              ) : (
                <V7Spinner />
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(MachineInfo);
