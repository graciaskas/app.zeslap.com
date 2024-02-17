import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AppBarCreate from "../AppBarCreate";

import { GlobalContext } from "../../contexts/GlobalContext";
import Toast from "../Toast";
import Editor from "../Editor";

export default function Create() {
  const { BASE_URI, headers, toast, setToast, setLoading, setLog } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  //Blog state object
  const [state, setState] = useState({
    subject: null,
    content: null,
  });

  async function submitNewsletter(event) {
    event.preventDefault();
    const { subject, content } = state;

    if (!subject || !content) {
      setLog(true);
      setToast({
        subject: "Form validation toast",
        content: "Please some required field are empty",
        type: "danger",
      });
      return;
    }

    try {
      setLoading(true);
      const uri = `${BASE_URI}/newsletters`;

      const response = await fetch(uri, {
        method: "POST",
        headers,
        body: JSON.stringify(state),
      });

      setLoading(false);
      const json = await response.json();

      if (response.status === 200) {
        //Handle user UI Error view
        setLog(true);
        setToast({
          ...toast,
          content: "Newsletter created  successfully !",
          type: "success",
          subject: "Newsletter action done",
        });
        return navigate("/newsletters");
      }
    } catch (e) {
      setLoading(false);
      setToast({ ...toast, content: e.message });
      throw Error(e);
    }
  }

  function onChangeEditor(editorContent) {
    return setState({ ...state, content: editorContent });
  }

  return (
    <div className="container-lg">
      <div className="row">
        <div className="col-12">
          <form className="text__form" onSubmit={submitNewsletter}>
            <div className="row">
              <AppBarCreate appName="Newsletters" />

              <div className="col-12">
                <div className="p-3 bg-white mt-3 shadow-default rounded">
                  <div className="row">
                    <div className="col-12">
                      <div className="input-group border  w-100 mt-2 ">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-book" />
                        </span>
                        <input
                          type="text"
                          placeholder="Subject"
                          required
                          name="subject"
                          onChange={(e) =>
                            setState({ ...state, subject: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <Keyboard refElement={writingAreaRef} /> */}
              <Editor onChange={onChangeEditor} initialData={""} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
