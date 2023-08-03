import React, { useContext, useEffect } from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import { destUrl } from "../contexts/AuthContext";

export default function LogOut() {
	const { token } = useContext(GlobalContext);
	if (token) {
		window.localStorage.removeItem("zeslap-user");
		return (window.location.href = destUrl);
	}
	return (window.location.href = destUrl);
}
