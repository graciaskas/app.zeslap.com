import React, { useContext } from "react";
import { AuthContext, destUrl } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useEffect } from "react";

export default function ChangePwd() {
	const { user } = useContext(AuthContext);
	const { BASE_URI, toast, setToast, setLog, headers } =
		useContext(GlobalContext);

	const updatePassword = async (e) => {
		e.preventDefault();

		try {
			const request = await fetch(BASE_URI + "/users/" + user.id + "/pwd", {
				method: "put",
				headers: { ...headers, "Content-Type": "application/json" },
				body: JSON.stringify({
					current_pwd: e.target.elements[1].value,
					new_pwd: e.target.elements[2].value,
					confirm_pwd: e.target.elements[3].value,
				}),
			});
			const response = await request.json();
			if (!response.error) {
				window.localStorage.removeItem("zeslap-user");
				window.location.href = destUrl + "/?loggedout=true";
				return;
			}

			setLog(true);
			setToast({ ...toast, content: response.error.message });
		} catch (error) {
			setLog(true);
			setToast({ ...toast, content: error.message });
			throw Error(error.message);
		}
	};

	return (
		<form
			class="modal fade"
			tabindex="-1"
			id="changePwdModal"
			onSubmit={updatePassword}>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Change password</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div className="input">
							<label htmlFor="current_pwd">Current password</label>
							<div class="input-group border  w-100 mt-2 bg-gray-light-2">
								<span class="input-group-text" id="basic-addon1">
									<i class="fa fa-user"></i>
								</span>
								<input
									type="password"
									placeholder="Current password"
									required={true}
									id="current_pwd"
									name="current_pwd"
								/>
							</div>
						</div>

						<div className="input">
							<label htmlFor="new_pwd">New password</label>
							<div class="input-group border  w-100 mt-2 bg-gray-light-2">
								<span class="input-group-text" id="basic-addon1">
									<i class="fa fa-user"></i>
								</span>
								<input
									type="password"
									placeholder="New password"
									required={true}
									id="new_pwd"
									name="new_pwd"
								/>
							</div>
						</div>

						<div className="input">
							<label htmlFor="confirm_pwd">Confirm password</label>
							<div class="input-group border  w-100 mt-2 bg-gray-light-2">
								<span class="input-group-text" id="basic-addon1">
									<i class="fa fa-user"></i>
								</span>
								<input
									type="password"
									placeholder="Confirm password"
									required={true}
									id="confirm_pwd"
									name="confirm_pwd"
								/>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="submit" class="btn bg-primary">
							Change password
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}
