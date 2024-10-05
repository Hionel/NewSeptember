export const getAllUsers = async (req, res) => {
	res.status(200).json({ message: "Hello from users GET route" });
};

export const createUser = async (req, res) => {
	res.status(200).json({ message: "Hello from users POST route" });
};
