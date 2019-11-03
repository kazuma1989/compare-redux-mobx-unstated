import ReactDOM from "react-dom";
import React from "react";
import { AppUnstated } from "./AppUnstated";

function App({ style }: { style: React.CSSProperties }) {
  return <div style={style}>app</div>;
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
    <AppUnstated style={app} />
    <App style={app} />
    <App style={app} />
  </div>,
  document.getElementById("app")
);
