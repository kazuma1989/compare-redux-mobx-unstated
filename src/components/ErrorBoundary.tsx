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
    if (this.state.hasError) {
      return (
        <div className="message is-danger">
          <div className="message-body">ERROR</div>
        </div>
      );
    }

    return this.props.children;
  }
}
