import {
	Component,
	ItemView,
	MarkdownRenderer,
	TFile,
	WorkspaceLeaf,
} from "obsidian";

import { azrpg_view_base } from "./base/azrpg_view_base";
import { rpgUtils, RPG_FileType } from "../controllers/rpgUtils";
import { rpgCreature } from "../classes/rpgCreature";
import { componentCreature } from "./components/componentCreature";

export const VIEW_TYPE_STAT = "rpg_view";

/**
 * This is the main view for the RPG plugin
 * it supports the following types of files:
 * Creature
 * Item
 */
export class azrpg_view_stat extends azrpg_view_base {
	target_file: TFile;
	target_file_type: RPG_FileType;
	creature: rpgCreature;
	cmp_creature: componentCreature;

	refreshButton: HTMLElement;
	headerRow: HTMLElement;
	contentContainer: HTMLElement;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		this.registerEvent(
			this.app.workspace.on("active-leaf-change", () => {
				const active_file = rpgUtils.getActiveFile(this.app);
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
		if (this.target_file == target_file) return;
		this.target_file = target_file;
		this.target_file_type = rpgUtils.getFileRpgType(
			this.app,
			this.target_file
		);

		this.preparePage();
	}
	preparePage() {
		const container = this.containerEl.children[1];
		container.empty();
		this.headerRow = container.createEl("div", { cls: "rpg_header_row" });
		this.contentContainer = container.createEl("div", {
			cls: "rpg_header_row",
		});
		switch (this.target_file_type) {
			case "creature":
				this.headerRow.createEl("h2", {
					text: `Creature View - ${this.target_file.basename}`,
				});
				this.refreshButton = this.headerRow.createEl("button", {
					text: "🔄 Refresh",
				});
				break;
			case "item":
				this.headerRow.createEl("h2", {
					text: `Item View - ${this.target_file.basename}`,
				});
				this.refreshButton = this.headerRow.createEl("button", {
					text: "🔄 Refresh",
				});
				break;
			default:
				this.headerRow.createEl("h2", {
					text: `DnD View - ${this.target_file.basename}`,
				});
				this.refreshButton = this.headerRow.createEl("button", {
					text: "🔄 Refresh",
				});

				break;
		}
		this.refreshButton.onclick = () => this.refresh();
		this.refresh();
	}
	refresh() {
		this.contentContainer.empty();

		switch (this.target_file_type) {
			case "creature":
				this.creature = new rpgCreature(this.app, this.target_file);
				this.cmp_creature = new componentCreature(
					this.app,
					this.contentContainer,
					this.creature
				);
				this.cmp_creature.load();
				break;
			case "item":
				break;
			default:
				this.contentContainer.createEl("span", {
					text: "add #creature or #item tag to your note to get started",
				});
				break;
		}
	}

	async onOpen() {}

	async onClose() {}
}
