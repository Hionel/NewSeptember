// AUTH FORMS
export const getLoginMap = (formData, handleInputChange) => {
	const inputs = [
		{
			id: "password",
			type: "password",
			value: formData.password,
			onChange: handleInputChange,
			label: "Password",
			placeholder: "1234 1234 1234 1234",
			name: "password",
		},
		{
			id: "email",
			type: "text",
			value: formData.email,
			onChange: handleInputChange,
			label: "Email",
			placeholder: "mail@example.com",
			name: "email",
		},
	];

	return inputs;
};

export const getRegisterFormMap = (formData, handleInputChange, errors) => {
	const emailState = errors.email
		? errors.email
		: { success: true, message: "" };
	const passwordState = errors.password
		? errors.password
		: { success: true, message: "" };
	const confirmPasswordState = errors.confirmPassword
		? errors.confirmPassword
		: { success: true, message: "" };
	const firstNameState = errors.firstName
		? errors.firstName
		: { success: true, message: "" };
	const lastNameState = errors.lastName
		? errors.lastName
		: { success: true, message: "" };
	const ageState = errors.age ? errors.age : { success: true, message: "" };
	return [
		{
			id: "email",
			type: "email",
			label: "Email",
			value: formData.email,
			onChange: handleInputChange,
			error: emailState.success,
			hintText: emailState.message,
		},

		{
			id: "firstName",
			type: "text",
			label: "First Name",
			value: formData.firstName,
			onChange: handleInputChange,
			error: firstNameState.success,
			hintText: firstNameState.message,
		},
		{
			id: "lastName",
			type: "text",
			label: "Last Name",
			value: formData.lastName,
			onChange: handleInputChange,
			error: lastNameState.success,
			hintText: lastNameState.message,
		},
		{
			id: "age",
			type: "number",
			label: "Age",
			value: formData.age,
			onChange: handleInputChange,
			error: ageState.success,
			hintText: ageState.message,
		},
		{
			id: "password",
			type: "password",
			label: "Password",
			value: formData.password,
			onChange: handleInputChange,
			error: passwordState.success,
			hintText: passwordState.message,
		},
		{
			id: "confirmPassword",
			type: "password",
			label: "Confirm Password",
			value: formData.confirmPassword,
			onChange: handleInputChange,
			error: confirmPasswordState.success,
			hintText: confirmPasswordState.message,
		},
	];
};

export const getResetPasswordFormMap = (
	formData,
	handleInputChange,
	errors
) => {
	const emailState = errors.email
		? errors.email
		: { success: true, message: "" };
	const passwordState = errors.password
		? errors.password
		: { success: true, message: "" };
	const confirmPasswordState = errors.confirmPassword
		? errors.confirmPassword
		: { success: true, message: "" };
	return [
		{
			id: "email",
			type: "email",
			label: "Email",
			value: formData.email,
			onChange: handleInputChange,
			error: emailState.success,
			hintText: emailState.message,
		},
		{
			id: "password",
			type: "password",
			label: "Password",
			value: formData.password,
			onChange: handleInputChange,
			error: passwordState.success,
			hintText: passwordState.message,
		},
		{
			id: "confirmPassword",
			type: "password",
			label: "Confirm Password!",
			value: formData.confirmPassword,
			onChange: handleInputChange,
			error: confirmPasswordState.success,
			hintText: confirmPasswordState.message,
		},
	];
};

// AUTH-Navigation

// export const resetPasswordNavMap = [
// 	{
// 		text: "Remembered your pass?",
// 		path: "/authentication",
// 	},
// ];

export const loginNavMap = [
	// {
	// 	text: "Reset Password",
	// 	path: "reset-password",
	// },
	{
		text: "Create Portofolio?",
		path: "register",
	},
];

export const registerNavMap = [
	{
		text: "Already have an account?",
		path: "/authentication",
	},
];
