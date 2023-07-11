import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import Toast from "./Toast";

function Table(props) {
	const { data, fields } = props;
	const [error, setError] = useState(null);

	useEffect(function () {
		let items = [];
	});

	if (!data || !fields || fields.length === 0) {
		return (
			<Toast
				type="danger"
				title="Props error"
				content={"Props data or fields is mandatory for the requested view !"}
			/>
		);
	}

	return (
		<div className="col-12">
			<div className="mt-3 p-3 bg-white rounded shadow-default">
				<table className="table border rounded">
					<thead>
						<tr>
							<th>
								<input type="checkbox" name="" id="" />
							</th>
							<th>#</th>
							{fields.map((field, id) => (
								<th key={id}>{field.title}</th>
							))}
						</tr>
					</thead>

					<tbody className="table-body-striped">
						{data.map((item, id) => (
							<tr key={id}>
								<td>
									<input type="checkbox" name="" id="" />
								</td>
								<td>5</td>
								<td>graciaskas92@gmail.com</td>
								<td>Gracias Kasongo</td>
								<td>45/45/4765</td>
								<td>
									<span className="badge bg-odoo">verified</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

Table.propTypes = {
	data: PropTypes.array.isRequired,
	fields: PropTypes.array.isRequired,
};

export default Table;
