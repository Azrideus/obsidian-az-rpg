import { App, Component, MarkdownRenderer } from "obsidian";
import { getAPI } from "obsidian-dataview";
import { DataviewApi } from "obsidian-dataview/lib/api/plugin-api";
export class rpgBaseExtendedComponent extends Component {
	readonly containerEl: HTMLElement;
	readonly app: App;

	constructor(app: App, container: HTMLElement) {
		super();
		this.app = app;
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
