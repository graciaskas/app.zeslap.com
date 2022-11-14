import React from "react";

//import components
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import Blog from "./components/Blog";
import User from "./components/User";
import NewsLetter from "./components/NewsLetter";
import Contact from "./components/Contact";
import Error from "./components/Error"

import { Link, Route, Routes } from "react-router-dom";

import "./css/bootstrap.min.css";
import "./css/all.min.css";
import "./css/main.min.css";


import Header from "./components/Header";
import Loader from "./components/Loader";
import { useContext } from "react";
import { GlobalContext } from "./contexts/GlobalContext";

export default function App() {
  const { loading, setLoading } = useContext(GlobalContext);
    // const user = localStorage.getItem('x-user-zeslap') || null;

    // if (!user) return (
    //   <div className="d-flex flex-column justify-content-center align-items-center bg-gray vh-100">
    //     <div className="container text-center">
    //       <h1 className="display-1 text-primary">401</h1>
    //       <p>You are not allowed to access this urls.</p>
    //    </div>
    //   </div>
    // )

    // const data = JSON.parse(user);
    // const token = data[ 'x-user-zeslap-key' ];

    // console.log(token);
  const text = 'Page cannot be found on this server !';
      
  return (
    <div className="App">
      <Navigation />

      {loading ? <Loader />: null} 
      
      <main className="main">

        <Header />

        <div className="main-content">
           
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/blog/*" element={<Blog />} />
              <Route path="/users/*" element={<User />} />
              <Route path="/newsletters/*" element={<NewsLetter />} />
              <Route path="/contacts/*" element={<Contact />} />
              <Route path="*" element={<Error code={404} content={text } />} />
            </Routes>
        </div>

      </main>
    </div>
  );
}
