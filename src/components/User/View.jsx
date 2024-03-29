import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

import { GlobalContext } from "../../contexts/GlobalContext";
import AppBar from "../AppBar";
import Error from "../Error";
import Toast from "../Toast";
import ChangePwd from "../Modals/ChangePwd";

export default function View() {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const { BASE_URI, setLoading, headers, params, setLog, setToast, toast } =
		useContext(GlobalContext);

	async function fetchUser() {
		if (!params.has("q")) return;
		setLoading(true);
		try {
			const id = params.get("q");
			const request = await fetch(BASE_URI + "/users/" + id, {
				headers,
			});
			const response = await request.json();
			setLoading(false);

			if (response.error) {
				setLog(true);
				setToast({ ...toast, content: response.error });
				return;
			}
			setUser(response.data);
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	useEffect(function () {
		fetchUser();
	}, []);

	return (
		user && (
			<div className="container">
				<AppBar
					appName="Users"
					title={user.username}
					create={false}
					showPagination={false}
					data={[]}
				/>

				<ChangePwd user={user} />
				<form className="mt-3 p-3 bg-white rounded shadow-default user-form">
					<div className="row">
						<div className="col-12">
							{/* <div className="d-flex user-stats">
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
							</div> */}

							<div className="d-flex user-stats">
								<button
									className="stat-button"
									type="button"
									data-bs-toggle="modal"
									data-bs-target="#changePwdModal">
									<i class="fa fa-cogs stat-icon"></i>
									Change password
								</button>
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
								</ul>

								<div className="tab-content p-2" id="userTabContent">
									<div
										className="tab-pane show active"
										id="info"
										role="tabpanel">
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
													<select type="text" placeholder="Title">
														<option>User role</option>
														<option value={"user"}>User</option>
														<option value={"admin"}>Admin</option>
														<option value={"author"}>Author</option>
													</select>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		)
	);
}
