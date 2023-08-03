import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function AppBar({
	appName,
	data,
	create,
	viewTypes = ["list"],
	showPagination = true,
	title = null,
}) {
	//split location pathname
	const pathname = window.location.pathname.split("/")[1];

	//Links
	const linkToCreate = `/${pathname}/create`;
	const linkToApp = `/${pathname}`;

	//componet default view types;
	const default_view_types = ["list", "grid", "expand"];

	return (
		<div className="col-12 mb-3">
			<div className="d-flex flex-wrap align-items-center justify-content-between bg-white rounded shadow-default p-3 ">
				<h5
					className="text-secondary h5 text-raleway"
					style={{ marginBottom: "2px" }}>
					<Link to={"/"}>
						<i className="fa fa-home" />
					</Link>{" "}
					/<Link to={linkToApp}>{appName}</Link> /
					{create && <Link to={linkToCreate}>Create</Link>}
					{title}
				</h5>

				{
					//Check if must show pagination
					showPagination && (
						<div className="pagination" role={"link"}>
							<li className="page-item dropdown">
								<Link
									to="#"
									className="page-link dropdown-toggle"
									id="dropdownFilters"
									data-bs-toggle="dropdown">
									<i className="fa fa-filter"></i> Filter
								</Link>
								<ul
									className="dropdown-menu p-4 shadow-default border-0 rounded w-auto"
									aria-labelledby="dropdownFilters">
									<li>
										<Link href="#" className="dropdown-itemx">
											All
										</Link>
									</li>
									<li>
										<Link href="#" className="dropdown-itemx">
											Archived
										</Link>
									</li>
									<li>
										<Link href="#" className="dropdown-itemx">
											Not activated
										</Link>
									</li>
									<li>
										<Link className="dropdown-itemx">
											<i className="fa fa-plus-circle" /> Custom filter
										</Link>
									</li>
								</ul>
							</li>
							<li className="page-item">
								<Link to="?view=grid" className="page-link">
									<i className="fa fa-bars"></i> Group by
								</Link>
							</li>
						</div>
					)
				}

				{
					//Check if must show pagination
					showPagination && (
						<div className="pagination" role={"list"}>
							<li className="page-item">
								<Link href="#" className="page-link input">
									<input type="number" defaultValue={data.length} />
								</Link>
							</li>
							<li className="page-item">
								<Link href="#" className="page-link">
									02
								</Link>
							</li>
							<li className="page-item">
								<Link href="#" className="page-link">
									<i className="fa fa-chevron-circle-left" />
								</Link>
							</li>
							<li className="page-item">
								<Link href="#" className="page-link">
									<i className="fa fa-chevron-circle-right" />
								</Link>
							</li>

							{
								/* Component data view types */
								viewTypes.map((viewType, id) => {
									//if no compatible viewType return
									//if (!default_view_types.includes(viewType)) return
									return (
										<li className="page-item" key={id}>
											<Link to={`?view=${viewType}`} className="page-link">
												<i className={`fa fa-${viewType}`}></i>
											</Link>
										</li>
									);
								})
							}
						</div>
					)
				}
			</div>
		</div>
	);
}

AppBar.propTypes = {
	data: PropTypes.array,
	appName: PropTypes.string,
	create: PropTypes.bool,
	viewTypes: PropTypes.array,
};

export default AppBar;
