import React from 'react';

type State = {
  hasError: boolean;
  error?: Error;
  info?: React.ErrorInfo;
}

export type RenderError = (error: State['error'], info: State['info']) => React.ReactNode | null;

export type OnErrorCallback = (error: State['error'], info: State['info']) => void;

type Props = {
  children: React.ReactNode;
  onError?: OnErrorCallback;
  renderError: RenderError;
}

export default class RouteErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: undefined,
    info: undefined,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ info });

    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }

  render() {
    const { children, renderError } = this.props;
    const { hasError, error, info } = this.state;

    return hasError ? renderError(error, info) : children;
  }
}
