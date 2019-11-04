import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { App as AppStatic } from "./apps/static/App";
import { App as AppUnstated } from "./apps/unstated/App";
import { App as AppRedux } from "./apps/redux/App";
import { App as AppMobx } from "./apps/mobx/App";

ReactDOM.render(
  <Wrapper>
    <AppWrapper>
      <AppRedux />
    </AppWrapper>
    <AppWrapper>
      <AppUnstated />
    </AppWrapper>
    <AppWrapper>
      <AppMobx />
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {children}
      </div>
    </Router>
  );
}

function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <div style={{ border: "solid 1px black", borderWidth: "0 1px 1px 0" }}>
        {children}
      </div>
    </ErrorBoundary>
  );
}
