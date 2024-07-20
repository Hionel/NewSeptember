import { useForm } from "../../../customHooks/useForm";
import { createUserAuthentication } from "../../../services/firebase/auth/authentication-service";
import AuthNavigation from "../AuthNavigation";
import { getRegisterFormMap, registerNavMap } from "../../../maps/authMaps";
import { Button, TextField } from "@mui/material";

function Register() {
	const { form, handleChange, errors, isFormValid } = useForm({
		email: "",
		firstName: "",
		lastName: "",
		age: "",
		password: "",
		confirmPassword: "",
	});

	const registerMap = getRegisterFormMap(form, handleChange, errors);
	const componentNavigation = registerNavMap;

	const registerInputs = () =>
		registerMap.map(({ id, type, label, value, onChange }) => {
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
					className="form_input"
				/>
			);
		});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await createUserAuthentication(form);
		if (response instanceof Error) return;
	};

	return (
		<form onSubmit={handleSubmit} className="form__wrapper flex">
			<div className="form__inputs__container flex">{registerInputs()}</div>
			<div className="submit__button__container flex">
				<Button variant="contained" type="submit" disabled={!isFormValid}>
					Sign up
				</Button>
			</div>
			<AuthNavigation links={componentNavigation} />
		</form>
	);
}

export default Register;
