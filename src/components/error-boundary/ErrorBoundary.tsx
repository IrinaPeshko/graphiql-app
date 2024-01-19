import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorBoundaryProps } from '../../types/errorBoundary';

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ hasError: true, error: error, errorInfo: errorInfo });
  }

  onResetButtonClick = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <button onClick={this.onResetButtonClick}>Reset</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
