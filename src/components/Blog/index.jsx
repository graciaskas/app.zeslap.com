import React from "react";
import { Route, Routes } from "react-router-dom";
import Blogs from "./Blogs";
import Create from "./Create";
import Dashboard from "./Dashboard";
import View from "./Blog";

export default function Index() {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/create" element={<Create />} />
			<Route path="/blogs" element={<Blogs />} />
			<Route path="/view" element={<View />} />
		</Routes>
	);
}
