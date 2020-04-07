import React, { Component } from "react";
import MachineService from "../../../../services/machine.service";
import { Grid, Row, Col } from "react-flexbox-grid";
import { V7Spinner } from "uiComponents/components";
import { translate } from "react-i18next";
import ListTableRow from "./../../components/listTableRow/listTableRow";

class MachinesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      machines: [],
      loading: false
    };

    this.machineService = MachineService;
  }

  componentDidMount() {
    this.loadMachines();
  }

  loadMachines = () => {
    //this.setState({ loading: true });
    // this.machineService
    //   .getMachines()
    //   .then(result => {
    //     this.setState({ machines: result });
    //   })
    //   .catch(err => {})
    //   .finally(() => {
    //     this.setState({ loading: false });
    //     this.setState({ machines: [{ hexId:"ABC", plate: "HZ001", connected: true, description: "Minicargador HZ001" }] });
    //   });

    this.setState({
      machines: [
        {
          hexId: "ABC",
          plate: "HZ001",
          connected: true,
          description: "Minicargador HZ001"
        },
        {
          hexId: "ABC",
          plate: "HZ002",
          connected: true,
          description: "Minicargador HZ002"
        },
        {
          hexId: "ABC",
          plate: "HZ003",
          connected: true,
          description: "Minicargador HZ003"
        },
        {
          hexId: "ABC",
          plate: "HZ004",
          connected: true,
          description: "Minicargador HZ004"
        },
        {
          hexId: "ABC",
          plate: "HZ005",
          connected: true,
          description: "Minicargador HZ005"
        },
        {
          hexId: "ABC",
          plate: "HZ006",
          connected: true,
          description: "Minicargador HZ006"
        },
        {
          hexId: "ABC",
          plate: "HZ007",
          connected: true,
          description: "Minicargador HZ007"
        }
      ]
    });
  };

  getMachinesMap = () => {
    const machines = [...this.state.machines];
    return (
      <div>
        {machines.map((machine, index) => (
          <ListTableRow key={index} entity={machine} />
        ))}
      </div>
    );
  };

  render() {
    return (
      <Grid>
        {!this.state.loading ? (
          this.getMachinesMap()
        ) : (
          <Row center="xs">
            <Col xs={12}>
              <V7Spinner />
            </Col>
          </Row>
        )}
      </Grid>
    );
  }
}

export default translate("common")(MachinesList);
