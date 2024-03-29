import React, { useEffect, useState, useContext } from "react";

import { GlobalContext } from "../../contexts/GlobalContext";
import AppBar from "../AppBar";
import Error from "../Error";
import Toast from "../Toast";
import Keyboard from "../Keyboard";
import { useRef } from "react";
import { Link } from "react-router-dom";

import "../../css/ckeditor.css";

function Blog(props) {
	const [post, setPost] = useState(null);
	const [postComments, setPostComments] = useState([]);
	const { SITE_URL, getPost, getPostComments, params, setLog, setToast } =
		useContext(GlobalContext);

	const postContentRef = useRef(null);

	useEffect(() => {
		if (post) getPostComments(setPostComments, post.id);
	}, [post]);

	useEffect(() => {
		if (!params.has("blog")) {
			setLog(true);
			setToast({
				content: "Request or query parameter value ! " + params.get("blog"),
				title: "Parameter error",
				type: "warning",
			});
			return;
		}

		getPost(setPost, params.get("blog"));
	}, []);

	return (
		post && (
			<div className="container-lg">
				<AppBar
					appName="Blogs"
					title={post.id}
					create={false}
					showPagination={false}
					data={[]}
				/>

				<form className="mt-3 p-3 bg-white rounded shadow-default contact-form">
					<div className="border rounded p-4">
						<div className="d-flex border-bottom position-relative pb-2">
							<div className="icon_round bg-secondary text-white">
								<i className="fa fa-user" />
							</div>
							<div style={{ marginLeft: "5px", marginTop: "-5px" }}>
								<strong>Gracias Kasongo</strong>
								<small className="d-block" style={{ fontSize: ".75rem" }}>
									Software developer.
								</small>
							</div>
							{post.read ? (
								<small className="position-absolute top-0 end-0 bg-secondary-light-7 rounded-pill px-2">
									Read
								</small>
							) : (
								<small className="position-absolute top-0 end-0 bg-primary-light-7 rounded-pill px-2">
									Not read
								</small>
							)}
						</div>

						<div className="py-3">
							<h5 className="mb-2 d-block"> {post.title} </h5>
							{/* Blog header */}
							<div>
								<span>
									<i className="fa fa-calendar"></i> 12 jul 2022
								</span>
								<span style={{ marginLeft: "15px" }}>
									<i className="fa fa-clipboard-list"></i>
									{post.category_id[1]}
								</span>
							</div>
							{/* Blog image cover */}
							<div
								style={{ height: "200px", overflow: "hidden" }}
								className="mt-2">
								<img
									src={`${SITE_URL}/src/${post.cover}`}
									alt="dds"
									style={{
										objectFit: "fill",
										maxWidth: "100%",
										height: "auto",
									}}
								/>
							</div>
							{/* Blog content */}

							<div
								className="mt-4 overflow-auto ck-content"
								ref={postContentRef}
								dangerouslySetInnerHTML={{ __html: post.content }}
							/>
						</div>

						<div className="d-flex align-items-center pt-2 pb-3">
							<div className="d-flex align-items-center">
								<span className="fa fa-heart"></span>
								<small
									className="text-montserrat"
									style={{ marginLeft: "5px" }}>
									{post.likes} Like(s)
								</small>
							</div>
							<div style={{ marginLeft: "15px" }}>
								<i className="fa fa-comments" />
								<small
									className="text-montserrat"
									style={{ marginLeft: "5px" }}>
									{post.comments} Comment(s)
								</small>
							</div>
						</div>

						<div className="d-flex align-items-center justify-content-between border-top pt-3">
							<Link
								to={`/blog/edit?blog=${post._id}`}
								role={"button"}
								className=" btn-sm bg-primary text-white rounded-pill">
								<i className="fa fa-edit" /> Update content
							</Link>
							<div className="btn-sm bg-danger text-white rounded-pill">
								<i className="fa fa-trash" /> Archive
							</div>
						</div>
					</div>
				</form>

				{/* Blog comments */}
				<div className="col-12 bg-white mt-3 rounded shadow-default p-3">
					<div className="border-bottom pb-3">
						<h4>{postComments.length} Comment(s)</h4>
					</div>
					<div className="comments">
						{postComments.map((postComment) => (
							<div class="comment d-flex align-items-start mt-3">
								<div class="commenter bg-secondary icon_round">
									<span class="text-white">GK</span>
								</div>
								<div class="w-100 " style={{ marginLeft: "7px" }}>
									<h5>{postComment.commentor}</h5>
									<div className="bg-primary-light-9 py-2 px-3 rounded-pill">
										{postComment.comment}
									</div>
									<div className="d-flex justify-content-end">
										<small class="">2 Days ago.</small>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	);
}

Blog.propTypes = {};

export default Blog;
