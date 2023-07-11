import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

import { GlobalContext } from "../../contexts/GlobalContext";
import AppBar from "../AppBar";
import Error from "../Error";
import Toast from "../Toast";

export default function View() {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const { BASE_URI, setLoading, headers } = useContext(GlobalContext);

	useEffect(function () {
		const params = new URLSearchParams(window.location.search);

		async function fetchUsers() {
			if (!params.has("q")) return;
			setLoading(true);
			try {
				const id = params.get("q");
				const { data } = await (
					await fetch(BASE_URI + "/users/" + id, {
						headers,
					})
				).json();
				setUser(data[0]);
				setLoading(false);
			} catch (e) {
				console.log(e);
				setError(e.message);
				setLoading(false);
			}
		}
		fetchUsers();
	}, []);

	//Check if there is an error
	if (error) {
		return (
			<Error code={500} content="Internal server error! Please try again later">
				<Toast type="danger" title="Something went wrong !" content={error} />
			</Error>
		);
	}

	if (!user) return;

	return (
		<div className="container">
			<AppBar
				appName="Users"
				title={user.username}
				create={false}
				showPagination={false}
				data={[]}
			/>

			<form className="mt-3 p-3 bg-white rounded shadow-default user-form">
				<div className="row">
					<div className="col-12">
						<div className="d-flex user-stats">
							<div className="stat-button d-flex align-item-center">
								<i class="fa fa-users stat-icon"></i>
								<div class="stat-info">
									<span class="badge bg-secondary d-inline-block">1</span>
									<span class="d-block">Followers</span>
								</div>
							</div>
							<div className="stat-button d-flex align-item-center">
								<i class="fa fa-heart stat-icon"></i>
								<div class="stat-info">
									<span class="badge bg-secondary d-inline-block">1</span>
									<span class="d-block">Likes</span>
								</div>
							</div>
							<div className="stat-button d-flex align-item-center px-2">
								<i class="fa fa-blog stat-icon"></i>
								<div class="stat-info">
									<span class="stat_value badge bg-secondary d-inline-block">
										1
									</span>
									<span class="d-block">Blog posts</span>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-2">
						<div className="user-profile bg-white p-2 rounded">
							<div className="image">
								<img
									src="/img/_p.jpg"
									alt=""
									style={{ height: "120px", width: "100%" }}
									className="img-fluid rounded"
								/>
								<input type="file" hidden id="user-profile" />
							</div>
						</div>
					</div>

					<div className="col-lg-10">
						<div className="row">
							<div className="col-md-6 col-12">
								<div className="input-group border  w-100 mt-2 bg-gray-light-2">
									<span className="input-group-text" id="basic-addon1">
										<i className="fa fa-user" />
									</span>
									<input
										type="text"
										placeholder="Names"
										required
										disabled
										value={user.username}
									/>
								</div>
							</div>

							<div className="col-md-6 col-12">
								<div className="input-group border w-100 mt-2 bg-gray-light-2">
									<span className="input-group-text" id="basic-addon1">
										<i className="fa fa-at" />
									</span>
									<input
										type="email"
										placeholder="Email"
										required
										disabled
										value={user.email}
									/>
								</div>
							</div>

							<div className="col-12">
								<div className="input-group border w-100 mt-3 bg-gray-light-2">
									<span className="input-group-text" id="basic-addon1">
										<i className="fa fa-th" />
									</span>
									<input
										type="text"
										placeholder="Title"
										required
										disabled
										value={"Software developer"}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="col-12">
						<div className="p-2 bg-white">
							<ul class="nav nav-tabs" id="userTab" role="tablist">
								<li class="nav-item" role="presentation">
									<a
										class="nav-link text-secondary text-raleway active"
										data-bs-toggle="tab"
										data-bs-target="#info"
										href="#info">
										Personnal information
									</a>
								</li>
								<li class="nav-item">
									<a
										class="nav-link text-secondary text-raleway"
										data-bs-toggle="tab"
										data-bs-target="#u_history"
										href="#u_history">
										Payments history
									</a>
								</li>
								<li class="nav-item">
									<a
										class="nav-link text-secondary text-raleway"
										data-bs-toggle="tab"
										data-bs-target="#u_plans"
										href="#u_plans">
										Plans
									</a>
								</li>
								<li class="nav-item">
									<a
										class="nav-link text-secondary text-raleway"
										data-bs-toggle="tab"
										data-bs-target="#u_pref"
										href="#u_pref">
										Preferences
									</a>
								</li>
							</ul>

							<div className="tab-content p-2" id="userTabContent">
								<div className="tab-pane show active" id="info" role="tabpanel">
									<div className="row">
										<div className="col-md-6 col-12">
											<div className="input-group border  w-100 mt-2 bg-gray-light-2">
												<span className="input-group-text" id="basic-addon1">
													<i className="fa fa-phone" />
												</span>
												<input
													type="number"
													placeholder="Phone number"
													required
													disabled
													value={user.phone}
												/>
											</div>
										</div>

										<div className="col-md-6 col-12">
											<div className="input-group border w-100 mt-2 bg-gray-light-2">
												<span className="input-group-text" id="basic-addon1">
													<i className="fa fa-at" />
												</span>
												<input
													type="url"
													placeholder="Webiste url"
													required
													disabled
													value={user.website}
												/>
											</div>
										</div>

										<div className="col-md-6 col-12">
											<div className="input-group border w-100 mt-3 bg-gray-light-2">
												<span className="input-group-text" id="basic-addon1">
													<i className="fa fa-th" />
												</span>
												<input
													type="text"
													placeholder="Title"
													required
													disabled
													value={"Software developer"}
												/>
											</div>
										</div>
									</div>
								</div>

								<div className="tab-pane" id="u_plans" role="tabpanel">
									<h5>My Plans</h5>
									<table className="table border">
										<thead>
											<tr>
												<th>
													<input type="checkbox" name="" id="" />
												</th>
												<th>#code</th>
												<th>Name</th>
												<th>Price</th>
												<th>Start On</th>
												<th>Expire On</th>
												<th>Status</th>
												<th className="text-right">Auto renew</th>
											</tr>
										</thead>

										<tbody className="table-body-striped">
											<tr>
												<td>
													<input type="checkbox" name="" id="" />
												</td>
												<td>OH564</td>
												<td>Hosting standard</td>
												<td>$ 50</td>
												<td>20.12.2022</td>
												<td>20.12.2023</td>
												<td>
													<span className="badge bg-success rounded-pill">
														Active
													</span>
												</td>
												<td>True</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
