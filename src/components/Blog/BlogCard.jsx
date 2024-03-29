import React, { useRef, useContext } from "react";

import { Link } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function BlogCard(props) {
	const postContentRef = useRef(null);
	const { SITE_URL } = useContext(GlobalContext);

	let author = "Gracias Kasongo";
	let post;

	if (props.data != null) {
		post = props.data;
	} else {
		return;
	}

	return (
		<Link
			to={"/blog/view?blog=" + post._id}
			className="shadow-default rounded p-2   bg-white mb-3 d-block text-secondary">
			<div className="d-flex border-bottom pb-2 position-relative">
				<img
					src="/img/_q.jpg"
					alt=""
					style={{ width: "2.5rem", height: "2.5rem" }}
					className="rounded-circle bs-primary-2"
				/>
				<div style={{ marginLeft: "10px", marginTop: "-4px" }}>
					<strong>{author}</strong>
					<small
						className="d-block text-montserrat"
						style={{ fontSize: ".8rem", marginTop: "-2px" }}>
						<i className="fa fa-calendar-alt" />{" "}
						{new Date(post.create_date).toLocaleString()}
					</small>
				</div>
				<small className="bg-primary text-white px-2 rounded-pill position-absolute top-0 end-0">
					Posted
				</small>
			</div>

			<div className="py-3">
				<div style={{ height: 150, overflow: "hidden" }}>
					<img src={`${SITE_URL}/src/${post.cover}`} alt="dds" />
				</div>
				<h5 className="my-2">
					{post.title && post.title.substring(0, 110) + "..."}
				</h5>

				<div className="mt-2">
					<i className="fa fa-clipboard-list" style={{ marginRight: "7px" }} />
					{post.category_id[1]}
				</div>
			</div>

			<div className="d-flex align-items-center  border-top pt-2">
				<div className="d-flex align-items-center">
					<span className="fa fa-heart text-white bg-primary rounded-pill px-1"></span>
					<small className="text-montserrat" style={{ marginLeft: "5px" }}>
						{post.likes} Like(s)
					</small>
				</div>
				<div style={{ marginLeft: "15px" }}>
					<i className="fa fa-comments" />
					<small className="text-montserrat" style={{ marginLeft: "5px" }}>
						{post.comments} Comment(s)
					</small>
				</div>
			</div>
		</Link>
	);
}
