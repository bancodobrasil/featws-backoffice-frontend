import React from 'react';
import {
  NotificationContext,
  openDefaultErrorNotification,
} from '../../contexts/NotificationContext';
import { ErrorFallback } from './ErrorFallback';

interface ErrorBoundaryProps {
  fallback: string | JSX.Element;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const { dispatch } = this.context;
    openDefaultErrorNotification(error, dispatch);
  }

  render() {
    const { fallback, children } = this.props;
    const { hasError = false } = this.state;

    const fallbackComponent =
      typeof fallback === 'string' ? <ErrorFallback message={fallback} /> : fallback;

    if (hasError) {
      return fallbackComponent;
    }

    return children;
  }
}
ErrorBoundary.contextType = NotificationContext;

export default ErrorBoundary;
