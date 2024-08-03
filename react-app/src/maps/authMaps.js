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

export const getRegisterFormMap = (
	formData,
	handleInputChange,
	handleErrorBlur
) => {
	return [
		{
			id: "email",
			type: "email",
			label: "Email",
			value: formData.email,
			onChange: handleInputChange,
			onBlur: handleErrorBlur,
		},

		{
			id: "firstName",
			type: "text",
			label: "First Name",
			value: formData.firstName,
			onChange: handleInputChange,
			onBlur: handleErrorBlur,
		},
		{
			id: "lastName",
			type: "text",
			label: "Last Name",
			value: formData.lastName,
			onChange: handleInputChange,
			onBlur: handleErrorBlur,
		},
		{
			id: "age",
			type: "number",
			label: "Age",
			value: formData.age,
			onChange: handleInputChange,
			onBlur: handleErrorBlur,
		},
		{
			id: "password",
			type: "password",
			label: "Password",
			value: formData.password,
			onChange: handleInputChange,
			onBlur: handleErrorBlur,
		},
		{
			id: "confirmPassword",
			type: "password",
			label: "Confirm Password",
			value: formData.confirmPassword,
			onChange: handleInputChange,
			onBlur: handleErrorBlur,
		},
	];
};

// AUTH-Navigation

export const loginNavMap = [
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
