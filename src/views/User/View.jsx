import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

import { GlobalContext } from "../../contexts/GlobalContext";
import AppBarCreate from "../../components/AppBarCreate";
import Error from "../../components/Error";
import Toast from "../../components/Toast";
import ChangePwd from "../../components/Modals/ChangePwd";
import Base from "../../utilities/base";
import { Link } from "react-router-dom";

export default function View() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(true);

  const [state, setState] = useState({});

  const { BASE_URI, setLoading, headers, params, setLog, setToast, toast } =
    useContext(GlobalContext);

  async function fetchUser() {
    if (!params.has("q")) return;
    setLoading(true);
    try {
      const id = params.get("q");

      const request = await fetch(BASE_URI + "/users/" + id, {
        headers,
      });
      const response = await request.json();
      setLoading(false);

      if (response.error) {
        setLog(true);
        setToast({ ...toast, content: response.error });
        return;
      }

      setUser(response.data);
      setState({ ...user });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  async function updateUser(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URI}/users/${user?._id}`, {
        method: "PUT",
        headers: {
          "Conten-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(state),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function () {
    fetchUser();
    setTimeout(() => new Base(), 25);
  }, []);

  return (
    user && (
      <>
        <ChangePwd user={user} />
        <form className="container form__sheet" onSubmit={(e) => updateUser(e)}>
          <div className="col-12">
            <div className="bg-white  rounded shadow-default p-3">
              <div className="text-secondary h5 text-raleway">
                <Link to={"/"}>
                  <i className="fa fa-home" />
                </Link>{" "}
                /<Link to={"/users"}>Users</Link> /{user?.username}
              </div>
              <div className="border-top pt-3">
                {editing && (
                  <button
                    name="modifyBtn"
                    type="button"
                    className="btn bg-primary"
                    style={{ marginRight: "7px" }}
                    onClick={(e) => setEditing(false)}>
                    Modify
                  </button>
                )}
                {!editing && (
                  <button
                    type="submit"
                    className="btn bg-primary"
                    style={{ marginRight: "7px" }}>
                    Save
                  </button>
                )}
                <Link to={"/users"} className="btn bg-gray ml-4">
                  Cancel
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-3 p-3 bg-white rounded shadow-default user-form">
            <div className="row">
              <div className="col-12">
                <div className="flex user-stats">
                  {user?.role === "author" && (
                    <>
                      <div className="stat-button flex align-item-center">
                        <i class="fa fa-users stat-icon"></i>
                        <div class="stat-info">
                          <span class="badge bg-secondary d-inline-block">
                            1
                          </span>
                          <span class="block">Followers</span>
                        </div>
                      </div>
                      <div className="stat-button flex align-item-center">
                        <i class="fa fa-heart stat-icon"></i>
                        <div class="stat-info">
                          <span class="badge bg-secondary d-inline-block">
                            1
                          </span>
                          <span class="block">Likes</span>
                        </div>
                      </div>
                      <div className="stat-button flex align-item-center px-2">
                        <i class="fa fa-blog stat-icon"></i>
                        <div class="stat-info">
                          <span class="stat_value badge bg-secondary d-inline-block">
                            1
                          </span>
                          <span class="block">Blog posts</span>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="stat-button flex align-item-center px-2">
                    <i class="fa fa-cogs stat-icon"></i>

                    <div
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#changePwdModal">
                      <span class="block">Change password</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 ">
                <div className="user-profile bg-white p-2 rounded flex">
                  <div className="image">
                    <img
                      src="/img/_p.jpg"
                      alt=""
                      style={{ height: "120px", width: "100%" }}
                      className="img-fluid rounded"
                    />
                    <input type="file" hidden id="user-profile" />
                  </div>
                </div>
              </div>

              <div className="col-lg-10">
                <div className="">
                  <div class="flex mb-2">
                    <div class="flex items-center">
                      <input
                        type="radio"
                        name="type_personnal"
                        id="personnal"
                        checked
                      />
                      <label
                        htmlFor="personnal"
                        class="form-check-label"
                        className="mx-2">
                        Personnal account
                      </label>
                    </div>

                    <div class="flex items-center mx-4">
                      <input type="radio" name="type_personnal" id="company" />
                      <label
                        htmlFor="company"
                        class="form-check-label"
                        className="mx-2">
                        Company account
                      </label>
                    </div>
                  </div>

                  <div className="">
                    <h5>
                      <label htmlhtmlFor="name">Full Name</label>
                    </h5>
                    <input
                      type="text"
                      placeholder="Names"
                      onChange={(e) =>
                        setState({ ...state, username: e.target.value })
                      }
                      className="w-100"
                      disabled
                      id="name"
                      value={user.username}
                    />
                  </div>

                  <div className="oe_group grid grid-cols-2 w-[90%]">
                    <table className="oe_group oe_group_col_6 oe_inner_group">
                      <tbody>
                        {/* <div><h4 className='font-bold mb-2'>Informations personnelles</h4></div> */}
                        <tr>
                          <td className="oe_label">
                            <label htmlhtmlFor="name">Address</label>
                          </td>
                          <td className="w-100">
                            <input
                              type="text"
                              className="oe_input"
                              placeholder="Address"
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  adress_string: e.target.value,
                                })
                              }
                              disabled
                            />
                          </td>
                        </tr>

                        <tr>
                          <td className="oe_label">
                            {" "}
                            <label htmlhtmlFor="name">Company name</label>
                          </td>
                          <td className="w-100">
                            <input
                              type="text"
                              className="oe_input"
                              placeholder="Company name"
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="oe_label">
                            {" "}
                            <label htmlhtmlFor="name">Other information</label>
                          </td>
                          <td className="w-100">
                            <textarea
                              type="text"
                              disabled
                              rows={4}
                              className="oe_input"
                              placeholder="other info"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table class="oe_group oe_group_col_6 oe_inner_group">
                      <tbody>
                        <tr>
                          <td class="oe_label">
                            <label htmlFor="o_field_input_249" title="">
                              Phone
                            </label>
                          </td>
                          <td>
                            <input
                              class="oe_input"
                              name="phone"
                              type="text"
                              placeholder="Phone number"
                              disabled
                              onChange={(e) =>
                                setState({ ...state, phone: e.target.value })
                              }
                            />
                          </td>
                        </tr>

                        <tr>
                          <td class="oe_label">
                            <label htmlFor="o_field_input_251">Email</label>
                          </td>
                          <td>
                            <input
                              class="oe_input"
                              name="email"
                              placeholder="Email address"
                              type="email"
                              value={user.email}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td class="oe_label">
                            <label htmlFor="o_field_input_252">Web Site</label>
                          </td>
                          <td>
                            <input
                              class="oe_input"
                              name="website"
                              placeholder="e.g. www.zeslap.com"
                              type="url"
                              onChange={(e) =>
                                setState({ ...state, website: e.target.value })
                              }
                              disabled
                            />
                          </td>
                        </tr>

                        <tr>
                          <td class="oe_label">
                            <label htmlFor="o_field_input_252">
                              Facebook link
                            </label>
                          </td>
                          <td>
                            <input
                              class="oe_input"
                              name="facebook"
                              placeholder="facebook link"
                              type="text"
                              disabled
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  facebook_link: e.target.value,
                                })
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td class="oe_label">
                            <label htmlFor="o_field_input_252">Linkedin</label>
                          </td>
                          <td>
                            <input
                              class="oe_input"
                              name="linkedin"
                              placeholder="Linkedin link"
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  linkedin_link: e.target.value,
                                })
                              }
                              type="url"
                              disabled
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    )
  );
}
