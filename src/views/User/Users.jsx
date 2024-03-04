import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

//import components
import AppBar from "../../components/AppBar";
import Toast from "../../components/Toast";
import User from "../../components/UserCard";

//import contexts
import { GlobalContext } from "../../contexts/GlobalContext";
import Table from "../../components/Table";
import { useLocation } from "react-router-dom";
import Error from "../../components/Error";

export default function Users() {
  //States variables
  const [error, setError] = useState(null);
  const { users, getUsers } = useContext(GlobalContext);

  //Seach params => Trying to get view paramater from current location;
  const params = new URLSearchParams(window.location.search);
  const viewType = params.get("view") || "th";

  //Table view type columns to display
  const fields = [
    { name: "username", title: "Name" },
    { name: "email", title: "Email" },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  //Component default return
  return (
    <div className="container-lg relative">
      <div className="row">
        <AppBar data={users} appName="Users" viewTypes={["th", "list"]} />

        {
          //Handle UI Data View Types
          viewType && viewType === "th" ? (
            //Grid view type
            <div className="col-12">
              <div className="mt-3 p-3 bg-white rounded shadow-default">
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
                  {users.map((user, id) => (
                    <User user={user} key={id} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            //Table view Type
            <Table data={users} fields={fields} />
          )
        }
      </div>
    </div>
  );
}
