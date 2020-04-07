import React from "react";
import { Row, Col } from "react-flexbox-grid";
import { withRouter } from "react-router-dom";
import V7Link from "uiComponents/v7Link/V7Link";
import { V7Image } from "uiComponents/components";
import "./listTableRow.scss";

const getMachineLink = machineHexId => `/machines/${machineHexId}`;

const ListTableRow = props => {
  return (
    <Row key={props.key} className="vol7er-list-table-row" middle="xs">
      <Col xs={3} md={1}>
        <V7Image
          style={{ transform: "translate(-30px)" }}
          src={
            "http://gravatar.com/avatar/d1cd00cba00e5027e308372e2e43da91?s=200&d=retro"
          }
          type="round"
          width={"100"}
          height={"100"}
        />
      </Col>
      <Col xs={4}>
        <V7Link to={getMachineLink(props.entity.hexId)}>
          <span className={"vol7er-list-table-row__description"}>{ props.entity.description }</span>
        </V7Link>
      </Col>
      <Col xs={2}>{props.entity.plate}</Col>
      <Col xs={2}>{props.entity.connected ? "on" : "off"}</Col>
    </Row>
  );
};

export default withRouter(ListTableRow);
