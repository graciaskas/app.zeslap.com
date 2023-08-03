import React, { useContext, useState } from "react";

import AppBarCreate from "../AppBarCreate";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
	const { headers, BASE_URI, setToast, setLog, toast } =
		useContext(GlobalContext);
	const [selecting, setSelecting] = useState(false);
	const [categories, setCategories] = useState([]);
	const navigate = useNavigate();

	const [state, setState] = useState({
		name: null,
		parent_id: null,
	});

	const categoryRef = useRef(null);

	async function submitCategory(e) {
		e.preventDefault();

		try {
			const request = await fetch(`${BASE_URI}/categories`, {
				method: "POST",
				headers: {
					...headers,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(state),
			});

			const response = await request.json();

			if (request.status > 399) {
				setLog(true);
				setToast({ ...toast, content: response.message });
				return;
			}

			navigate("/categories");
		} catch (error) {
			throw Error(error);
		}
	}

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
				setLog(true);
				setToast({ ...toast, content: json.message });
			}
			let { data } = json;

			if (data.length === 0) data.push({ id: 0, name: "Master" });
			setCategories(data);
		} catch (toast) {
			setToast(toast.message);
		}
	}

	function bindCategory(category, element) {
		categoryRef.current.value = category.name;
		setState({ ...state, parent_id: [category.id, category.name] });
		setSelecting(false);
	}
	return (
		<div className="container-lg">
			<div className="row">
				<div className="col-12">
					<form className="text__form" onSubmit={submitCategory}>
						<div className="row">
							<AppBarCreate appName="Categories" />
							<div className="col-12">
								<div className="p-3 bg-white mt-3 shadow-default rounded">
									<div className="row">
										<div className="col-md-6 col-12 position-relative">
											<div className="input-group border  w-100 mt-2">
												<span className="input-group-text" id="basic-addon1">
													<i className="fa fa-th" />
												</span>
												<input
													type="text"
													placeholder="Parent category"
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
														zIndex: 10,
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
										<div className="col-md-6 col-12">
											<div className="input-group border  w-100 mt-2 ">
												<span className="input-group-text" id="basic-addon1">
													<i className="fa fa-book" />
												</span>
												<input
													type="text"
													placeholder="Category name"
													required
													name="title"
													onChange={(e) =>
														setState({
															...state,
															name: e.target.value,
														})
													}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
