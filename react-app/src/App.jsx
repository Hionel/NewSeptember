// import { useState } from 'react'
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
	return (
		<>
			<main className="page">
				<Outlet />
			</main>
		</>
	);
}

export default App;
