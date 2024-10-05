import express from "express";
import dotenv from "dotenv";

import usersRoutes from "./routes/usersRoutes.js";
import { logger } from "./middlewares/logger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

// Use modules
app.use(express.json());

// Middleware
app.use(logger);

// Routes
app.get("/", (req, res) => {
	res.send("Hello from express-firebase-demo");
});

app.use("/users", usersRoutes);

// Listen
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
