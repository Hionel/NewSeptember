import { useNavigate, useNavigation } from "react-router-dom";
import { useForm } from "../../../customHooks/useForm";
import { getLoginMap, loginNavMap } from "../../../maps/authMaps";
import { signIn } from "../../../services/firebase/auth/authentication-service";
import AuthNavigation from "../AuthNavigation";
import "./Login.css";
import LoginIcon from "@mui/icons-material/Login";
import { Button, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";

function Login() {
	const { form, handleChange } = useForm({
		email: "",
		password: "",
	});
	const navigation = useNavigation();
	const navigate = useNavigate();
	const buttonText =
		navigation.state === "submitting"
			? "Submitting..."
			: navigation.state === "loading"
			? "Success!"
			: "Login";

	const loginMap = getLoginMap(form, handleChange);
	const componentNavigation = loginNavMap;

	const loginInputs = () =>
		loginMap.map(({ id, type, label, value, placeholder, onChange }) => {
			return (
				<div key={`${id}-container`}>
					<InputLabel key={label}>{label}</InputLabel>
					<TextField
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
		await signIn(form);
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
				<Typography
					variant="body"
					component="div"
					color={"white"}
					fontFamily={"'Poppins', sans-serif"}
					align="left"
					width="45%"
					backgroundColor="green"
				>
					Welcome User
				</Typography>

				<Card
					sx={{
						width: "45%",
						height: "30%",
						padding: "2rem 1.5rem",
						borderRadius: "20px",
						background: "rgba(255, 255, 255, 0.1)",
						backdropFilter: "blur(15px)",
						border: "2px solid rgba(255, 255, 255, 0.1)",
						boxShadow: "0 0 80px rgba(0, 0, 0, 0.25)",
						display: "grid",
						gridTemplateRows: "auto auto",
						gridTemplateColumns: "1fr 1fr 1fr",
					}}
				>
					<form onSubmit={handleSubmit}>
						{loginInputs()}
						<CardActions>
							<Button
								startIcon={<LoginIcon />}
								fullWidth={true}
								disableFocusRipple={true}
								variant="outlined"
								type="submit"
								color="success"
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
