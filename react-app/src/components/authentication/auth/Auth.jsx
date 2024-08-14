import Container from "@mui/material/Container";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./Auth.css";

const BG_URL = "url(/citiView.jpg)";

function Auth() {
	const { currentUser } = useAuth();
	return (
		<>
			{currentUser ? (
				<Navigate to="/homepage"></Navigate>
			) : (
				<Container
					maxWidth="none"
					sx={{
						height: "100%",
						width: "100%",
						background: BG_URL,
						backgroundPosition: "center",
						backgroundSize: "cover",
					}}
				>
					<Outlet></Outlet>
				</Container>
			)}
		</>
	);
}

export default Auth;
