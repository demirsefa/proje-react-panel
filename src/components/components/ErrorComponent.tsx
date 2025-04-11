import React from "react";
//TODO: create, edit, details
export function ErrorComponent({ error }: { error: unknown | Response }) {
	const getErrorMessage = (errorInner: unknown | Response) => {
		if (errorInner instanceof Response) {
			switch (errorInner.status) {
				case 400:
					return "Bad Request: The request was invalid or malformed.";
				case 401:
					return "Unauthorized: Please log in to access this resource.";
				case 404:
					return "Not Found: The requested resource could not be found.";
				case 403:
					return "Forbidden: You don't have permission to access this resource.";
				case 500:
					return "Internal Server Error: Something went wrong on our end.";
				default:
					return `Error ${errorInner.status}: ${errorInner.statusText || "Something went wrong."}`;
			}
		}
		return (errorInner as { message?: string })?.message || "Something went wrong. Please try again later.";
	};

	return (
		<div className="error-container">
			<div className="error-icon">
				<i className="fa fa-exclamation-circle" />
			</div>
			<div className="error-content">
				<h3>Error Occurred</h3>
				<p>{getErrorMessage(error)}</p>
			</div>
		</div>
	);
}
