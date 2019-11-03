import ReactDOM from "react-dom";
import React from "react";
import { AppUnstated } from "./AppUnstated";

function App() {
  return <div>app</div>;
}

const wrapper: React.CSSProperties = {
  display: "flex",
  flexFlow: "row nowrap",
  height: "100%"
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
      <App />
    </div>
    <div style={app}>
      <App />
    </div>
  </div>,
  document.getElementById("app")
);
