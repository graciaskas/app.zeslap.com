import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

//import components
import AppBar from "../../components/AppBar";
import Toast from "../../components/Toast";

//import contexts
import { GlobalContext } from "../../contexts/GlobalContext";
import Table from "../../components/Table";
import { useLocation } from "react-router-dom";
import Error from "../../components/Error";

export default function Users() {
  //States variables
  const [users, setUsers] = useState([]);
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
  // if (users.length === 0) return;

  //Component default return
  return (
    <div className="container relative">
      <div className="row">
        <AppBar data={users} appName="Payments" viewTypes={["list"]} />

        {/* <Table data={users} fields={fields} /> */}
      </div>
    </div>
  );
}
