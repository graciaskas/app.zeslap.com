import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import AppBar from "../AppBar";
import Table from "../Table";
import { GlobalContext } from "../../contexts/GlobalContext";

function NewsLetters(props) {
	const { setLoading, BASE_URI, headers } = useContext(GlobalContext);
	const [newsletters, setNewsLetters] = useState([]);

	async function getNewsLetters() {
		setLoading(true);

		try {
			const request = await fetch(`${BASE_URI}/newsletter/`, { headers });
			setLoading(false);
			const response = await request.json();
			if (response.data) {
				return setNewsLetters(response.data);
			}
		} catch (error) {
			throw Error(error);
		}
	}

	useEffect(() => {
		getNewsLetters();
	}, []);

	const fields = [
		{ name: "email", title: "Email" },
		{ name: "username", title: "Related user" },
		{ name: "create_date", title: "Create date" },
		{ name: "status", title: "State" },
		{ name: "action", title: "Action" },
	];
	const rows = [];
	return (
		<div className="container position-relative">
			<div className="row">
				<AppBar data={[]} appName="NewsLetters" viewTypes={["list"]} />

				<Table data={newsletters} fields={fields} />
			</div>
		</div>
	);
}

NewsLetters.propTypes = {};

export default NewsLetters;
