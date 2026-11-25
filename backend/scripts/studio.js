import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const backendDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cliArgs = process.argv.slice(2);
const require = createRequire(import.meta.url);
const cliPath = require.resolve("prisma/build/index.js");

// Keep Prisma Studio state inside the project, not in the Windows profile.
// These environment changes affect this process only, not system settings.
if (process.platform === "win32") {
	const stateDir = resolve(backendDir, "node_modules", ".cache", "prisma-studio");
	mkdirSync(stateDir, { recursive: true });
	process.env.LOCALAPPDATA = stateDir;
	process.env.APPDATA = stateDir;
}

process.chdir(backendDir);
process.env.BROWSER = "none";
process.argv = [
	process.execPath,
	cliPath,
	"studio",
	"--browser",
	"none",
	"--port",
	"5555",
	...cliArgs,
];

// Run the installed Prisma 7 CLI in the foreground without a child shell.
// Open the address printed by Prisma manually; stop the server with Ctrl+C.
await import(pathToFileURL(cliPath).href);
