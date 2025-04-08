import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { depMap } from "../dep-map.js";

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_PKG = path.resolve(__dirname, "../../package.json");
const PUBLISH_PKG = path.resolve(__dirname, "../../publish/package.json");

const rootPkg = JSON.parse(fs.readFileSync(ROOT_PKG, "utf-8"));
const publishPkg = JSON.parse(fs.readFileSync(PUBLISH_PKG, "utf-8"));

// Reset peer and runtime deps
publishPkg.peerDependencies = {};
publishPkg.dependencies = {};

// Populate peerDependencies
for (const dep of depMap.peer) {
	const version = rootPkg.dependencies?.[dep] || rootPkg.devDependencies?.[dep];
	if (version) {
		publishPkg.peerDependencies[dep] = version;
	}
}

// Populate runtime dependencies
for (const dep of depMap.runtime) {
	const version = rootPkg.dependencies?.[dep];
	if (version) {
		publishPkg.dependencies[dep] = version;
	}
}

// Optional cleanup
// publishPkg.devDependencies = undefined;
// publishPkg.scripts = undefined;

fs.writeFileSync(PUBLISH_PKG, JSON.stringify(publishPkg, null, 2));

console.log("✅ publish/package.json updated using dependency map");
