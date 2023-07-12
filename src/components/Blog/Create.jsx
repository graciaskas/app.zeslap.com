import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";

import AppBarCreate from "../AppBarCreate";
import Keyboard from "../Keyboard";
import { GlobalContext } from "../../contexts/GlobalContext";
import Toast from "../Toast";

export default function Create() {
	const Navigate = useNavigate();
	const { setLoading, setNotify } = useContext(GlobalContext);
	const [selecting, setSelecting] = useState(false);
	const [categories, setCategories] = useState([]);

	//Refs
	const writingAreaRef = useRef(null);
	const fileCoverRef = useRef(null);
	const imgRef = useRef(null);

	const categoryRef = useRef(null);
	//state
	const [state, setState] = useState({
		title: null,
		category_id: null,
		content: null,
		cover: null,
	});

	const { BASE_URI, headers, error, setError } = useContext(GlobalContext);

	const submitBlog = async (event) => {
		setLoading(true);
		event.preventDefault();
		const form = event.target;

		setState({
			...state,
			content: writingAreaRef.current.innerHTML,
		});

		if (
			state.title === null ||
			state.category_id === null ||
			state.content === null
		) {
			setNotify(true);
			setError({
				title: "Form validation error",
				content: "Please some required field are empty",
				type: "danger",
			});
			setLoading(false);
			return;
		}

		try {
			const formData = new FormData();
			for (let key in state) {
				formData.append(key, state[key]);
			}

			const response = await fetch(BASE_URI + "/posts", {
				method: "POST",
				headers,
				body: formData,
			});
			setLoading(false);
			const json = await response.json();

			setError({ ...error, content: json.message });

			if (response.status === 200) {
				return Navigate("/blog/blogs");
			}
		} catch (e) {
			setNotify(true);
			setError({ ...error, content: e.message });
			throw Error(e);
		}
	};

	async function selectCategory(e) {
		e.preventDefault();
		try {
			setSelecting(true);
			let string = e.target.value;
			let request = await fetch(`${BASE_URI}/categories/?q=${string}`, {
				headers,
			});
			let json = await request.json();
			if (string === "" || string == null) {
				setSelecting(false);
			}
			if (request.status > 399) {
				return;
			}
			setCategories(json.data);
		} catch (error) {
			setError(error.message);
		}
	}

	function bindCategory(category, element) {
		categoryRef.current.value = category.name;
		setState({ ...state, category_id: [category.id, category.name] });
		setSelecting(false);
	}

	function clickFileCover() {
		fileCoverRef.current.focus();
		fileCoverRef.current.click();
		return;
	}

	async function updateBlogCover(e) {
		e.preventDefault();
		const file = e.target.files[0];
		const base64 = await getBase64(file);
		setState({ ...state, cover: file });
		//Display imaga
		imgRef.current.src = base64;
	}

	function getBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	return (
		<div className="container-lg">
			<div className="row">
				<div className="col-12">
					<form className="text__form" onSubmit={submitBlog}>
						<div className="row">
							<AppBarCreate appName="Blogs" />

							<div className="col-12">
								<div className="p-3 bg-white mt-3 shadow-default rounded">
									<div className="row">
										<div className="col-md-2" onClick={clickFileCover}>
											<div
												className="border mt-2 rounded"
												style={{ cursor: "pointer" }}>
												<img src="/img/user_icon.png" alt="" ref={imgRef} />
												<input
													type="file"
													hidden
													ref={fileCoverRef}
													onChange={updateBlogCover}
													name="cover"
													accept="image/*"
												/>
											</div>
										</div>

										<div className="col-md-10">
											<div className="row">
												<div className="col-md-6 col-12">
													<div className="input-group border  w-100 mt-2 ">
														<span
															className="input-group-text"
															id="basic-addon1">
															<i className="fa fa-book" />
														</span>
														<input
															type="text"
															placeholder="Blog title"
															required
															name="title"
															onChange={(e) =>
																setState({
																	...state,
																	title: e.target.value,
																})
															}
														/>
													</div>
												</div>

												<div className="col-md-6 col-12 position-relative">
													<div className="input-group border  w-100 mt-2">
														<span
															className="input-group-text"
															id="basic-addon1">
															<i className="fa fa-th" />
														</span>
														<input
															type="text"
															placeholder="Blog category"
															onChange={(e) => selectCategory(e)}
															required
															name="category"
															ref={categoryRef}
														/>
													</div>
													{selecting && (
														<div
															className="input-select position-absolute bg-white shadow-default p-3 rounded"
															style={{
																zIndex: 1,
																overflow: "hidden",
																width: "100%",
															}}>
															{categories.map((category, id) => (
																<li
																	key={id}
																	id={category.id}
																	onClick={(e) => bindCategory(category, e)}>
																	{category.name}
																</li>
															))}
														</div>
													)}
												</div>
												<div className="col-md-12">
													<div className="border mt-2"></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<Keyboard refElement={writingAreaRef} />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
