import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { GlobalContext } from "../../contexts/GlobalContext";
import AppBar from "../AppBar";
import Error from "../Error";
import Toast from "../Toast";

import Editor from "../Editor";

function View(props) {
  const [contact, setContact] = useState(null);
  const { BASE_URI, setLoading, headers, setLog, setToast } =
    useContext(GlobalContext);
  const [error, setError] = useState({});
  const [messageContent, setMessageContent] = useState("");

  const replyContact = async () => {
    try {
      const response = await fetch(BASE_URI + "/contacts/reply", {
        method: "post",
        headers,
        body: JSON.stringify({
          messageContent,
          messageReceiver: contact?.email,
          messageSubject: contact.subject,
        }),
      });
      const { error, message } = await response.json();
      if (!error) {
        setLog(true);
        setToast({
          title: "Contact reply",
          content: message,
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeEditor = (editorContent) => {
    setMessageContent(editorContent);
  };

  async function getContact() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("q");

    if (!id) {
      setError({
        content:
          "Invalid [GET] URL missing search parameter  ! " + params.get("q"),
        code: 400,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(BASE_URI + "/contacts/" + id, {
        headers,
      });
      const { data } = await response.json();
      setLoading(false);

      if (response.status <= 399) {
        setContact(data[0]);
        return;
      }

      setError({ code: response.status, content: data.message });
    } catch (e) {
      console.error(e.message);
      setLoading(false);
      setError({ code: 500, content: e.message });
      setMessageContent(null);
    }
  }

  useEffect(() => {
    getContact();
  }, []);

  //retun null
  if (!contact) return null;

  return (
    <div className="container">
      <AppBar
        appName="Contacts"
        title={contact.name}
        create={false}
        showPagination={false}
        data={[]}
      />

      <form className="mt-3 p-3 bg-white rounded shadow-default contact-form">
        <div className="border rounded p-4">
          <div className="d-flex border-bottom position-relative pb-2">
            <div className="icon_round bg-secondary text-white">
              <i className="fa fa-user" />
            </div>
            <div style={{ marginLeft: "5px", marginTop: "-5px" }}>
              <strong>{contact.name}</strong>
              <small className="d-block" style={{ fontSize: ".75rem" }}>
                {new Date(contact.createdAt).toLocaleString()}
              </small>
            </div>
            {contact.read ? (
              <small className="position-absolute top-0 end-0 bg-secondary-light-7 rounded-pill px-2">
                Read
              </small>
            ) : (
              <small className="position-absolute top-0 end-0 bg-primary-light-7 rounded-pill px-2">
                Not read
              </small>
            )}
          </div>

          <div className="py-3">
            <h6 className="mb-2 d-block">Object : {contact.subject}</h6>
            <p style={{ wordBreak: "break-word" }}>{contact.content}</p>
            <div className="mt-2">
              <i className="fa fa-envelope" style={{ marginRight: "7px" }} />
              {contact.email}
            </div>
          </div>

          {contact.read ? null : (
            <>
              <div className="d-flex align-items-center justify-content-between border-top pt-3">
                <div
                  role={"button"}
                  className=" btn-sm bg-primary text-white rounded-pill"
                  onClick={() => replyContact()}>
                  Reply contact
                </div>
              </div>
            </>
          )}
        </div>

        <Editor onChange={onChangeEditor} initialData={messageContent} />
      </form>
    </div>
  );
}

View.propTypes = {};

export default View;