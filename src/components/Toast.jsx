import React from "react";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useEffect } from "react";

function Toast({
  type = "danger",
  title = "Notification",
  content = "This a ample notification content...",
}) {
  const toastRef = useRef(null);
  const toastRemoveRef = useRef(null);
  useEffect(() => {}, []);
  return (
    <div
      className="toast absolute right-[1px] top-[1px]  text-white w-[300px] "
      style={{ zIndex: 5 }}
      ref={toastRef}>
      <div
        className={`show bg-${type}  shadow-default p-2 rounded-md`}
        role="alert">
        <div className="toast__header flex justify-between p-2">
          <span className={`badge bg-${type}-light-5 mr-1`}>
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
        <div className="toast__body p-2 text-sm">{content}</div>
      </div>
    </div>
  );
}

Toast.propTypes = {};

export default Toast;
