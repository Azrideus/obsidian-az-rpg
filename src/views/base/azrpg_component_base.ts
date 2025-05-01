import { App, ItemView, MarkdownRenderer, WorkspaceLeaf } from "obsidian";
import { getAPI } from "obsidian-dataview";
import { DataviewApi } from "obsidian-dataview/lib/api/plugin-api";
export class azrpg_component_base {
	app: App;
	constructor(app: App) {
		this.app = app;
	}
}
