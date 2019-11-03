import ReactDOM from "react-dom";
import React from "react";
import { AppStatic } from "./AppStatic";
import { AppUnstated } from "./AppUnstated";

const wrapper: React.CSSProperties = {
  display: "flex",
  flexFlow: "row nowrap"
};

const app: React.CSSProperties = {
  border: "solid 1px black",
  flex: "1 1 auto"
};

ReactDOM.render(
  <div style={wrapper}>
    <div style={app}>
      <AppUnstated />
    </div>
    <div style={app}>
      <AppStatic />
    </div>
    <div style={app}>
      <AppStatic />
    </div>
  </div>,
  document.getElementById("app")
);
