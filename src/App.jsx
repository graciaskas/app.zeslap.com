import React, { useEffect, useState } from "react";

//import components
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import Blog from "./components/Blog";
import User from "./components/User";
import NewsLetter from "./components/NewsLetter";
import Subscription from "./components/Subscription";
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
import LogOut from "./components/LogOut";
import authenticateUser from "./utils/utils";

const API_URL = navigator.onLine
	? "https://api.zeslap.com/v1/users/?profile=1"
	: "http://localhost:8081/v1/users/?profile=1";

const destUrl = navigator.onLine
	? "https://zeslap.com/login"
	: "http://localhost:8082/login";

export default function App() {
	authenticateUser();

	const { loading, client } = useContext(GlobalContext);

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
						<Route path="/subscriptions/*" element={<Subscription />} />
						<Route path="/newsletters/*" element={<NewsLetter />} />
						<Route path="/contacts/*" element={<Contact />} />
						<Route path="/logout/*" element={<LogOut />} />
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
