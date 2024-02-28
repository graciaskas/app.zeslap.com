import React from "react";

export default function Error(props) {
  const { code = 500, content = null } = props;

  return (
    <div className="flex flex-column justify-center items-center bg-gray vh-100">
      <div className="container text-center">
        <h1 className="display-1 text-danger">{code}</h1>
        <p>{content}</p>
      </div>
      {props.children}
    </div>
  );
}
