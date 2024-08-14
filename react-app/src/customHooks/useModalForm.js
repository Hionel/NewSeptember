import { useEffect, useState } from "react";
import { validateModalField } from "../utils/validations/flatModalValidation";

const initialStateObject = {
	flatName: "",
	city: "",
	streetName: "",
	streetNumber: "",
	yearBuilt: "",
	rentPrice: "",
	availableDate: "",
	hasAC: false,
};

const initialErrorStateObject = {
	flatName: { success: null, message: "" },
	city: { success: null, message: "" },
	streetName: { success: null, message: "" },
	streetNumber: { success: null, message: "" },
	yearBuilt: { success: null, message: "" },
	rentPrice: { success: null, message: "" },
	availableDate: { success: null, message: "" },
};

export const useModalForm = (formData) => {
	const [flatData, setFlatData] = useState(initialStateObject);
	const [errors, setErrors] = useState(initialErrorStateObject);
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		if (formData) {
			setEditMode(true);
			setFlatData((prevData) => ({
				...prevData,
				...formData,
			}));
		} else {
			setEditMode(false);
			setFlatData(initialStateObject);
		}
	}, [formData]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFlatData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleError = (e) => {
		const { name, value } = e.target;
		const validationResponse = validateModalField(name, value);
		setErrors({ ...errors, [name]: validationResponse });
	};

	return {
		flatData,
		errors,
		editMode,
		handleChange,
		handleError,
		setErrors,
		validateModalField,
	};
};
