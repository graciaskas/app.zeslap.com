import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import Toast from "./Toast";

const style = {
  position: "fixed",
  width: "100%",
  height: "100%",
  overflowX: "hidden",
  overflowY: "auto",
  outline: 0,
  zIndex: 1069,
  top: 0,
  left: 0,
  backgroundColor: "rgba(255,255,255,.6)",
  display: "none",
};

const navCloser = {
  position: "absolute",
  top: 5,
  right: 5,
  cursor: "pointer",
};

export default function Header({ user }) {
  const { error, notify } = useContext(GlobalContext);
  const [state, setState] = useState(style);

  const closeNavigation = (e) => {
    e.preventDefault();
    setState({ ...style, display: "none" });
  };

  return (
    <>
      <header className="main-header bg-white shadow-default p-2 d-none d-md-flex  align-items-center">
        <div className="container-lg">
          <div className="d-flex justify-content-between align-items-center">
            <form action="" className="w-50 rounded-pill bg-gray">
              <input
                type="text"
                placeholder="Search"
                className="w-100 bg-gray rounded-pill"
              />
            </form>
            <nav className="header__icons d-flex align-items-center justify-content-center">
              <li className="header__icon  position-relative  px-2 bg-gray rounded-pill">
                <i className="fa fa-comments"></i>
                <span className="position-absolute bottom-0 start-100 translate-middle badge rounded-pill bg-warning">
                  05
                </span>
              </li>
              <li className="header__icon  position-relative mx-5 px-2 bg-gray rounded-pill">
                <i className="fa fa-bell"></i>
                <span className="position-absolute bottom-0 start-100 translate-middle badge rounded-pill bg-orange">
                  05
                </span>
              </li>
              <li className="dropdown">
                <Link
                  className="btn text-white bg-primary dropdown-toggle"
                  to={"#"}
                  role="button"
                  id="dropdownProducts"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <i className="fa fa-user-circle"></i>
                  {user?.username}
                </Link>

                <ul
                  className="dropdown-menu  p-4 shadow-default border-0 rounded"
                  aria-labelledby="dropdownProducts">
                  <li>
                    <Link
                      to={`/users/view?q=${user?.id}`}
                      className="dropdown-itemx">
                      My profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/preferences" className="dropdown-itemx">
                      My Preferences
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link to="/logout" className="dropdown-itemx">
                      <i className="fa fa-times-circle" /> Log Out
                    </Link>
                  </li>
                </ul>
              </li>
            </nav>
          </div>
        </div>
      </header>

      <header className="d-flex justify-content-between d-md-none align-items-center bg-white shadow-default p-2 d-flex  align-items-center">
        <div className="header__brand">
          <img src="https://zeslap.com/src/icon.png" alt="" width={100} />
        </div>

        <ul className="header__icons d-flex align-items-center">
          <li className="header__icon  position-relative  px-2 bg-gray rounded-pill">
            <i className="fa fa-comments"></i>
            <span className="position-absolute bottom-0 start-100 translate-middle badge rounded-pill bg-warning">
              05
            </span>
          </li>
          <li className="header__icon  position-relative mx-5 px-2 bg-gray rounded-pill">
            <i className="fa fa-bell"></i>
            <span className="position-absolute bottom-0 start-100 translate-middle badge rounded-pill bg-orange">
              05
            </span>
          </li>
        </ul>

        <div
          role={"button"}
          style={{ cursor: "pointer" }}
          onClick={(e) => setState({ ...style, display: "block" })}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            width={35}
            height={35}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        </div>

        <div className="navigation__container" style={state}>
          <nav className="navigation bg-secondary" style={{ width: "80%" }}>
            <div className="navigation-nav" role={"navigation"}>
              <Link to="/" className="d-flex align-items-center">
                <i className="fas fa-columns"></i>
                <span className="text-decoration-none t-white">Dashboard</span>
              </Link>
              {user && user.role === "admin" && (
                <Link
                  to="/contacts/?view=th"
                  className="d-flex align-items-center">
                  <i className="fas fa-envelope"></i>
                  <span className="text-decoration-none t-white">
                    Site contacts
                  </span>
                  <i className="badge rounded-pill bg-secondary float-right">
                    05
                  </i>
                </Link>
              )}
              {user && user.role === "admin" && (
                <Link
                  to="/newsletters/?view=list"
                  className="d-flex align-items-center">
                  <i className="fas fa-at "></i>
                  <span className="text-decoration-none">Newsletters</span>
                  <i className="badge rounded-pill bg-orange float-right">05</i>
                </Link>
              )}
              {user && user.role === "admin" && (
                <Link
                  to="/users/?view=th"
                  className="d-flex align-items-center">
                  <i className="fas fa-users "></i>
                  <span className="text-decoration-none t-white">Users</span>
                  <i className="badge rounded-pill bg-primary float-right">
                    05
                  </i>
                </Link>
              )}

              {user &&
                (user.role === "admin" || (user && user.role === "author")) && (
                  <li className="navigation-dropdown">
                    <Link
                      data-bs-toggle="collapse"
                      to={"#multiCollapseExample1"}
                      className="collapse-item d-block w-100">
                      <i className="fas fa-blog "></i>
                      <span className="text-decoration-none t-white">Post</span>
                    </Link>
                    <div
                      className="collapse multi-collapse bg-secondary-dark-2 rounded"
                      id="multiCollapseExample1">
                      {/* <Link to="/blog/?view=th" className="d-flex align-items-center">
									<i className="fas fa-columns"></i>
									<span className="text-decoration-none t-white">
										Dashboard
									</span>
								</Link> */}
                      <Link
                        to="/blog/blogs/?view=th"
                        className="d-flex align-items-center active">
                        <i className="fas fa-blog "></i>
                        <span className="text-decoration-none t-white">
                          Posts
                        </span>
                        <i className="badge rounded-pill bg-warning float-right">
                          05
                        </i>
                      </Link>
                      <Link
                        to="/comments/?view=th"
                        className="d-flex align-items-center">
                        <i className="fas fa-blog "></i>
                        <span className="text-decoration-none t-white">
                          Comments
                        </span>
                        <i className="badge rounded-pill bg-success-dark-3 float-right">
                          125
                        </i>
                      </Link>
                      <Link
                        to="/categories/?view=th"
                        className="d-flex align-items-center">
                        <i className="fas fa-blog "></i>
                        <span className="text-decoration-none t-white">
                          Categories
                        </span>
                        <i className="badge rounded-pill bg-odoo float-right">
                          12
                        </i>
                      </Link>
                    </div>
                  </li>
                )}

              {user && user.role === "admin" && (
                <Link
                  to="/subscriptions/?view=list"
                  className="d-flex align-items-center">
                  <i className="fas fa-at "></i>
                  <span className="text-decoration-none">Subscriptions</span>
                  <i className="badge rounded-pill bg-orange float-right">05</i>
                </Link>
              )}

              <Link to="/plans" className="d-flex align-items-center">
                <i className="fas fa-cog "></i>
                <span className="text-decoration-none t-white">Plans</span>
              </Link>

              <Link to="/payments" className="d-flex align-items-center">
                <i className="fa fa-credit-card "></i>
                <span className="text-decoration-none t-white">
                  Payments history
                </span>
              </Link>

              <li className="dropdown text-danger">
                <Link
                  className="btn text-white bg-primary dropdown-toggle"
                  to={"#"}
                  role="button"
                  id="dropdownProducts"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <i className="fa fa-user-circle"></i>
                  {user?.username}
                </Link>

                <ul
                  className="dropdown-menu  p-4 shadow-default border-0 rounded"
                  aria-labelledby="dropdownProducts">
                  <li>
                    <Link
                      to={`/users/view?q=${user?.id}`}
                      className="dropdown-itemx text-secondary">
                      My profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/preferences"
                      className="dropdown-itemx text-secondary">
                      My Preferences
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link
                      to="/logout"
                      className="dropdown-itemx text-secondary">
                      <i className="fa fa-times-circle" /> Log Out
                    </Link>
                  </li>
                </ul>
              </li>
            </div>
          </nav>
          <div
            className="navigation__closer"
            style={navCloser}
            onClick={closeNavigation}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              width={35}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </header>

      {notify && (
        <Toast type={error.type} title={error.title} content={error.content} />
      )}
    </>
  );
}
