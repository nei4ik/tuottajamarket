import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.ts";

if (!process.env.DATABASE_URL?.trim()) {
	throw new Error("Add DATABASE_URL to backend/.env before using Prisma.");
}

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
	connectionTimeoutMillis: 5000,
	query_timeout: 10000,
});

export const prisma = new PrismaClient({ adapter });
