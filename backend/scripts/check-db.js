import { prisma } from "../db.js";

try {
	await prisma.$queryRaw`SELECT 1 AS ok`;
	console.log("OK: Prisma connected to PostgreSQL. No data was changed.");
} catch (error) {
	const code = error.code ?? error.cause?.code ?? "UNKNOWN";
	console.error(`Database connection failed (${code}).`);
	const driverCause = error.meta?.driverAdapterError?.cause;
	if (driverCause?.kind) console.error(`Driver: ${driverCause.kind}`);
	if (driverCause?.originalCode) console.error(`PostgreSQL code: ${driverCause.originalCode}`);
	if (error.meta?.code) console.error(`Query code: ${error.meta.code}`);
	if (driverCause?.kind === "AuthenticationFailed" || driverCause?.originalCode === "28P01") {
		console.error("PostgreSQL rejected the login. Fix the username/password in DATABASE_URL in backend/.env.");
		console.error("Use the PostgreSQL role password, not the pgAdmin master password.");
		console.error("URL-encode special characters in the username/password. Do not share your password.");
	} else {
		console.error("Check that PostgreSQL is running and DATABASE_URL in backend/.env is correct.");
	}
	// Do not print the connection URL or credentials to the terminal.
	process.exitCode = 1;
} finally {
	await prisma.$disconnect();
}
