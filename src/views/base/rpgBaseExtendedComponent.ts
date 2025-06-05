import az_rpg from "main";
import { App, Component, MarkdownRenderer } from "obsidian";
import { getAPI } from "obsidian-dataview";
import { DataviewApi } from "obsidian-dataview/lib/api/plugin-api";
export class rpgBaseExtendedComponent extends Component {
	readonly containerEl: HTMLElement;
	readonly app: App;
	readonly plugin: az_rpg;

	constructor(app: App, plugin: az_rpg, container: HTMLElement) {
		super();
		this.app = app;
		this.plugin = plugin;
		this.containerEl = container.createDiv();
	}

	get dv(): DataviewApi {
		return getAPI(this.app);
	}
	get fp(): string {
		return this.app.workspace.getActiveFile()?.path || "";
	}
	get fn(): string {
		return this.app.workspace.getActiveFile()?.basename || "";
	}
	make_input(type: string, name: string, addSquigles = false): string {
		if (addSquigles) return `~~~meta-bind\nINPUT[${type}:${name}]\n~~~`;
		return `INPUT[${type}:${name}]`;
	}
}
