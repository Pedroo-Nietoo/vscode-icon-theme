const fs = require("node:fs");
const path = require("node:path");
const { PKG_PROP_MAP } = require("./constants");
const { confirmReload } = require("./window");
const { log } = require("./log");

const THEME_FILE = "flow-icon-theme.modified.json";
const BACKUP_THEME_FILE = "flow-icon-theme.bkp.json";
const DEFAULT_THEME_FILE = "flow-icon-theme.json";

function getPath() {
	if (__dirname === "src") {
		return path.join(__dirname, THEME_FILE);
	}
	// relative to the current file aka theme.js
	return path.join(__dirname, "..", THEME_FILE);
}

function getDefaultFilePath() {
	if (__dirname === "src") {
		return path.join(__dirname, DEFAULT_THEME_FILE);
	}
	return path.join(__dirname, "..", DEFAULT_THEME_FILE);
}

function getBackupFilePath() {
	if (__dirname === "src") {
		return path.join(__dirname, BACKUP_THEME_FILE);
	}
	return path.join(__dirname, "..", BACKUP_THEME_FILE);
}

function resolveOrCreateTheme() {
	const themeFile = getPath();
	if (!fs.existsSync(themeFile)) {
		fs.copyFileSync(getDefaultFilePath(), themeFile);
	}
	return themeFile;
}

function resolveOrCreateBackupTheme() {
	const backupFile = getBackupFilePath();
	if (!fs.existsSync(backupFile)) {
		fs.copyFileSync(getDefaultFilePath(), backupFile);
	}
	return backupFile;
}

function getThemeFile() {
	return JSON.parse(fs.readFileSync(resolveOrCreateTheme(), "utf-8"));
}

function getSoureFile() {
	return JSON.parse(fs.readFileSync(getDefaultFilePath(), "utf-8"));
}

function getBackupFile() {
	return JSON.parse(fs.readFileSync(resolveOrCreateBackupTheme(), "utf-8"));
}

function writeThemeFile(data) {
	fs.writeFileSync(getPath(), JSON.stringify(data, null, 2));
}

async function syncOriginal() {
	const themePath = getPath();
	const backupJSON = getBackupFile();
	const originalJSON = getSoureFile();

	let needsSync = false;

	const configurableKeys = Object.values(PKG_PROP_MAP);

	for (const key in originalJSON) {
		if (configurableKeys.indexOf(key) > -1) {
			continue;
		}

		const stringifiedSource = JSON.stringify(originalJSON[key]);
		if (!backupJSON[key]) {
			needsSync = true;
			break;
		}

		const stringifiedBackup = JSON.stringify(backupJSON[key]);
		if (stringifiedSource !== stringifiedBackup) {
			log.info({
				stringifiedSource,
				stringifiedBackup,
			});
			needsSync = true;
			break;
		}
	}

	if (needsSync) {
		await confirmReload();
		fs.unlinkSync(themePath);
		fs.copyFileSync(getDefaultFilePath(), themePath);
		fs.copyFileSync(getDefaultFilePath(), getBackupFilePath());
	}
}

module.exports = {
	getThemeFile,
	getSoureFile,
	writeThemeFile,
	syncOriginal,
};
