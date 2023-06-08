import React, { useEffect } from "react";
import { useState } from "react";

const BASE_URI = navigator.onLine
	? "https://api.zeslap.com/v1"
	: "http://localhost:8081/v1";

const API_URL = navigator.onLine
	? "https://api.zeslap.com/v1/users/?profile=1"
	: "http://localhost:8081/v1/users/?profile=1";

export const GlobalContext = React.createContext();

export default function GlobalProvider({ children }) {
	const [loading, setIsLoading] = useState(false);
	let [user, setUser] = useState({});
	var token = "odoo";

	useEffect(() => {
		withUser(client);
	}, []);

	let client = localStorage.getItem("zeslap-user");

	//Custom setState function to manage loading state variable
	const setLoading = (value) => setTimeout(setIsLoading(value), 500);

	const withUser = async (client) => {
		if (!client) throw Error("Arguments missing error: no user passed");
		setLoading(true);
		try {
			client = JSON.parse(client);

			token = client["z_key"];

			let response = await fetch(API_URL, {
				method: "GET",
				headers: { authorization: "Bearer " + client["z_key"] },
			});
			setLoading(false);
			let result = await response.json();
			setUser(result);
		} catch (error) {
			console.error(error);
		}
	};

	//Context shared values
	const values = {
		BASE_URI,
		loading,
		setLoading,
		withUser,
		user,
		setUser,
		client,
		headers: {
			authorization: "Bearer " + token,
		},
	};

	return (
		<GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
	);
}
