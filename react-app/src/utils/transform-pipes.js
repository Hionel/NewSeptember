export const formatDisplayName = (firstParam, secondParam) => {
	const capitalize = (str) => {
		if (!str) return "";
		return str[0].toUpperCase() + str.slice(1).toLowerCase();
	};

	const formattedFirstParam = capitalize(firstParam)[0];
	const formattedSecondParam = capitalize(secondParam);

	return `${formattedFirstParam}${formattedSecondParam}`;
};
