import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { userLocal, userServer } from "../utils/utils";

const BASE_URI = navigator.onLine
	? "https://api.zeslap.com/v1"
	: "http://localhost:8081/v1";

export const GlobalContext = React.createContext();

export default function GlobalProvider({ children }) {
	const [loading, setIsLoading] = useState(false);
	const [notify, setNotify] = useState(false);

	const [error, setError] = useState({
		title: "Something went wrong",
		content: "Bla bla",
		type: "danger",
	});

	const token = userLocal()?.token;
	const params = useSearchParams()[0];

	//Custom setState function to manage loading state variable
	const setLoading = (value) => setTimeout(setIsLoading(value), 500);

	const getBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (e) => reject(e);
		});
	};

	//Context shared values
	const values = {
		BASE_URI,
		loading,
		getBase64,
		setLoading,

		error,
		setError,

		setNotify,
		notify,
		params,
		headers: {
			authorization: "Bearer " + token,
		},
	};

	return (
		<GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
	);
}
