import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
		error: null,
		errorInfo: null,
	};

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error, errorInfo: null };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}

	public render() {
		if (this.state.hasError) {
			return (
				<div className="error-boundary">
					<div className="error-boundary__content">
						<div className="error-boundary__icon">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<circle cx="12" cy="12" r="10" />
								<line x1="12" y1="8" x2="12" y2="12" />
								<line x1="12" y1="16" x2="12" y2="16" />
							</svg>
						</div>
						<h1>Oops! Something went wrong</h1>
						<p className="error-boundary__message">
							{this.state.error?.message || "An unexpected error occurred"}
						</p>
						<button className="error-boundary__button" onClick={() => window.location.reload()}>
							Refresh Page
						</button>
						{process.env.NODE_ENV === "development" && (
							<details className="error-boundary__details">
								<summary>Error Details</summary>
								<pre>{this.state.error?.toString()}</pre>
								<pre>{this.state.errorInfo?.componentStack}</pre>
							</details>
						)}
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
