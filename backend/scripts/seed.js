import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { prisma } from "../db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = resolve(__dirname, "..", "prisma", "seed-data.json");

if (!existsSync(dataPath)) {
	console.error("Missing backend/prisma/seed-data.json. Run `npm run db:export` with your local DB first.");
	process.exit(1);
}

const items = JSON.parse(readFileSync(dataPath, "utf8"));

try {
	let inserted = 0;
	for (const item of items) {
		await prisma.product.upsert({
			where: { id: item.id },
			update: {
				title: item.title,
				description: item.description,
				price: item.price,
				category: item.category,
				imageUrl: item.imageUrl ?? null,
				featured: item.featured ?? null,
			},
			create: {
				id: item.id,
				title: item.title,
				description: item.description,
				price: item.price,
				category: item.category,
				imageUrl: item.imageUrl ?? null,
				featured: item.featured ?? null,
			},
		});
		inserted += 1;
	}

	await prisma.$executeRawUnsafe(
		'SELECT setval(pg_get_serial_sequence(\'"Product"\', \'id\'), COALESCE((SELECT MAX(id) FROM "Product"), 1), true);'
	);

	console.log(`Seeded ${inserted} products into the database.`);
} finally {
	await prisma.$disconnect();
}
