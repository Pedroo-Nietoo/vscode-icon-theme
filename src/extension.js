const vscode = require("vscode");
const { monitorConfigChanges } = require("./lib/change-listener");
const { syncOriginal } = require("./lib/theme");
const { log } = require("./lib/log");
/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	log.info("Pedroo-Nietoo.flow activated");
	await syncOriginal();
	monitorConfigChanges();

	vscode.workspace.onDidChangeConfiguration(monitorConfigChanges);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
