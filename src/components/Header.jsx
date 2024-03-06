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
      <header className="app__header bg-white shadow-default p-2 hidden md:flex  items-center">
        <div className="container-lg">
          <div className="flex justify-between items-center">
            <form action="" className="w-70 rounded-pill">
              <input
                type="search"
                placeholder="Search"
                className="w-100 bg-gray rounded-md w-full"
              />
            </form>
            <div className="header__icons flex items-center justify-center gap-6 w-30">
              <div className="header__icon  relative  px-2 ">
                <i className="fa fa-comments"></i>
                <span className="absolute top-[-2px] right-[-10px] text-white badge rounded-pill bg-success">
                  15
                </span>
              </div>
              <div className="header__icon  relative mx-5 px-2">
                <i className="fa fa-bell"></i>
                <span className="absolute top-[-2px] right-[-10px] text-white badge rounded-pill bg-primary">
                  05
                </span>
              </div>
              {/* <button className="relative group">
                <div className="btn bg-primary text-white">
                  <i className="fa fa-user-circle mr-2 "></i>
                  <span className="text-white">{user?.username}</span>
                </div>
                <div className="absolute bg-white  hidden p-4 shadow-default border-0 rounded min-w-full top-full w-max group-focus:block">
                  <ul className="text-left">
                    <li className="px-4 py-1">
                      <Link
                        to={`/users/view?q=${user?.id}`}
                        className="text-sm font-normal hover:bg-gray-100 rounded-sm block">
                        My profile
                      </Link>
                    </li>
                    <li className="px-4 py-1">
                      <Link to="/preferences" className="text-sm font-normal">
                        My Preferences
                      </Link>
                    </li>
                    <hr />
                    <li className="px-4 py-1 ">
                      <Link to="/logout" className="text-sm font-normal">
                        <i className="fa fa-times-circle" /> Log Out
                      </Link>
                    </li>
                  </ul>
                </div>
              </button> */}
              <div className="header__user">
                <button
                  id="dropdownHoverButton"
                  data-dropdown-toggle="dropdownHover"
                  data-dropdown-trigger="hover"
                  class="btn bg-primary"
                  type="button">
                  <i className="fa fa-user-circle mr-2 "></i>
                  <span className="text-white">{user?.username}</span>
                  <svg
                    class="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownHover"
                  class="z-10 hidden bg-white divide-y divide-gray-100 rounded-md shadow-default min-w-44">
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200 p-2"
                    aria-labelledby="dropdownHoverButton">
                    <li className="">
                      <Link
                        to={`/users/view?q=${user?.id}`}
                        class="block p-2 hover:bg-gray-100 rounded">
                        Profile
                      </Link>
                    </li>
                    <li className="">
                      <Link to="#" class="block p-2 hover:bg-gray-100 ">
                        Settings
                      </Link>
                    </li>

                    <li>
                      <Link to={"/logout"} class="block p-2 hover:bg-gray-100 ">
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="app__header__mobile lg:hiddden md:hidden flex justify-between  items-center bg-white shadow-default p-2">
        <div className="header__brand">
          <img src="https://zeslap.com/src/icon.png" alt="" width={100} />
        </div>

        <ul className="header__icons flex items-center">
          <li className="header__icon  relative  px-2 bg-gray rounded-pill">
            <i className="fa fa-comments"></i>
            <span className="absolute bottom-0 start-100 translate-middle badge rounded-pill bg-warning">
              05
            </span>
          </li>
          <li className="header__icon  relative mx-5 px-2 bg-gray rounded-pill">
            <i className="fa fa-bell"></i>
            <span className="absolute bottom-0 start-100 translate-middle badge rounded-pill bg-orange">
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
              <Link to="/" className="flex items-center">
                <i className="fas fa-columns"></i>
                <span className="text-decoration-none t-white">Dashboard</span>
              </Link>
              {user && user.role === "admin" && (
                <Link to="/contacts/?view=th" className="flex items-center">
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
                  className="flex items-center">
                  <i className="fas fa-at "></i>
                  <span className="text-decoration-none">Newsletters</span>
                  <i className="badge rounded-pill bg-orange float-right">05</i>
                </Link>
              )}
              {user && user.role === "admin" && (
                <Link to="/users/?view=th" className="flex items-center">
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
                      className="collapse-item block w-100">
                      <i className="fas fa-blog "></i>
                      <span className="text-decoration-none t-white">Post</span>
                    </Link>
                    <div
                      className="collapse multi-collapse bg-secondary-dark-2 rounded"
                      id="multiCollapseExample1">
                      {/* <Link to="/blog/?view=th" className="flex items-center">
									<i className="fas fa-columns"></i>
									<span className="text-decoration-none t-white">
										Dashboard
									</span>
								</Link> */}
                      <Link
                        to="/blog/blogs/?view=th"
                        className="flex items-center active">
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
                        className="flex items-center">
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
                        className="flex items-center">
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
                  className="flex items-center">
                  <i className="fas fa-at "></i>
                  <span className="text-decoration-none">Subscriptions</span>
                  <i className="badge rounded-pill bg-orange float-right">05</i>
                </Link>
              )}

              <Link to="/plans" className="flex items-center">
                <i className="fas fa-cog "></i>
                <span className="text-decoration-none t-white">Plans</span>
              </Link>

              <Link to="/payments" className="flex items-center">
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
                      className="dropdown-item text-secondary">
                      My profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/preferences"
                      className="dropdown-item text-secondary">
                      My Preferences
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link to="/logout" className="dropdown-item text-secondary">
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
