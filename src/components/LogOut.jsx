import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { userLocal, destUrl } from "../utils/utils";

export default function LogOut() {
	const client = userLocal();
	if (client) {
		window.localStorage.removeItem("zeslap-user");
		window.location.href = destUrl;
		return null;
	}
	return null;
}
