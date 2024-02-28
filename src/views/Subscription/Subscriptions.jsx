import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import AppBar from "../../components/AppBar";
import Table from "../../components/Table";
import { GlobalContext } from "../../contexts/GlobalContext";

function NewsLetters(props) {
  const { setLoading, BASE_URI, headers } = useContext(GlobalContext);
  const [subscriptions, setSubscriptions] = useState([]);

  async function getSubscriptions() {
    setLoading(true);

    try {
      const request = await fetch(`${BASE_URI}/subscriptions/`, { headers });
      setLoading(false);
      const response = await request.json();
      if (response.data) {
        return setSubscriptions(response.data);
      }
    } catch (error) {
      throw Error(error);
    }
  }

  useEffect(() => {
    getSubscriptions();
  }, []);

  const fields = [
    { name: "email", title: "Email" },
    { name: "username", title: "Related user" },
    { name: "create_date", title: "Create date" },
    { name: "status", title: "State" },
    { name: "action", title: "Action" },
  ];
  const rows = [];
  return (
    <div className="container relative">
      <div className="row">
        <AppBar data={[]} appName="Subscriptions" viewTypes={["list"]} />

        <Table data={subscriptions} fields={fields} />
      </div>
    </div>
  );
}

NewsLetters.propTypes = {};

export default NewsLetters;
