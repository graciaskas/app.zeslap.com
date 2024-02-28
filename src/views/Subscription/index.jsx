import React from "react";
import { Route, Routes } from "react-router-dom";
import View from "./View";
import Subscriptions from "./Subscriptions";

export default function Index() {
	return (
		<Routes>
			<Route path="/" element={<Subscriptions />} />
			<Route path="/view" element={<View />} />
		</Routes>
	);
}
