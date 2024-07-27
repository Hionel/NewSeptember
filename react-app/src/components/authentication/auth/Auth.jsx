// import { useState } from "react";
import Container from "@mui/material/Container";
import { Outlet, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect } from "react";

function Auth() {
	const navigate = useNavigate();
	const { currentUser } = useAuth();
	const backgroundUrl = "url(/citiView.jpg)";

	useEffect(() => {
		if (currentUser) {
			navigate("homepage");
		}
	}, []);

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
