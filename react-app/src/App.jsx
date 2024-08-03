// import { useState } from 'react'
import "./App.css";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
	return (
		<Container
			disableGutters
			maxWidth="none"
			sx={{ height: "100vh", margin: "0", width: "100vw" }}
		>
			<Outlet />
		</Container>
	);
}

export default App;
