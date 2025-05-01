import { App } from "obsidian";
import { DataviewApi, getAPI } from "obsidian-dataview";

/**
 * Wrapper class for all classes in the azrpg project.
 */
export class azrpg_base_class {
	app: App;
	constructor(app: App) {
		this.app = app;
	}
	get dv(): DataviewApi {
		return getAPI(this.app);
	}
	get fp(): string {
		return this.app.workspace.getActiveFile()?.path || "";
	}
}
