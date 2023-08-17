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
	const { params, getPosts, posts } = useContext(GlobalContext);

	const [error, setError] = useState(null);

	const viewType = params.get("view") || "th";

	useEffect(function () {
		getPosts();
	}, []);

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
						{viewType === "list" ? (
							<table className="table border">
								<thead>
									<tr>
										<th className="border-right">#</th>
										<th>Blog title</th>
										<th>Category</th>
										<th>Likes</th>
										<th>Comments</th>
										<th>Date</th>
										<th className="text-right">State</th>
										<th>Actions</th>
									</tr>
								</thead>

								<tbody className="table-body-striped">
									{posts.map((post, id) => (
										<tr key={id}>
											<td>{post.id}</td>
											<td>Gracias Kasongo</td>
											<td>{post.category_id[1]}</td>
											<td>{post.likes}</td>
											<td>{post.comments}</td>
											<td>{new Date(post.create_date).toLocaleString()}</td>
											<td className="text-right">
												<span className=" rounded-pill badge bg-primary">
													Posted
												</span>
											</td>
											<td className="d-flex justify-content-between">
												<Link to={`/blog/view?blog=${post._id}`}>
													<span className="fa fa-link" />
												</Link>
												<span className="fa fa-trash text-danger" />
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div className="row">
								{posts.map((post, id) => (
									<div className="col-lg-4 col-md-6 col-12" key={id}>
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
