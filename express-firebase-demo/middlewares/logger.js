export const logger = (req, res, next) => {
	console.log(`${req.method} Request made to URL: ${req.url}`);
	next();
};
