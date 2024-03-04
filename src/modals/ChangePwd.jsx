import React, { useContext, useEffect } from "react";
import axiosClient from "../axios/axiosClient";
import { GlobalContext } from "../contexts/GlobalContext";
import { closeModal } from "../utilities/utilities";

export default function ChangePwd() {
  const { setLoading, toast, setToast, setLog, user } =
    useContext(GlobalContext);

  const updatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosClient.put("/users/" + user.id + "/pwd", {
        current_pwd: e.target.elements[1].value,
        new_pwd: e.target.elements[2].value,
        confirm_pwd: e.target.elements[3].value,
      });
      setLoading(false);
      window.localStorage.removeItem("zeslap-user");
    } catch (error) {
      setLoading(false);
      setLog(true);
      setToast({ ...toast, content: error.message });
      throw Error(error.message);
    }
  };

  return (
    <form
      className="modal flex"
      tabIndex="-1"
      id="changePwdModal"
      onSubmit={updatePassword}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title h5">Change password</h5>
            <span
              className="fa fa-remove"
              role={"button"}
              onClick={(e) => closeModal("changePwdModal")}>
              x
            </span>
          </div>
          <div className="modal-body">
            <div className="input">
              <label htmlFor="current_pwd">Current password</label>
              <div className="input__group border  w-100 mt-2 bg-gray-light-2">
                <span className="input__icon" id="basic-addon1">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  type="password"
                  placeholder="Current password"
                  required={true}
                  id="current_pwd"
                  name="current_pwd"
                />
              </div>
            </div>

            <div className="input">
              <label htmlFor="new_pwd">New password</label>
              <div className="input__group border  w-100 mt-2 bg-gray-light-2">
                <span className="input__group-text" id="basic-addon1">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  type="password"
                  placeholder="New password"
                  required={true}
                  id="new_pwd"
                  name="new_pwd"
                />
              </div>
            </div>

            <div className="input">
              <label htmlFor="confirm_pwd">Confirm password</label>
              <div className="input__group border  w-100 mt-2 bg-gray-light-2">
                <span className="input__group-text" id="basic-addon1">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  type="password"
                  placeholder="Confirm password"
                  required={true}
                  id="confirm_pwd"
                  name="confirm_pwd"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn bg-primary">
              Change password
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
