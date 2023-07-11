import React from "react";
import { Route, Routes } from "react-router-dom";
import View from "./View";
import Contacts from "./Contacts";

export default function Index() {
	return (
		<Routes>
			<Route path="/" element={<Contacts />} />
			<Route path="/view" element={<View />} />
		</Routes>
	);
}
