import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
	return (
		<>
			<Header />
			<main className="main-content">
				<Outlet />
			</main>
			<Footer />
		</>
	);
};
export default Layout;
