import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import EditChores from "./pages/EditChores";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route
						path="edit"
						element={
							<Suspense fallback={<>...</>}>
								<EditChores />
							</Suspense>
						}
					/>
					<Route
						path="dashboard/*"
						element={
							<Suspense fallback={<>...</>}>
								<Dashboard />
							</Suspense>
						}
					/>
					<Route path="*" element={<ErrorPage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
