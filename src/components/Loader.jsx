import React from "react";
import PropTypes from "prop-types";

function Loader(props) {
  return (
    <div
      className="fixed bottom-0 right-0 flex items-center justify-center"
      style={{ zIndex: 5 }}>
      <strong className="bg-secondary text-white flex rounded-bottom p-2 px-4">
        <i className="fa fa-spinner rotate" style={{ marginRight: "8px" }} />{" "}
        Loading...
      </strong>
    </div>
  );
}

Loader.propTypes = {};

export default Loader;
