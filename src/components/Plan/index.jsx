import React from "react";
import { Route, Routes } from "react-router-dom";

import Payments from "./Plans";

export default function Index() {
	return (
		<Routes>
			<Route path="/" element={<Payments />} />
			{/* <Route path="/view" element={<View />} /> */}
		</Routes>
	);
}
