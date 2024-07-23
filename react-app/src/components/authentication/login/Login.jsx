import { useState } from "react";
import { useForm } from "../../../customHooks/useForm";
import { useNavigate } from "react-router-dom";

import { getLoginMap, loginNavMap } from "../../../maps/authMaps";

import { signIn } from "../../../services/firebase/auth/authentication-service";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import LoginIcon from "@mui/icons-material/Login";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import { Button, TextField } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import AuthNavigation from "../AuthNavigation";

import { FirebaseError } from "firebase/app";
import "./Login.css";

function Login() {
	const pageTitle = "HouseHold";
	const { form, handleChange } = useForm({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	// const navigation = useNavigation();
	const buttonText = loading ? "Submitting..." : "Login";
	const navigate = useNavigate();

	const loginMap = getLoginMap(form, handleChange);
	const componentNavigation = loginNavMap;

	const loginInputs = () =>
		loginMap.map(({ id, type, label, value, placeholder, onChange }) => {
			return (
				<div
					key={`${id}-container`}
					className={`${id}_input_container input_container`}
				>
					<InputLabel key={label} htmlFor={id}>
						{label}
					</InputLabel>
					<TextField
						fullWidth={true}
						variant="standard"
						key={id}
						id={id}
						name={id}
						type={type}
						value={value}
						onChange={onChange}
						placeholder={placeholder}
					/>
				</div>
			);
		});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const response = await signIn(form);
		console.log(response);
		setLoading(false);
		if (response instanceof FirebaseError) return;

		navigate("/homepage");
		// console.log("Submitted form");
	};

	return (
		<>
			<Container
				sx={{
					width: "100%",
					height: "100%",
					gap: "0.25rem",
					flexDirection: "column",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Card
					sx={{
						width: "45%",
						height: "30%",
						padding: "1.5rem 1rem",
						borderRadius: "20px",
						background: "rgba(255, 255, 255, 0.1)",
						backdropFilter: "blur(15px)",
						border: "2px solid rgba(255, 255, 255, 0.1)",
						boxShadow: "0 0 80px rgba(0, 0, 0, 0.25)",
					}}
				>
					<Typography
						variant="h1"
						component="h1"
						color={"white"}
						fontFamily={"'Poppins', sans-serif"}
						align="left"
						fontSize={"1.5rem"}
						width="43%"
						letterSpacing={"5px"}
						sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
					>
						<ApartmentIcon></ApartmentIcon>
						{pageTitle}
					</Typography>
					<form onSubmit={handleSubmit} className="form_container">
						{loginInputs()}
						<CardActions
							sx={{
								gridColumn: "2/-1",
							}}
						>
							<Button
								startIcon={
									!loading ? <LoginIcon /> : <CircularProgress size={16} />
								}
								disableFocusRipple={true}
								fullWidth
								variant="outlined"
								type="submit"
								size="small"
								className="auth_button"
							>
								{buttonText}
							</Button>
							<AuthNavigation links={componentNavigation} />
						</CardActions>
					</form>
				</Card>
			</Container>
		</>
	);
}

export default Login;
