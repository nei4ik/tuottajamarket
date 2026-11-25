import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./db.js";

const app = express();
const port = Number(process.env.PORT) || 3000;
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
	.split(",")
	.map((origin) => origin.trim())
	.filter(Boolean);

app.use(
	cors({
		origin: allowedOrigins,
	})
);

app.get("/health", (req, res) => {
	res.status(200).send("OK");
});

app.get("/products", async (req, res) => {
	try {
		const products = await prisma.product.findMany();
		res.json(products);
	} catch (error) {
		console.error("Error fetching products:", error);
		res.status(500).json({ error: "Failed to fetch products" });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
