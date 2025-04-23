import React from 'react';

type State = {
  hasError: boolean;
  error?: Error;
  info?: React.ErrorInfo;
}

export type RenderError = (error: State['error'], info: State['info']) => React.ReactNode;

export type OnErrorCallback = (error: State['error'], info: State['info']) => void;

type Props = {
  children: React.ReactNode;
  onError?: OnErrorCallback;
  renderError?: RenderError;
}

export default class GlobalErrorBoundary extends React.Component<Props, State> {
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

  renderDev() {
    const { error, info } = this.state;
    return (
      <div style={{ minHeight: '100vh', fontFamily: 'monospace' }}>
        <div style={{ padding: '3rem 3.5rem' }}>
          <h2 style={{ color: 'orangered', margin: '0 0 2rem' }}>SOMETHING WENT WRONG!</h2>
          {error && error.stack ? <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{error.stack}</pre> : null}
          {info && info.componentStack ? (
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{info.componentStack}</pre>) : null}
        </div>
      </div>
    );
  }

  renderProd() {
    const { error, info } = this.state;

    if (this.props.renderError) {
      this.props.renderError(error, info);
    }

    return (
      <div style={{ color: 'orangered', padding: '2rem 2.5rem' }}>
        <h2 style={{ margin: 0 }}>Something went wrong. Please try again later.</h2>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return process.env.NODE_ENV === 'development'
        ? this.renderDev()
        : this.renderProd();
    }

    return this.props.children;
  }
}
