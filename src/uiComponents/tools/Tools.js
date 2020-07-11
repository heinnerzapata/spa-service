import React from "react";
import "./Tools.scss";
import V7Icon from "../../uiComponents/v7Icon/V7Icon";
import {
  faCogs,
  faTruckLoading,
  faWifi,
} from "@fortawesome/fontawesome-free-solid";

const Tools = (props) => {
  return (
    <div className={"vol7er-tools"}>
      <ul>
        <li>
          <V7Icon icon={faCogs} size={"2x"} color={"white"} />
        </li>
        <li>
          <V7Icon icon={faCogs} size={"2x"} color={"white"} />
        </li>
        <li>
          <V7Icon icon={faTruckLoading} size={"2x"} color={"white"} />
        </li>
        <li>
          <V7Icon icon={faWifi} size={"2x"} color={"white"} />
        </li>
      </ul>
    </div>
  );
};

export default Tools;
