import React from "react";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useEffect } from "react";

function Toast({
	type = "danger",
	title = "Notification",
	content = "Sample notification content",
}) {
	const toastRef = useRef(null);
	const toastRemoveRef = useRef(null);
	useEffect(() => {}, []);
	return (
		<div
			className="position-absolute px-2 top-0 end-0"
			style={{ zIndex: 5 }}
			ref={toastRef}>
			<div
				className={`alert alert-dismissible fade show bg-${type}-light-9  shadow-default`}
				role="alert">
				<div className="alert-header">
					<span className={`badge bg-${type}-light-5`}>
						<i className="fa fa-bell"></i>
					</span>
					<strong className="me-auto">{title}</strong>
					<small>Just now</small>
					<button
						type={"button"}
						className="btn-close"
						data-bs-dismiss="alert"
						aria-label="Close"
						ref={toastRemoveRef}
					/>
				</div>
				<div className="alert-body">{content}</div>
			</div>
		</div>
	);
}

Toast.propTypes = {};

export default Toast;
