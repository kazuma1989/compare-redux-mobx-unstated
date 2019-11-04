import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { App as AppStatic } from "./apps/static/App";
import { App as AppUnstated } from "./apps/unstated/App";
import { App as AppRedux } from "./apps/redux/App";

ReactDOM.render(
  <Wrapper>
    <AppWrapper>
      <AppRedux />
    </AppWrapper>
    <AppWrapper>
      <AppUnstated />
    </AppWrapper>
    <AppWrapper>
      <AppStatic />
    </AppWrapper>
  </Wrapper>,
  document.getElementById("app")
);

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap"
        }}
      >
        {children}
      </div>
    </Router>
  );
}

function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <div
        style={{
          border: "solid 1px black",
          flex: "1 1 auto"
        }}
      >
        {children}
      </div>
    </ErrorBoundary>
  );
}
