import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios/axiosClient";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import { GlobalContext } from "../contexts/GlobalContext";
import { setToken } from "../utilities/utilities";

export default function Login() {
  const { toast, log, setLog, setToast, setLoading, loading } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  async function requestLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosClient.post("/users/login", {
        email,
        password,
      });
      setToken(data.token);
      setLoading(false);
      return navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      const { message } = error.response.data;
      setLog(true);
      setToast({
        content: message,
      });
    }
  }

  useEffect(() => {
    console.log("App started");
  }, []);

  return (
    <div className="relative">
      {loading ? <Loader /> : null}
      {log ? (
        <Toast title={toast.title} type={toast.type} content={toast.content} />
      ) : null}
      <div className="App flex justify-center items-center min-h-screen">
        <div className="form__login rounded-lg shadow-default bg-white">
          <div className="block__form">
            <div className="form__header flex items-center justify-center border-b">
              <img src="/icons/logo.png" alt="" width={130} />
            </div>

            <form className="p-4" id="userLogin" onSubmit={requestLogin}>
              <label htmlFor="email">Email address</label>
              <div className="input__group border  w-100 mt-2">
                <span className="input__icon" id="basic-addon1">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <label htmlFor="password">Password</label>
              <div className="input__group border  w-100 mt-2 bg-white">
                <span className="input__icon">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-75"
                  required
                  name="password"
                  id="password"
                />
              </div>

              <a
                href="https://zeslap.com/reset"
                className="py-2 mt-2 block underline">
                <small className="text-primary  fst-normal fs-6 text-decoration-underline">
                  I forget my account password.
                </small>
              </a>
              <button
                type="submit"
                className="btn bg-primary text-white  w-100  mt-2 w-full">
                Sign in
              </button>
              <a
                href="https://zeslap.com/register"
                className="btn w-100  bg-secondary text-white block mt-2">
                Create an account
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
