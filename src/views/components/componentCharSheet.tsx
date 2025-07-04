import { App } from "obsidian";
import { rpgBaseExtendedComponent } from "../base/rpgBaseExtendedComponent";

import { componentRepairTable } from "./componentRepairTable";
import { Root, createRoot } from "react-dom/client";
import { rpgCreature } from "../../classes/rpgCreature";
import { StrictMode } from "react";
import CharacterSheet from "../sheets/CharacterSheet";
import az_rpg from "main";
import { rpgUtils } from "src/controllers/rpgUtils";

export const VIEW_TYPE_STAT = "rpg_view_character_sheet";

export class componentCharSheet extends rpgBaseExtendedComponent {
	readonly creature: rpgCreature;
	root: Root | null = null;
	item_repair_table: componentRepairTable;
	constructor(
		app: App,
		plugin: az_rpg,
		container: HTMLElement,
		creature: rpgCreature
	) {
		super(app, plugin, container);
		this.creature = creature;
	}
	async onload() {
		this.containerEl.addClass("az-character-sheet-parent");
		this.root = createRoot(this.containerEl);
		const theme = rpgUtils.getFileRpgTheme(this.app, this.creature.file);
		this.root.render(
			<StrictMode>
				<CharacterSheet
					theme={theme}
					creature={this.creature}
					image_folder={this.plugin.image_folder}
				/>
			</StrictMode>
		);
	}
}
