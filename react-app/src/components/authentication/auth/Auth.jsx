// import { useState } from "react";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import "./Auth.css";

function Auth() {
	const backgroundUrl = "url(./../public/citiView.jpg)";
	return (
		<>
			<Container
				maxWidth="none"
				sx={{
					height: "100%",
					width: "100%",
					background: backgroundUrl,
					backgroundPosition: "center",
					backgroundSize: "cover",
				}}
			>
				<Outlet></Outlet>
			</Container>
		</>
	);
}

export default Auth;
