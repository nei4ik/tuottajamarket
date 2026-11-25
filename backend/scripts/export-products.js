import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { prisma } from "../db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, "..", "prisma", "seed-data.json");

try {
	const products = await prisma.product.findMany({
		orderBy: { id: "asc" },
	});

	const serialized = products.map((item) => ({
		id: item.id,
		title: item.title,
		description: item.description,
		price: item.price.toString(),
		category: item.category,
		imageUrl: item.imageUrl,
		featured: item.featured,
	}));

	writeFileSync(outPath, `${JSON.stringify(serialized, null, "\t")}\n`, "utf8");
	console.log(`Exported ${serialized.length} products to prisma/seed-data.json`);
} finally {
	await prisma.$disconnect();
}
