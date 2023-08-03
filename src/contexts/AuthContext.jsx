import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const destUrl = "http://localhost:8082/login";
export const apiUrl = "http://localhost:8081/v1";

export const AuthContext = React.createContext();

const parseJwt = (token) => {
	try {
		return JSON.parse(atob(token.split(".")[1]));
	} catch (e) {
		return null;
	}
};

const getToken = () => {
	try {
		let client = window.localStorage.getItem("zeslap-user");
		if (!client) return null;
		client = JSON.parse(client);
		return client["zeslap_key"];
	} catch (error) {
		throw Error(error);
	}
};

export default function AuthProvider({ children }) {
	const currentLocation = useLocation();
	const [state, setState] = useState({
		user: null,
		authenticated: false,
	});

	let params = new URLSearchParams(window.location.search);
	let auth = params.has("auth") && params.get("auth");

	useEffect(() => {
		if (auth) {
			window.localStorage.setItem(
				"zeslap-user",
				JSON.stringify({
					zeslap_key: auth,
				})
			);
		}

		if (!getToken()) {
			return (window.location.href = destUrl);
		}

		const user = parseJwt(getToken());

		if (!user || user.exp * 1000 < Date.now()) {
			return (window.location.href = destUrl);
		}

		setState({ authenticated: true, user });

		// getUser(getToken());
	}, [currentLocation]);

	const values = {
		token: getToken(),
		user: state.user,
	};
	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
