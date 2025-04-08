import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "url";
import semver from "semver";
import { execSync } from "child_process";

// Simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const incrementVersion = (currentVersion, releaseType) => {
	return semver.inc(currentVersion, releaseType);
};

const resolvePath = (p) => {
	return path.resolve(__dirname, "../../", p);
};

const readJson = (path) => {
	return JSON.parse(fs.readFileSync(path, "utf8"));
};

const writeJson = (path, obj) => {
	fs.writeFileSync(path, `${JSON.stringify(obj, null, 2)}\n`, "utf8");
};

const updateVersion = (releaseType) => {
	const packageJsonPath = resolvePath("./package.json");
	console.log(packageJsonPath);
	const publishPackageJsonPath = resolvePath("./publish/package.json");

	try {
		const packageJson = readJson(packageJsonPath);
		const publishPackageJson = readJson(publishPackageJsonPath);

		const newVersion = incrementVersion(packageJson.version, releaseType);

		if (!newVersion) {
			throw new Error(
				'Invalid release type. Use "patch", "minor", or "major".',
			);
		}

		packageJson.version = newVersion;
		publishPackageJson.version = newVersion;

		writeJson(packageJsonPath, packageJson);
		writeJson(publishPackageJsonPath, publishPackageJson);

		// Commit the changes to Git
		execSync(`git add ${packageJsonPath}`);
		execSync(`git add ${publishPackageJsonPath}`);
		execSync(`git commit -m "chore(version): bump version to ${newVersion}"`);
		execSync("git push origin main");

		console.log(`\nVersion updated to ${newVersion}`);
	} catch (error) {
		console.error("Error updating package.json:", error.message);
		process.exit(1);
	}
};

// Pass the release type as a command-line argument
const releaseType = process.argv[2];

if (!["patch", "minor", "major"].includes(releaseType)) {
	console.error('Please specify a release type: "patch", "minor", or "major".');
	console.error("Example: node updateVersion.js patch");
	process.exit(1);
}

updateVersion(releaseType);
