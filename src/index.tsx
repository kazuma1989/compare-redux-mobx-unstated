import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { App as AppStatic } from "./apps/static/App";
import { App as AppUnstated } from "./apps/unstated/App";
import { App as AppRedux } from "./apps/redux/App";

ReactDOM.render(
  <Router>
    <div
      style={{
        display: "flex",
        flexFlow: "row nowrap"
      }}
    >
      <ErrorBoundary>
        <AppUnstated />
      </ErrorBoundary>
      <ErrorBoundary>
        <AppStatic />
      </ErrorBoundary>
      <ErrorBoundary>
        <AppRedux />
      </ErrorBoundary>
    </div>
  </Router>,
  document.getElementById("app")
);
