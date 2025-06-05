import { App } from "obsidian";
import { rpgBaseExtendedComponent } from "../base/rpgBaseExtendedComponent";
import { rpgFieldMaker } from "src/controllers/rpgFieldMaker";
import { rpgCreature } from "src/classes/rpgCreature";
import { rpgUtils } from "src/controllers/rpgUtils";
import { rpgItem } from "src/classes/rpgItem";
import { componentRepairTable } from "./componentRepairTable";
import az_rpg from "main";

export const VIEW_TYPE_STAT = "rpg_view";

export class componentItem extends rpgBaseExtendedComponent {
	readonly item: rpgItem;
	readonly big_view: boolean;

	constructor(
		app: App,
		plugin: az_rpg,
		container: HTMLElement,
		item: rpgItem,
		big_view = true
	) {
		super(app, plugin, container);
		this.big_view = big_view;
		this.item = item;
	}

	async onload() {
		/* ------------------------------ Item Summary ------------------------------ */
		let item_info = "";
		item_info +=
			"> [!tip] " +
			this.fn +
			` ${this.item.get("tier") ? "T" + this.item.get("tier") : ""}`;
		item_info += "\n > " + this.item.get("info");

		if (this.item.getNum("charges", -1) >= 0) {
			item_info += "\n > " + this.item.getNum("charges") + " Uses Left";
		}

		rpgFieldMaker.markdown(this, item_info);

		if (!this.big_view) return;
		const item_data = {
			Item: {
				columns: ["Info", "Value"],
				data: {
					"Blood Cost 🩸": "INPUT[number:blood_cost]",
					"AP Cost ⏩": "INPUT[number:ap_cost]",
					"Charges Left 🪫": "INPUT[number:charges]",
					"Item Size 📏": "INPUT[number:size]",
					"Item Tier 🔥": "INPUT[number:tier]",
					"Item Repair Mod 🪛": "INPUT[number:repair_mod]",
					"Damage ⚔️": "INPUT[text:damage]",
					"Heal 💉": "INPUT[text:heal]",
					"Range 📐": "INPUT[number:Range]",
					"Physical Def 🛡️": "INPUT[number:physical_def]",
					"Magical Def 🛡️": "INPUT[number:magical_def]",
					Lore: "INPUT[text:lore]",
					Info: "INPUT[textArea:info]",
				},
			},
		};

		for (const header in item_data) {
			rpgFieldMaker.render_statblock(
				this,
				header,
				(item_data as any)[header]
			);
		}
	}
}
