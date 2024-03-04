import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navigation({ user }) {
  return (
    <aside className="navigation bg-secondary">
      {/**/}
      <div className="flex items-center bg-white navigation-header">
        <img src="/icons/logo.png" alt="" width={150} />
      </div>

      <div className="navigation-nav" role={"navigation"}>
        <Link to="/dashboard" className="flex items-center">
          <i className="fas fa-columns"></i>
          <span className="text-decoration-none t-white">Dashboard</span>
        </Link>
        {user && user.role === "admin" && (
          <Link to="/contacts/?view=th" className="flex items-center">
            <i className="fas fa-envelope"></i>
            <span className="text-decoration-none t-white">Site contacts</span>
            <i className="badge rounded-pill bg-secondary float-right">05</i>
          </Link>
        )}
        {user && user.role === "admin" && (
          <Link to="/newsletters/?view=list" className="flex items-center">
            <i className="fas fa-at "></i>
            <span className="text-decoration-none">Newsletters</span>
            <i className="badge rounded-pill bg-orange float-right">05</i>
          </Link>
        )}
        {user && user.role === "admin" && (
          <Link to="/users/?view=th" className="flex items-center">
            <i className="fas fa-users "></i>
            <span className="text-decoration-none t-white">Users</span>
            <i className="badge rounded-pill bg-primary float-right">05</i>
          </Link>
        )}

        {user &&
          (user.role === "admin" || (user && user.role === "author")) && (
            <li className="navigation-dropdown">
              <details className=" block w-100">
                <summary className="text-white list-none p-2 cursor-pointer hover:bg-slate-300">
                  <i className="fas fa-blog "></i>
                  <span className="text-decoration-none t-white">Post</span>
                </summary>
                <div className=" bg-secondary-dark-2 rounded">
                  <Link to="/blog/?view=th" className="flex items-center">
                    <i className="fas fa-columns"></i>
                    <span className="text-decoration-none t-white">
                      Dashboard
                    </span>
                  </Link>
                  <Link
                    to="/blog/blogs/?view=th"
                    className="flex items-center active">
                    <i className="fas fa-blog "></i>
                    <span className="text-decoration-none t-white">Posts</span>
                    <i className="badge rounded-pill bg-warning float-right">
                      05
                    </i>
                  </Link>
                  <Link to="/comments/?view=th" className="flex items-center">
                    <i className="fas fa-blog "></i>
                    <span className="text-decoration-none t-white">
                      Comments
                    </span>
                    <i className="badge rounded-pill bg-success-dark-3 float-right">
                      125
                    </i>
                  </Link>
                  <Link to="/categories/?view=th" className="flex items-center">
                    <i className="fas fa-blog "></i>
                    <span className="text-decoration-none t-white">
                      Categories
                    </span>
                    <i className="badge rounded-pill bg-odoo float-right">12</i>
                  </Link>
                </div>
              </details>
            </li>
          )}

        {user && user.role === "admin" && (
          <Link to="/subscriptions/?view=list" className="flex items-center">
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
          <span className="text-decoration-none t-white">Payments history</span>
        </Link>
      </div>
    </aside>
  );
}
