import { useState, useEffect } from "react";
import { authValidationRules } from "../utils/validations/authValidation";

export const useAuthForm = (initialFormState) => {
	const [form, setForm] = useState(initialFormState);
	const [errors, setErrors] = useState(initialFormState);
	const [isFormValid, setIsFormValid] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleError = (e) => {
		const { name, value } = e.target;
		validateFields(name, value);
	};

	const validateFields = (fieldName, inputValue) => {
		console.log(fieldName, inputValue);
		let validationResponse = null;
		if (fieldName === "confirmPassword") {
			validationResponse = authValidationRules[fieldName](
				inputValue,
				form.password
			);
		} else {
			validationResponse = authValidationRules[fieldName](inputValue);
		}

		setErrors({ ...errors, [fieldName]: validationResponse });
	};

	useEffect(() => {
		const errorsArray = Object.values(errors).map(
			(repsonseObj) => repsonseObj && repsonseObj.success
		);
		const isValid = errorsArray.every((value) => value === true);

		setIsFormValid(isValid);
	}, [errors, form]);

	return { form, handleChange, handleError, errors, isFormValid };
};
