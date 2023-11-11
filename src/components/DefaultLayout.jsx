import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../contexts/AppContextProvider";
import AsideNav from "./AsideNav";

function DefaultLayout() {
	const { token } = useContext(AppContext);

	if (!token) {
		return <Navigate to={"/signin"} />;
	}
}