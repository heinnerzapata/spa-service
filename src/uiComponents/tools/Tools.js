import React from "react";
import "./Tools.scss";
import V7Icon from "../../uiComponents/v7Icon/V7Icon";
import faClipBoardList from "@fortawesome/fontawesome-free-solid/faClipboardList";
import faCogs from "@fortawesome/fontawesome-free-solid/faCogs";
import faTruckLoading from "@fortawesome/fontawesome-free-solid/faTruckLoading";
import faWifi from "@fortawesome/fontawesome-free-solid/faWifi";

const Tools = props => {
  return (
    <div className={"vol7er-tools"}>
      <ul>
        <li>
          <V7Icon icon={faClipBoardList} size={"2x"} color={"white"} />
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
