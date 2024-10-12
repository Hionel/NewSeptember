const express = require("express");
let dbHelper = require("./dbHelper");

dbHelper.connect(); // Conectare la baza de date
let client = dbHelper.client();
let db = client.db("MongoTrials");
let app = express();
app.use(express.json());
let port = 3000;

app.get("/", GetOneRecord);
app.post("/OneRecord", InsertOneRecord);
app.post("/mockup", addMockupData);
app.post("/maimulte", InsertManyRecords);
app.get("/allrecord", GetAllDoc);
app.get("/specific", GetFilter);
app.get("/Fill/:filter/:value/:operator", Filter); // am redenumit parametrii pentru claritate
app.get("/cities", getCities);

// Selectează un document
async function GetOneRecord(req, res) {
	try {
		const col = db.collection("mybok");
		const data = await col.findOne();
		res.status(200).json(data);
	} catch (e) {
		res.status(400).json({ status: "Error fetching record", error: e });
	}
}

// Inserare un document
async function InsertOneRecord(req, res) {
	try {
		const coll = db.collection("mybok");
		let dataToInsert = req.body;
		const data = await coll.insertOne(dataToInsert);
		res.status(200).json(data);
	} catch (e) {
		res.status(400).json({ status: "Error inserting record", error: e });
	}
}

// Inserare mai multe documente
async function InsertManyRecords(req, res) {
	try {
		const coll = db.collection("mybok");
		let dataToInsert = req.body;

		if (!Array.isArray(dataToInsert)) {
			return res
				.status(400)
				.json({ status: "Input should be an array of documents" });
		}

		const data = await coll.insertMany(dataToInsert);
		res.status(200).json(data);
	} catch (e) {
		res
			.status(400)
			.json({ status: "Error inserting multiple records", error: e });
	}
}

// Selectează toate documentele
async function GetAllDoc(req, res) {
	try {
		const coll = db.collection("mybok");
		const data = await coll.find().toArray();
		res.status(200).json(data);
	} catch (e) {
		res.status(400).json({ status: "Error fetching all records", error: e });
	}
}

// Găsește documente după un criteriu specific (filtrare după corpul cererii)
async function GetFilter(req, res) {
	try {
		const coll = db.collection("mybok");
		const data = await coll.find(req.body).toArray();
		res.status(200).json(data);
	} catch (e) {
		res.status(400).json({ status: "Error filtering records", error: e });
	}
}

// Filtrare avansată cu parametrii
async function Filter(req, res) {
	try {
		const coll = db.collection("mybok");
		let params = req.params;

		// Construiește dinamica filtrului pe baza parametrilor
		let query = {};
		query[params.filter] = { [`$${params.operator}`]: params.value };

		const data = await coll.find(query).toArray();
		res.status(200).json(data);
	} catch (e) {
		res.status(400).json({ status: "Error with advanced filter", error: e });
	}
}

async function addMockupData(req, res) {
	try {
		const coll = db.collection("Cities");
		coll.insertMany([
			{
				name: "New York",
				country: "USA",
				population: 8419600,
				area: 783.8,
				coordinates: { lat: 40.7128, lon: -74.006 },
			},
			{
				name: "Los Angeles",
				country: "USA",
				population: 3980400,
				area: 1214,
				coordinates: { lat: 34.0522, lon: -118.2437 },
			},
			{
				name: "Chicago",
				country: "USA",
				population: 2716000,
				area: 589,
				coordinates: { lat: 41.8781, lon: -87.6298 },
			},
			{
				name: "Toronto",
				country: "Canada",
				population: 2731600,
				area: 630.2,
				coordinates: { lat: 43.6532, lon: -79.3832 },
			},
			{
				name: "London",
				country: "UK",
				population: 8982000,
				area: 1572,
				coordinates: { lat: 51.5074, lon: -0.1278 },
			},
			{
				name: "Paris",
				country: "France",
				population: 2148000,
				area: 105.4,
				coordinates: { lat: 48.8566, lon: 2.3522 },
			},
			{
				name: "Berlin",
				country: "Germany",
				population: 3669000,
				area: 891.8,
				coordinates: { lat: 52.52, lon: 13.405 },
			},
			{
				name: "Madrid",
				country: "Spain",
				population: 3266000,
				area: 604.3,
				coordinates: { lat: 40.4168, lon: -3.7038 },
			},
			{
				name: "Tokyo",
				country: "Japan",
				population: 37400068,
				area: 2194,
				coordinates: { lat: 35.6762, lon: 139.6503 },
			},
			{
				name: "Sydney",
				country: "Australia",
				population: 5312163,
				area: 12368,
				coordinates: { lat: -33.8688, lon: 151.2093 },
			},
			{
				name: "Melbourne",
				country: "Australia",
				population: 5078193,
				area: 9992,
				coordinates: { lat: -33.8688, lon: 151.2093 },
			},
		]);
		res.status(200).json({ status: "Mockup data added" });
	} catch (e) {
		res.status(400).json({ status: "Error with advanced filter", error: e });
	}
}

async function getCities(req, res) {
	try {
		console.log(req.query);
		const countryFilter = req.query.country;
		const minPopulationFilter = req.query.minPopulation;
		const coll = db.collection("Cities");
		const data = await coll
			.find({
				$and: [
					{ country: countryFilter }, // Condition for country
					{ population: { $gt: Number(minPopulationFilter) } }, // Condition for population
				],
			})
			.toArray();
		res.status(200).json(data);
	} catch (e) {
		res.status(400).json({ status: "Error with advanced filter", error: e });
	}
}

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
