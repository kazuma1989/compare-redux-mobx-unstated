import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { App as AppStatic } from "./apps/static/App";
import { App as AppUnstated } from "./apps/unstated/App";

const wrapper: React.CSSProperties = {
  display: "flex",
  flexFlow: "row nowrap"
};

const app: React.CSSProperties = {
  border: "solid 1px black",
  flex: "1 1 auto"
};

ReactDOM.render(
  <Router>
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
    </div>
  </Router>,
  document.getElementById("app")
);
