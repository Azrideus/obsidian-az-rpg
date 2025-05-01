import { App, ItemView, MarkdownRenderer, WorkspaceLeaf } from "obsidian";
import { getAPI } from "obsidian-dataview";
import { DataviewApi } from "obsidian-dataview/lib/api/plugin-api";
export class azrpg_view_base extends ItemView {
	getViewType(): string {
		return "";
	}

	getDisplayText(): string {
		return "";
	}

	get dv(): DataviewApi {
		return getAPI(this.app);
	}
	get fp(): string {
		return this.app.workspace.getActiveFile()?.path || "";
	}
}
