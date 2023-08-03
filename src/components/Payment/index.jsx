import React from "react";
import { Route, Routes } from "react-router-dom";

import Plans from "./Payments";

export default function Index() {
	return (
		<Routes>
			<Route path="/" element={<Plans />} />
			{/* <Route path="/view" element={<View />} /> */}
		</Routes>
	);
}
