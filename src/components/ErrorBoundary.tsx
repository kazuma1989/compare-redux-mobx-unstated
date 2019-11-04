import React from "react";

export class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
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
