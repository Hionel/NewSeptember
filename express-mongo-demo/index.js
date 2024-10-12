import express from "express";
import dotenv from "dotenv";

import { MongoClient, ServerApiVersion } from "mongodb";

import usersRoutes from "./routes/usersRoutes.js";
import { logger } from "./middlewares/logger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

// Use modules
app.use(express.json());

// Setup connection with mongodb
const MONGO_PASS = process.env.MONGO_PASS;
const uri = `mongodb+srv://ianglabxratxry:${MONGO_PASS}@mongotrials.wv4tl.mongodb.net/?retryWrites=true&w=majority&appName=MongoTrials`;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});
let databaseObject = null;
const connectWithMongo = () => {
	client
		.connect((err) => {
			if (err) {
				console.log(err);
				return;
			}
		})
		.then((client) => {
			databaseObject = client.db("mongotrials");
			console.log("Connected to MongoDB");
		});
};

// Middleware
app.use(logger);

// Routes
app.get("/", (req, res) => {
	res.send(200);
});

app.use("/users", usersRoutes);

// Listen
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectWithMongo();
});
