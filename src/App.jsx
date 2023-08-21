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
import Category from "./components/Categories";
import Comment from "./components/Comment";

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
// import "./scss/style.scss";

import Header from "./components/Header";
import Loader from "./components/Loader";
import { useContext } from "react";
import { GlobalContext } from "./contexts/GlobalContext";

import LogOut from "./components/LogOut";

import Payment from "./components/Payment";
import Plan from "./components/Plan";
import { AuthContext } from "./contexts/AuthContext";
import Toast from "./components/Toast";

export default function App() {
	const { user } = useContext(AuthContext);
	const { loading, toast, log } = useContext(GlobalContext);
	const { title, type, content } = toast;

	useEffect(() => {
		console.log(user, process.env.REACT_APP_MODE);
	}, [user]);

	return (
		<div className="App">
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
