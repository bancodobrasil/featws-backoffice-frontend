import React from 'react';
import axios from 'axios';
import { APIError, UnhandledError } from '../../api/errors';
import { ActionTypes, NotificationContext } from '../../contexts/NotificationContext';
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
    let processedError;
    if (axios.isAxiosError(error)) {
      processedError = new APIError(error.response.status);
    } else {
      console.error(error);
      processedError = new UnhandledError(error);
    }
    const { dispatch } = this.context;
    dispatch({ type: ActionTypes.OPEN_ERROR_NOTIFICATION, error: processedError });
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
