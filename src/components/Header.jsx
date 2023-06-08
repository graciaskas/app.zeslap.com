import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";

export default function Header() {
	const { user } = useContext(GlobalContext);

	return (
		<header className="main-header bg-white shadow-default p-2 d-flex  align-items-center">
			<div className="container-lg">
				<div className="d-flex justify-content-between align-items-center">
					<form action="" className="w-50 rounded-pill bg-gray">
						<input
							type="text"
							placeholder="Search"
							className="w-100 bg-gray rounded-pill"
						/>
					</form>
					<nav className="header__icons d-flex align-items-center justify-content-center">
						<li className="header__icon  position-relative  px-2 bg-gray rounded-pill">
							<i className="fa fa-comments"></i>
							<span className="position-absolute bottom-0 start-100 translate-middle badge rounded-pill bg-warning">
								05
							</span>
						</li>
						<li className="header__icon  position-relative mx-5 px-2 bg-gray rounded-pill">
							<i className="fa fa-bell"></i>
							<span className="position-absolute bottom-0 start-100 translate-middle badge rounded-pill bg-orange">
								05
							</span>
						</li>
						<li className="dropdown">
							<Link
								className="btn text-white bg-primary dropdown-toggle"
								to={"#"}
								role="button"
								id="dropdownProducts"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								<i className="fa fa-user-circle"></i> {user?.username}
							</Link>

							<ul
								className="dropdown-menu  p-4 shadow-default border-0 rounded"
								aria-labelledby="dropdownProducts">
								<li>
									<Link to="/profile" className="dropdown-itemx">
										My profile
									</Link>
								</li>
								<li>
									<Link to="/preferences" className="dropdown-itemx">
										My Preferences
									</Link>
								</li>
								<hr />
								<li>
									<Link to="/logout" className="dropdown-itemx">
										<i className="fa fa-times-circle" /> Log Out
									</Link>
								</li>
							</ul>
						</li>
					</nav>
				</div>
			</div>
		</header>
	);
}
