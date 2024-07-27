// import { useState } from 'react'
import "./App.css";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
	return (
		<>
			<Container disableGutters maxWidth="xl" sx={{ height: "100vh" }}>
				<Outlet />
			</Container>
		</>
	);
}

export default App;
