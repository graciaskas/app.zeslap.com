import React from "react";
import { Route, Routes } from "react-router-dom";
import Create from "./Create";
import Categories from "./Categories";

export default function Index() {
	return (
		<Routes>
			<Route path="/" element={<Categories />} />
			<Route path="/create" element={<Create />} />
		</Routes>
	);
}
