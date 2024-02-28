import React, { useEffect, useState, useContext } from "react";

import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

//import views
import Navigation from "./components/Navigation";
import Error from "./components/Error";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import LogOut from "./components/LogOut";

import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Blog from "./views/Blog";
import User from "./views/User";
import NewsLetter from "./views/NewsLetter";
import Subscription from "./views/Subscription";
import Contact from "./views/Contact";
import Payment from "./views/Payment";
import Plan from "./views/Plan";
import Category from "./views/Categories";
import Comment from "./views/Comment";

import "./css/all.min.css";
import "./css/style.min.css";

import { GlobalContext } from "./contexts/GlobalContext";

import { AuthContext } from "./contexts/AuthContext";

import { getToken, parseJwt } from "./utilities/utilities";

export default function App() {
  const {
    loading = false,
    title,
    type,
    log,
    user,
    content,
  } = useContext(GlobalContext);
  const token = getToken();

  if (!token) {
    return <Login />;
  }

  return (
    <div className="App relative">
      <Navigation user={user} />

      {loading ? <Loader /> : null}

      <main className="main">
        <Header user={user} />
        {log ? <Toast title={title} type={type} content={content} /> : null}

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {user &&
              (user.role === "admin" || (user && user.role === "author")) && (
                <>
                  <Route path="/blog/*" element={<Blog />} />
                  <Route path="/comments/*" element={<Comment />} />
                  <Route path="/categories/*" element={<Category />} />
                </>
              )}
            <Route path="/users/*" element={<User />} />
            {user && user.role === "admin" && (
              <>
                <Route path="/subscriptions/*" element={<Subscription />} />
                <Route path="/newsletters/*" element={<NewsLetter />} />
                <Route path="/contacts/*" element={<Contact />} />
              </>
            )}

            <Route path="/logout/*" element={<LogOut />} />
            <Route path="/payments/*" element={<Payment />} />
            <Route path="/plans/*" element={<Plan />} />
            <Route
              path="*"
              element={
                <Error code={404} content={"Page can not be found..."} />
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}
