import React, { useEffect, useState } from "react";

//import components
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import Blog from "./components/Blog";
import User from "./components/User";
import NewsLetter from "./components/NewsLetter";
import Contact from "./components/Contact";
import Error from "./components/Error";

import {
	Link,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";

import "./css/bootstrap.min.css";
import "./css/all.min.css";
import "./css/main.min.css";

import Header from "./components/Header";
import Loader from "./components/Loader";
import { useContext } from "react";
import { GlobalContext } from "./contexts/GlobalContext";

import { useParameters } from "./hooks/hooks";

const destUrl = navigator.onLine
	? "https://zeslap.com/login"
	: "http://localhost:8082/login";

export default function App() {
	const { loading, withUser, user, setUser, client } =
		useContext(GlobalContext);

	let params = new URLSearchParams(window.location.search);
	let auth = params.has("auth") && params.get("auth");

	//check user local not exits but given token exists
	if (!client && auth) {
		window.localStorage.setItem(
			"zeslap-user",
			JSON.stringify({
				z_key: auth,
				create_date: new Date(),
			})
		);
	}

	//check user local not exits nor given token exists
	if (!client && !auth) {
		return (
			<div className="d-flex flex-column justify-content-center align-items-center bg-gray vh-100">
				<div className="container text-center">
					<h1 className="display-1 text-primary">401</h1>
					<p>
						Sorry, you are not allowed to access the page you're trying to{" "}
						<br />
						reach. This means either you entered manualy <br /> the URL or the
						url is not accessible any more.
					</p>
					<a
						href={destUrl}
						role="button"
						className="btn rounded-pill bg-primary text-white ">
						Please sign in
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className="App">
			<Navigation />

			{loading ? <Loader /> : null}

			<main className="main">
				<Header />
				<div className="main-content">
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/blog/*" element={<Blog />} />
						<Route path="/users/*" element={<User />} />
						<Route path="/newsletters/*" element={<NewsLetter />} />
						<Route path="/contacts/*" element={<Contact />} />
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
