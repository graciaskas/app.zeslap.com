import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import AppBar from "../AppBar";
import Error from "../Error";
import Toast from "../Toast";
import Blog from "./BlogCard";
import NewDocument from "../NewDocument";

export default function Blogs() {
	const { BASE_URI, setLoading, headers, params } = useContext(GlobalContext);
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);

	const viewType = params.get("view") || "th";

	async function fetchPosts() {
		setLoading(true);
		try {
			const res = await fetch(BASE_URI + "/posts", {
				method: "GET",
				headers: { ...headers },
			});
			const resJSON = await res.json();
			setLoading(false);

			res.status === 200 ? setPosts(resJSON.data) : setError(resJSON.message);
		} catch (error) {
			console.log(error);
			setError(error.message);
			setLoading(false);
		}
	}

	useEffect(function () {
		fetchPosts();
	}, []);

	//Check if there is an error
	if (error) {
		return (
			<Error code={500} content="The page is not available for the moment!">
				<Toast type="danger" title="Something went wrong !" content={error} />
			</Error>
		);
	}

	return (
		<div className="container-lg">
			<div className="row">
				<AppBar
					data={[]}
					appName="Blogs"
					create={true}
					viewTypes={["list", "th"]}
				/>

				<div className="col-12">
					<div className="p-3 bg-white rounded shadow-default">
						{!posts.length && (
							<NewDocument title="Create a new blog" content="" />
						)}
						{viewType === "list" ? (
							<table className="table border">
								<thead>
									<tr>
										<th className="border-right">#</th>
										<th>Blog title</th>
										<th>Email</th>
										<th>Amount</th>
										<th>Cart type</th>
										<th>Date</th>
										<th className="text-right">State</th>
									</tr>
								</thead>

								<tbody className="table-body-striped">
									{posts.map((post, id) => (
										<tr key={id}>
											<td>{post.id}</td>
											<td>Gracias Kasongo</td>
											<td>Email</td>
											<td>$50.00</td>
											<td>Visa</td>
											<td>30/10/2022</td>
											<td className="text-right">
												<span className=" rounded-pill badge bg-success">
													Completed
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div className="row">
								{posts.map((post, id) => (
									<div className="col-lg-6 col-md-6 col-12" key={id}>
										<Blog data={post} />
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
