import {
	Component,
	ItemView,
	MarkdownRenderer,
	TFile,
	WorkspaceLeaf,
} from "obsidian";

import { azrpg_view_base } from "./azrpg_view_base";
import { rpgUtils, RPG_FileType } from "../../controllers/rpgUtils";
import { rpgCreature } from "../../classes/rpgCreature";
import { rpgItem } from "src/classes/rpgItem";
import { componentItem } from "../components/componentItem";
import { rpgBaseClass } from "src/classes/base/rpgBaseClass";
import { rpgBaseExtendedComponent } from "./rpgBaseExtendedComponent";
import { componentCharSheet } from "../components/componentCharSheet";
import az_rpg from "main";

export const VIEW_TYPE_STAT = "rpg_view";

/**
 * This is the main view for the RPG plugin
 * it supports the following types of files:
 * Creature
 * Item
 */
export class azrpg_view_stat extends azrpg_view_base {
	target: rpgBaseClass;
	cmp: rpgBaseExtendedComponent;

	refreshButton: HTMLElement;
	headerRow: HTMLElement;
	contentContainer: HTMLElement;

	constructor(plugin: az_rpg, leaf: WorkspaceLeaf) {
		super(plugin, leaf);
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
		super.setTargetFile(target_file);
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
				this.target = new rpgCreature(this.app, this.target_file);
				this.cmp = new componentCharSheet(
					this.app,
					this.plugin,
					this.contentContainer,
					this.target as rpgCreature
				);
				break;
			case "item":
				this.target = new rpgItem(this.app, this.target_file);
				this.cmp = new componentItem(
					this.app,
					this.plugin,
					this.contentContainer,
					this.target as rpgItem
				);
				break;
			default:
				this.contentContainer.createEl("span", {
					text: "add #creature or #item tag to your note to get started",
				});
				break;
		}
		if (this.cmp != null) this.cmp.load();
	}
}
