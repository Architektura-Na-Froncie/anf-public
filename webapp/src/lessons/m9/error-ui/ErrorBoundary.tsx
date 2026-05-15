import React from "react";

import { ErrorPage } from "./ErrorPage";
import { LoggerContext } from "../logger";
import { getUserErrorMessage } from "./messages";

interface ErrorBoundaryProps {};

type ErrorBoundaryState =
  | {
      hasError: false;
    }
  | {
      hasError: true;
      error: Error;
      errorInfo: React.ErrorInfo;
    };
const initialState: ErrorBoundaryState = {
  hasError: false,
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static contextType = LoggerContext;
  context!: React.ContextType<typeof LoggerContext>; // enforcing the type of this.context

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error };
  }

  formatErrorInfo(errorInfo: React.ErrorInfo) {
    return {
      componentStack: errorInfo.componentStack,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorMessage = getUserErrorMessage(error)

    this.context.logger.error(`UI Error Boundary reached: ${errorMessage.type}`, {
      message: error.message,
      ...this.formatErrorInfo(errorInfo),
    });

    this.setState({ errorInfo } as ErrorBoundaryState);
  }

  close() {
    this.setState(initialState);
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = getUserErrorMessage(this.state.error)
      return <ErrorPage errorMessage={errorMessage} />;
    } else {
      return this.props.children;
    }
  }
}
