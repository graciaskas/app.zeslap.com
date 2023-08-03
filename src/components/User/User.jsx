import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function User({ user }) {
	const userCardRef = useRef(null);

	//if not user return nothing
	if (!user) return null;

	return (
		<Link
			to={"./view?q=" + user._id}
			key={user.id}
			className="col-lg-4 col-md-6 col-12 text-secondary mb-2">
			<div
				className={`bg-white  p-3 d-flex user-card rounded ${user.account_type} justify-content-between`}
				ref={userCardRef}>
				<div>
					<h6>{user.username}</h6>
					<small>45, Uvira</small>
					<small>{user.email}</small>
					<small>
						{" "}
						<i className="fa fa-mobile" /> {user.phone}
					</small>
				</div>
				<div>
					<img
						src="/img/user_icon.png"
						alt="fd"
						className="img-fluid rounded"
					/>
				</div>
			</div>
		</Link>
	);
}
