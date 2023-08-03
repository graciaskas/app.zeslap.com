import React from "react";
import { useState } from "react";
import NewDocument from "../NewDocument";
import AppBar from "../AppBar";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

const ViewComment = ({ comment, id }) => {
	return (
		<div class="modal fade" id={id}>
			<div class="modal-dialog">
				<div class="modal-content  text-secondary">
					<div class="modal-header">
						<h5 class="modal-title">
							<i class="fa fa-key badge bg-secondary"></i>
							View comment
						</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>

					<form action="/api/employees/?action=report" method="post">
						<div class="modal-body">{comment}</div>

						<div class="modal-footer">
							<button class="btn-sm bg-danger text-white" type="submit">
								<i class="fa fa-trash"></i> Delete comment
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default function Index() {
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState(null);
	const { getComments } = useContext(GlobalContext);
	let viewType = "list";

	useEffect(() => {
		getComments(setComments);
	}, []);

	return (
		<div className="container-lg">
			<div className="row">
				<AppBar
					data={[]}
					appName="Comments"
					create={false}
					viewTypes={["list", "th"]}
				/>

				<div className="col-12">
					<div className="p-3 bg-white rounded shadow-default">
						<ViewComment comment={comment} id="viewComment" />
						{viewType === "list" ? (
							<table className="table border">
								<thead>
									<tr>
										<th className="border-right">#</th>
										<th>Commentor</th>
										<th>Email</th>
										<th>Blog id</th>

										<th>Date</th>
										<th>Options</th>
									</tr>
								</thead>

								<tbody className="table-body-striped">
									{comments.map((comment, id) => (
										<>
											<tr key={id}>
												<td>{comment.id}</td>
												<td>{comment.commentor}</td>
												<td>{comment.email}</td>
												<td>{comment.post_id}</td>

												<td>
													{new Date(comment.create_date).toLocaleString()}
												</td>
												<td className="text-right">
													<Link
														to={`?act=view&commentId=${comment.id}#viewComment`}
														data-bs-toggle="modal"
														className="rounded-pill badge bg-secondary text-white">
														View content
													</Link>
												</td>
											</tr>
										</>
									))}
								</tbody>
							</table>
						) : (
							<div className="row">
								{comments.map((comment, id) => (
									<div className="col-lg-4 col-md-6 col-12" key={id}>
										{/* <Blog data={comment} /> */}
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
