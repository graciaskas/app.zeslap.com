import React, { useEffect, useState, useContext } from "react";

import { GlobalContext } from "../../contexts/GlobalContext";
import AppBar from "../AppBar";
import Error from "../Error";
import Toast from "../Toast";
import Keyboard from "../Keyboard";
import { useRef } from "react";

function Blog(props) {
	const [post, setPost] = useState(null);
	const { BASE_URI, setLoading, headers, params } = useContext(GlobalContext);
	const [error, setError] = useState({});

	const postContentRef = useRef(null);

	async function fetchPost() {
		if (!params.has("q") || isNaN(params.get("q"))) {
			setError({
				content:
					"Invalid url request or search parameter value ! " + params.get("q"),
				code: 400,
			});
			return;
		}

		setLoading(true);

		try {
			const id = params.get("q");
			const response = await fetch(BASE_URI + "/posts/" + id, {
				headers: { ...headers },
			});
			const { data } = await response.json();
			setLoading(false);

			if (response.status === 200) return setPost(data[0]);

			setError({ code: response.status, content: data.message });
		} catch (e) {
			console.error(e.message);
			setLoading(false);
			setError({ code: 500, content: e.message });
		}
	}

	useEffect(() => {
		fetchPost();
	}, []);

	useEffect(() => {
		if (postContentRef.current && post) {
			postContentRef.current.innerHTML = post.content;
		}
	}, [post, postContentRef]);

	//Check if there is an error
	if (error.code) {
		return (
			<Error code={error.code} content={error.content}>
				<Toast
					type="danger"
					title="Something went wrong !"
					content={error.content}
				/>
			</Error>
		);
	}

	//retun null
	if (!post) return null;

	return (
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
						<div>
							<span>
								<i className="fa fa-calendar"></i> 12 jul 2022
							</span>
							<span style={{ marginLeft: "15px" }}>
								<i className="fa fa-clipboard-list"></i> Business expertise |
								Tupac Shakur
							</span>
						</div>
						<div className="mt-4 overflow-auto" ref={postContentRef} />
					</div>

					<div className="d-flex align-items-center pt-2 pb-3">
						<div className="d-flex align-items-center">
							<span className="fa fa-heart"></span>
							<small className="text-montserrat" style={{ marginLeft: "5px" }}>
								0 Like(s){" "}
							</small>
						</div>
						<div style={{ marginLeft: "15px" }}>
							<i className="fa fa-comments" />
							<small className="text-montserrat" style={{ marginLeft: "5px" }}>
								0 Comment(s){" "}
							</small>
						</div>
					</div>

					{post.read ? null : (
						<>
							<div className="d-flex align-items-center justify-content-between border-top pt-3">
								<div
									role={"button"}
									className=" btn-sm bg-primary text-white rounded-pill">
									Update content
								</div>
							</div>
						</>
					)}
				</div>
			</form>

			<div className="col-12 bg-white mt-3 rounded shadow-default p-3">
				<div className="border-bottom pb-3">
					<h4>5 Comments</h4>
				</div>
				<div className="comments">
					<div class="comment d-flex align-items-start mt-3">
						<div class="commenter bg-primary icon_round">
							<span class="text-white">GK</span>
						</div>
						<div class="text " style={{ marginLeft: "7px" }}>
							<h5>Gracias Kasongo</h5>
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab
								optio amet doloremque saepe dolorum similique ullam, quas
								excepturi molestias itaque fugiat labore? Aspernatur consequatur
								facilis sunt placeat quisquam sit quod?
							</p>
							<div className="d-flex justify-content-end">
								<small class="date bg-primary-light-7 rounded-pill px-2">
									2 Days ago.
								</small>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

Blog.propTypes = {};

export default Blog;
