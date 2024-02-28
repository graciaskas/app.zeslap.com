import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

//import components
import AppBar from "../../components/AppBar";
import Toast from "../../components/Toast";

//import contexts
import { GlobalContext } from "../../contexts/GlobalContext";
import Table from "../../components/Table";

import Error from "../../components/Error";

export default function Plans() {
  //States variables
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const { setLoading, BASE_URI, headers } = useContext(GlobalContext);

  //Seach params => Trying to get view paramater from current location;
  const params = new URLSearchParams(window.location.search);
  const viewType = params.get("view") || "th";

  //Table view type columns to display
  const fields = [
    { name: "username", title: "Name" },
    { name: "email", title: "Email" },
  ];

  // //check if data is fetched
  // if (plans.length === 0) return;

  //Component default return
  return (
    <div className="container relative">
      <div className="row">
        <AppBar data={plans} appName="Plans" viewTypes={["list"]} />

        {/* <Table data={plans} fields={fields} /> */}
      </div>
    </div>
  );
}
