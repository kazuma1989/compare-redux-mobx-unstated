import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
// import { App as AppStatic } from "./apps/static/App";
import { App as AppRedux } from "./apps/redux/App";
import { App as AppReduxCatalog } from "./apps/redux/AppCatalog";
import { App as AppMobx } from "./apps/mobx/App";
import { App as AppMobxCatalog } from "./apps/mobx/AppCatalog";
import { App as AppUnstated } from "./apps/unstated/App";
import { App as AppUnstatedCatalog } from "./apps/unstated/AppCatalog";

ReactDOM.render(
  <Wrapper>
    <AppWrapper>
      <AppRedux />
    </AppWrapper>
    <AppWrapper>
      <AppMobx />
    </AppWrapper>
    <AppWrapper>
      <AppUnstated />
    </AppWrapper>

    <AppWrapper>
      <AppReduxCatalog />
    </AppWrapper>
    <AppWrapper>
      <AppMobxCatalog />
    </AppWrapper>
    <AppWrapper>
      <AppUnstatedCatalog />
    </AppWrapper>
  </Wrapper>,
  document.getElementById("app")
);

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
      <Router>{children}</Router>
    </div>
  );
}

function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: "solid 1px black", borderWidth: "0 1px 1px 0" }}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );
}
