import { useForm } from "../../../customHooks/useForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Button, TextField } from "@mui/material";
import AuthNavigation from "../AuthNavigation";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CircularProgress from "@mui/material/CircularProgress";

import { createUserAuthentication } from "../../../services/firebase/auth/authentication-service";
import { getRegisterFormMap, registerNavMap } from "../../../maps/authMaps";

function Register() {
	const { form, handleChange, handleError, errors, isFormValid } = useForm({
		email: "",
		firstName: "",
		lastName: "",
		age: "",
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);
	const pageTitle =
		"Please create an account in order to access the application";
	const buttonText = "Sign Up";
	const navigate = useNavigate();
	const registerMap = getRegisterFormMap(
		form,
		handleChange,
		handleError,
		errors
	);
	const componentNavigation = registerNavMap;
	console.log(errors);
	const registerInputs = () =>
		registerMap.map(({ id, type, label, value, onChange, onBlur }) => {
			return (
				<TextField
					variant="standard"
					key={id}
					id={id}
					name={id}
					type={type}
					label={label}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					helperText={errors[id].message}
					error={errors[id] != "" ? !errors[id].success : false}
					sx={{
						height: "2rem",
					}}
				/>
			);
		});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const response = await createUserAuthentication(form);
		if (response instanceof Error) return;

		setLoading(false);
		navigate("/homepage");
	};

	return (
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
					padding: "1.5rem 1rem",
					borderRadius: "20px",
					background: "rgba(255, 255, 255, 0.1)",
					backdropFilter: "blur(15px)",
					border: "2px solid rgba(255, 255, 255, 0.1)",
					boxShadow: "0 0 80px rgba(0, 0, 0, 0.25)",
				}}
			>
				<Typography
					variant="caption"
					color={"white"}
					fontFamily={"'Poppins', sans-serif"}
					align="left"
					sx={{ display: "flex", alignItems: "center" }}
				>
					<ApartmentIcon></ApartmentIcon>
					{pageTitle}
				</Typography>
				<Divider></Divider>
				<form onSubmit={handleSubmit}>
					<Container
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							flexWrap: "wrap",
							gap: "3rem",
							margin: "1rem 0rem 2.5rem 0rem",
						}}
					>
						{registerInputs()}
					</Container>
					<CardActions>
						<Button
							startIcon={
								!loading ? <VpnKeyIcon /> : <CircularProgress size={16} />
							}
							disableFocusRipple={true}
							fullWidth
							variant="contained"
							type="submit"
							size="small"
							className="auth_button"
							disabled={!isFormValid || loading}
						>
							{buttonText}
						</Button>
						<AuthNavigation links={componentNavigation} />
					</CardActions>
				</form>
			</Card>
		</Container>
	);
}

export default Register;
