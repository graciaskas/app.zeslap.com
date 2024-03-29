import React from "react";
import { Route, Routes } from "react-router-dom";
import View from "./View";
import NewsLetters from "./NewsLetters";

export default function Index() {
	return (
		<Routes>
			<Route path="/" element={<NewsLetters />} />
			<Route path="/view" element={<View />} />
		</Routes>
	);
}
