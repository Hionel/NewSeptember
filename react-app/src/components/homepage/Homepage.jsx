import Header from "./Header";
import { Outlet } from "react-router-dom";

function Homepage() {
	return (
		<div>
			<Header></Header>
			Hoe page
			<Outlet></Outlet>
		</div>
	);
}

export default Homepage;
