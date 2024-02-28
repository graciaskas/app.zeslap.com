import React from "react";
import { Route, Routes } from "react-router-dom";
import View from "./View";
import Users from "./Users";

export default function Index() {
	return (
		<Routes>
			<Route path="/" element={<Users />} />
			<Route path="/view" element={<View />} />
		</Routes>
	);
}
