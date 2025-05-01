import {
	Component,
	ItemView,
	MarkdownRenderer,
	TFile,
	WorkspaceLeaf,
} from "obsidian";

import { azrpg_view_base } from "./base/azrpg_view_base";
import { azrpg_utils } from "../controllers/azrpg_utils";

export const VIEW_TYPE_STAT = "rpg_stat_view";

export class azrpg_view_stat extends azrpg_view_base {
	/**
	 * RPG targets a Creature Leaf to load its stats and abilities
	 */
	target_file: TFile;
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		this.registerEvent(
			this.app.workspace.on("active-leaf-change", () => {
				const active_file = azrpg_utils.getActiveFile(this.app);
				if (active_file) {
					this.setTargetFile(active_file);
				}
			})
		);
	}

	getViewType(): string {
		return VIEW_TYPE_STAT;
	}

	getDisplayText(): string {
		return "AZ-DND";
	}
	setTargetFile(target_file: TFile) {
		this.target_file = target_file;
		this.createElements();
	}
	createElements() {
		const container = this.containerEl.children[1];
		container.empty();
		container.createEl("h2", { text: "Azrico DnD - Stat View" });
		container.createEl("span", { text: this.target_file.basename });
	}

	async onOpen() {
		// const table_container = container.createEl("div");
		// const tableContainer = container.createDiv();
		// const headers = ["Name", "HP"];
		// const rows = [
		// 	["Goblin", 12],
		// 	["Troll", 60],
		// 	["Dragon", 200],
		// ];
		// this.dv.table(headers, rows, tableContainer, this, this.fp); // ✅ proper component
	}

	async onClose() {
		// Cleanup if needed
	}
}
