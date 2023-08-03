import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

//import components
import AppBar from "../AppBar";
import Toast from "../Toast";

//import contexts
import { GlobalContext } from "../../contexts/GlobalContext";
import Table from "../Table";

import Error from "../Error";

export default function Users() {
	//States variables
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const { setLoading, BASE_URI, headers } = useContext(GlobalContext);

	//Seach params => Trying to get view paramater from current location;
	const params = new URLSearchParams(window.location.search);
	const viewType = params.get("view") || "th";

	//Table view type columns to display
	const fields = [
		{ name: "username", title: "Name" },
		{ name: "email", title: "Email" },
	];

	async function fetchUsers() {
		setLoading(true);
		try {
			const response = await fetch(BASE_URI + "/users?sort=all", { headers });
			setLoading(false);
			if (response.status === 200) {
				const { data } = await response.json();
				setUsers(data);
				return;
			}
			//When server respond with error message
			const { message } = await response.json();
			setError(message);
		} catch (e) {
			console.error(e);
			setError(e.message);
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchUsers();
	}, []);

	//Check if there is an error
	if (error) {
		return (
			<Error code={500} content="The page is not available for the moment!">
				<Toast type="danger" title="Something went wrong !" content={error} />
			</Error>
		);
	}

	// //check if data is fetched
	// if (users.length === 0) return;

	//Component default return
	return (
		<div className="container position-relative">
			<div className="row">
				<AppBar data={users} appName="Plans" viewTypes={["list"]} />

				<Table data={users} fields={fields} />
			</div>
		</div>
	);
}
