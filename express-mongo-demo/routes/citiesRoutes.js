import express from "express";

const router = express.Router();

router.post("/", mockupDataInsertion);

export default router;
