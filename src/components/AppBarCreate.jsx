import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AppBarCreate({ appName }) {
  //split location pathname
  const pathname = window.location.pathname.split("/")[1];
  //Links
  const linkToPath = `/${pathname}`;
  //componet default view types;
  const default_view_types = ["list", "grid", "expand"];

  return (
    <div className="col-12">
      <div className="bg-white  rounded shadow-default p-3">
        <div className="text-secondary h5 text-raleway">
          <Link to={"/"}>
            <i className="fa fa-home" />
          </Link>{" "}
          /<Link to={linkToPath}>{appName}</Link> / New
        </div>
        <div className="border-top pt-3">
          <button
            type="submit"
            className="btn bg-primary"
            style={{ marginRight: "7px" }}
          >
            Save
          </button>
          <Link to={linkToPath} className="btn bg-gray ml-4">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

AppBarCreate.propTypes = {
  appName: PropTypes.string.isRequired,
};

export default AppBarCreate;
