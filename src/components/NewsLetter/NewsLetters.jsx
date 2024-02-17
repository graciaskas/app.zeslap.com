import React, { useContext, useEffect, useState } from "react";

import AppBar from "../AppBar";

import { GlobalContext } from "../../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

function NewsLetters(props) {
  const { setLoading, BASE_URI, headers, setLog, setToast } =
    useContext(GlobalContext);
  const [newsletters, setNewsLetters] = useState([]);
  const navigate = useNavigate();

  const actionSendMail = async (newsletter) => {
    setLoading(true);
    try {
      const request = await fetch(`${BASE_URI}/newsletters/send`, {
        method: "post",
        headers,
        body: JSON.stringify({ ...newsletter }),
      });
      setLoading(false);
      const { error, message } = await request.json();
      if (error) {
        setLog(true);
        setToast({
          title: "Action done",
          content: message,
          type: "success",
        });
      }
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };

  const actionDelete = async (newsletterId) => {
    if (!newsletterId) throw Error("Argument missing newsletterId");
    setLoading(true);
    try {
      const request = await fetch(`${BASE_URI}/newsletters/${newsletterId}`, {
        method: "delete",
        headers,
      });
      setLoading(false);
      const { error, message } = await request.json();
      if (!error) {
        setLog(true);
        setToast({
          title: "Action done",
          content: message,
          type: "success",
        });
      }
      navigate("/newsletters?");
    } catch (error) {
      console.log(error);
    }
  };

  async function getNewsLetters() {
    setLoading(true);

    try {
      const request = await fetch(`${BASE_URI}/newsletters/`, { headers });
      setLoading(false);
      const response = await request.json();
      if (response.data) {
        return setNewsLetters(response.data);
      }
    } catch (error) {
      throw Error(error);
    }
  }

  useEffect(() => {
    getNewsLetters();
  }, []);

  const fields = [
    { name: "subject", title: "Subject" },
    { name: "createdAt", title: "Create date" },
    { name: "Sent", title: "Sent" },
    { name: "action", title: "Action" },
  ];

  return (
    <div className="container position-relative">
      <div className="row">
        <AppBar
          data={[]}
          appName="NewsLetters"
          viewTypes={["list"]}
          create={true}
        />

        <div className="col-12">
          <div className="mt-3 p-3 bg-white rounded shadow-default">
            <table className="table border rounded">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" name="" id="" />
                  </th>
                  <th>#</th>
                  <th>Subject</th>
                  <th>Sent status</th>
                  <th>Create date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody className="table-body-striped">
                {newsletters.map((item, id) => (
                  <tr key={id}>
                    <td>
                      <input type="checkbox" name="" id="" />
                    </td>
                    <td>{id + 1}</td>
                    <td>{item.subject}</td>
                    <td>{item.sent ? "Sent" : "Not sent"}</td>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                    <td>
                      <span
                        className="badge bg-primary mx-1"
                        onClick={() => actionSendMail(item)}>
                        Send emails
                      </span>
                      <span
                        className="badge bg-danger"
                        onClick={() => actionDelete(item._id)}>
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

NewsLetters.propTypes = {};

export default NewsLetters;
