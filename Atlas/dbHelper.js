const { MongoClient, ServerApiVersion } = require("mongodb");
const MONGO_PASS = "h9Ah55FY9tkCxUxG";
const uri = `mongodb+srv://ianglabxratxry:${MONGO_PASS}@mongotrials.wv4tl.mongodb.net/?retryWrites=true&w=majority&appName=MongoTrials`;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

exports.connect = async function () {
	await client.connect();
};
exports.close = async function () {
	await client.close();
};
exports.client = function () {
	return client;
};
