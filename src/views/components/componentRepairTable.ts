import { App } from "obsidian";
import { rpgBaseExtendedComponent } from "../base/rpgBaseExtendedComponent";
import { rpgFieldMaker } from "src/controllers/rpgFieldMaker";
import { rpgCreature } from "src/classes/rpgCreature";
import { rpgUtils } from "src/controllers/rpgUtils";
import { rpgItem } from "src/classes/rpgItem";

export const VIEW_TYPE_STAT = "rpg_view";

export class componentRepairTable extends rpgBaseExtendedComponent {
	readonly items: rpgItem[];
	constructor(app: App, container: HTMLElement, items: rpgItem[]) {
		super(app, container);
		this.items = items;
	}

	async onload() {
		let total_repair_time = 0;
		let lab_total_repair_time = 0;
		let total_count = 0;

		const rows = [];
		const cols = [
			"Item",
			"Base Repair Time",
			"Count",
			"Repair Time",
			"Repair Time in Lab",
		];
		for (const item of this.items) {
			const item_count = item.item_count;
			const item_repair_time =
				item.get("size") *
				item.get("tier") *
				item.get("repair_mod") *
				rpgItem.TIER_REPAIR_MOD;

			if (Number.isNaN(item_repair_time) || item_repair_time <= 0)
				continue;

			const item_total_repair_time = item_repair_time * item_count;
			rows.push([
				`[[${item.file?.path}|${item.file?.name}]]`,
				item_repair_time,
				item_count,
				item_total_repair_time,
				item_total_repair_time / rpgItem.LAB_REPAIR_SPEED,
			]);
			total_count += item_count;
			total_repair_time += item_total_repair_time;
		}
		lab_total_repair_time = total_repair_time / rpgItem.LAB_REPAIR_SPEED;
		if (rows.length == 0) {
			/**
			 * there is no repair cost
			 */
			this.containerEl.createEl("p", {
				text: `> [!info]- No Repair Cost`,
			});
		} else {
			/* -------------------------------- Subtotal -------------------------------- */
			rows.push([
				``,
				"",
				`<b>${total_count}</b>`,
				`<b>${total_repair_time}</b>`,
				`<b>${lab_total_repair_time}</b>`,
			]);
			const final_text =
				`> [!note]- Maintenance Time: ${total_repair_time} - Lab: ${lab_total_repair_time} \n>` +
				this.dv.markdownTable(cols, rows);
			this.containerEl.createEl("p", { text: final_text });
		}
	}
}
