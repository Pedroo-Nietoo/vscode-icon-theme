const vscode = require("vscode");
const { log } = require("./log");
const defaultConfig = require("../flow-icon-theme.json");
const pkgConfig = require("../../package.json");
const { getSoureFile, writeThemeFile } = require("./theme");
const { PKG_PROP_MAP } = require("./constants");
const { updateThemeJSONHandlers } = require("./theme-json-handlers");

const configDef = pkgConfig.contributes.configuration;
const configKeys = Object.keys(configDef.properties);
const defaultState = themeJSONToConfig(defaultConfig);

/**
 * @description will get the current **workspace** configuration
 */
function getWorkspaceConfiguration() {
	const config = {};
	for (const key of configKeys) {
		if (!PKG_PROP_MAP[key]) {
			continue;
		}

		const valueGroup = vscode.workspace.getConfiguration("flow").inspect(PKG_PROP_MAP[key]);

		config[PKG_PROP_MAP[key]] = valueGroup.workspaceValue || valueGroup.globalValue || defaultState[PKG_PROP_MAP[key]];
	}

	return config;
}

function themeJSONToConfig(themeDef) {
	const result = {};

	for (const key of configKeys) {
		if (!PKG_PROP_MAP[key]) {
			continue;
		}
		result[PKG_PROP_MAP[key]] = themeDef[PKG_PROP_MAP[key]];
	}

	return result;
}

function updateConfig(config) {
	const themeJSON = getSoureFile();

	const useDefaultAssociations = vscode.workspace.getConfiguration("flow").get("defaultAssociations", true);
	log.info(`🤖 flow.defaultAssociations changed, updating to ${useDefaultAssociations}`);
	if (useDefaultAssociations === false) {
		themeJSON.fileExtensions = {};
		themeJSON.fileNames = {};
		themeJSON.languageIds = {};
		themeJSON.folderNames = {};
	}

	for (const key in config) {
		log.info(`🤖 flow.${key} changed, updating to ${config[key]}`);
		const updateHandler = updateThemeJSONHandlers[key];
		if (updateHandler) {
			updateHandler(themeJSON, config[key]);
		}
	}

	writeThemeFile(themeJSON);
}

module.exports = {
	getWorkspaceConfiguration,
	themeJSONToConfig,
	updateConfig,
};
