import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { App as AppStatic } from "./apps/static/App";
import { App as AppUnstated } from "./apps/unstated/App";

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  static getDerivedStateFromError(err) {
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  render() {
    return (
      <div
        style={{
          border: "solid 1px black",
          flex: "1 1 auto"
        }}
      >
        {this.state.hasError ? (
          <div className="message is-danger">
            <div className="message-body">ERROR</div>
          </div>
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}

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
        <AppStatic />
      </ErrorBoundary>
    </div>
  </Router>,
  document.getElementById("app")
);
