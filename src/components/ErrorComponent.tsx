import React from "react";

export function ErrorComponent({ error }: { error: unknown }) {
	return (
		<div className="error-container">
			<div className="error-icon">
				<i className="fa fa-exclamation-circle" />
			</div>
			<div className="error-content">
				<h3>Error Occurred</h3>
				<p>{(error as { message?: string })?.message || "Something went wrong. Please try again later."}</p>
			</div>
		</div>
	);
}
