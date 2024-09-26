// import { useState } from 'react'
import "./App.css";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

function App() {
	const { currentUser, setCurrentUser } = useAuth();

	return (
		<Container
			disableGutters
			maxWidth="none"
			sx={{ height: "100vh", margin: "0", width: "100vw" }}
		>
			<Outlet context={{ currentUser, setCurrentUser }} />
		</Container>
	);
}

export default App;
