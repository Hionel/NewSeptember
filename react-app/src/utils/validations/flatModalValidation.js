const ERROR_MESSAGES = {
	required: "This field is required",
	positiveNumber: "Value must be a positive number",
	invalidNumber: "Value must be a number",
	futureDate: "Date must be in the future",
};

export const FIELD_NAMES = {
	FLAT_NAME: "flatName",
	CITY: "city",
	STREET_NAME: "streetName",
	STREET_NUMBER: "streetNumber",
	YEAR_BUILT: "yearBuilt",
	RENT_PRICE: "rentPrice",
	AVAILABLE_DATE: "availableDate",
	HAS_AC: "hasAC",
};

export const validateModalField = (fieldName, inputValue) => {
	let validationResponse = { success: true, message: "" };

	if (fieldName === FIELD_NAMES.HAS_AC) return;

	if (!inputValue) {
		validationResponse = { success: false, message: ERROR_MESSAGES.required };
	}

	if (fieldName === FIELD_NAMES.STREET_NUMBER) {
		if (isNaN(inputValue) || inputValue < 0) {
			validationResponse = {
				success: false,
				message: isNaN(inputValue)
					? ERROR_MESSAGES.invalidNumber
					: ERROR_MESSAGES.positiveNumber,
			};
		}
	}

	if (fieldName === FIELD_NAMES.RENT_PRICE) {
		if (isNaN(inputValue)) {
			validationResponse = {
				success: false,
				message: ERROR_MESSAGES.invalidNumber,
			};
		} else if (inputValue < 0) {
			validationResponse = {
				success: false,
				message: ERROR_MESSAGES.positiveNumber,
			};
		}
	}

	if (fieldName === FIELD_NAMES.AVAILABLE_DATE) {
		const today = new Date();
		const inputDate = new Date(inputValue);
		if (inputDate < today) {
			validationResponse = {
				success: false,
				message: ERROR_MESSAGES.futureDate,
			};
		}
	}

	return validationResponse;
};
