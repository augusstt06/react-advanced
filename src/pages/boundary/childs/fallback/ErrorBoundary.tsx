import React, { JSX } from 'react';

interface ErrorBoundaryProps {
  fallback: JSX.Element;
  children: JSX.Element;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: Error, errInfo: React.ErrorInfo): void {
    console.error('Error caught by componentDidCatch: ', err, errInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
