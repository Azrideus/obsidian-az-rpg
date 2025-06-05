import { App } from "obsidian";
import { rpgBaseExtendedComponent } from "../base/rpgBaseExtendedComponent";
import { rpgFieldMaker } from "src/controllers/rpgFieldMaker";
import {
	CLASS_CATEGORIES,
	rpgCreature,
	STAT_KEYS,
	StatCategoryType,
	StatKeyType,
} from "src/classes/rpgCreature";
import { rpgUtils } from "src/controllers/rpgUtils";
import { rpgItem } from "src/classes/rpgItem";
import { componentRepairTable } from "./componentRepairTable";
import az_rpg from "main";

export const VIEW_TYPE_STAT = "rpg_view";

export class componentCreature extends rpgBaseExtendedComponent {
	readonly creature: rpgCreature;
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

	get_stat_column_name(stat: string) {
		return [`mod_${stat}`, `auto_${stat}`, `${stat}`];
	}
	get_stat_cols(stat_category_array: StatCategoryType[]) {
		return stat_category_array.flatMap((s) => [s, s]);
	}
	/**
	 * Create rows from the stat categories
	 */
	get_stat_rows(stat_category_array: StatCategoryType[]) {
		const category_items = stat_category_array.map(
			(category) => STAT_KEYS[category]
		);
		const needed_row_count = Math.max(
			...category_items.map((c) => Object.keys(c).length)
		);

		const rows = [];
		for (let index = 0; index < needed_row_count; index++) {
			rows.push(
				stat_category_array
					.map((category) => {
						const category_items = STAT_KEYS[category];
						const current_selected_item =
							index < category_items.length
								? category_items[index]
								: "";
						if (!current_selected_item) return ["", ""];
						return [
							current_selected_item,
							this.make_input("number", current_selected_item),
						];
					})
					.flat()
			);
		}
		return rows;
	}

	async onload() {
		await this.view_stat_block();
		await this.info_area();
		await this.stat_area();
		/* -------------------------------------------------------------------------- */
		/*                                    Items                                   */
		/* -------------------------------------------------------------------------- */
		const qslots = {
			Head: [2, `slot_head`],
			Neck: [2, `slot_neck`],
			Body: [2, `slot_body`],
			Belt: [2, `slot_belt`],
			Backpack: [6, `slot_backpack`],
			Pockets: [1, `slot_pockets`],
			"Left Hand": [2, `slot_lhand`],
			"Right Hand": [2, `slot_rhand`],
			"Home Storage": [1, `slot_home`],
		};
		const slots_data = {
			Items: {
				columns: ["Slot", "Items"],
				data: {},
			},
		};
		for (const key in qslots) {
			const [slot_count, slot_key] = (qslots as any)[key];
			const items_in_slot = this.creature.get_items(slot_key);
			let used_size = 0;
			items_in_slot.map((r: rpgItem) => {
				used_size += r.total_size();
			});

			(slots_data.Items.data as any)[
				key + ` (${used_size}/${slot_count})`
			] = `INPUT[inlineListSuggester(${rpgItem.get_data_source()}):${slot_key}]`;
		}
		for (const s in slots_data) {
			await rpgFieldMaker.render_statblock(
				this,
				s,
				(slots_data as any)[s]
			);
		}

		this.item_repair_table = new componentRepairTable(
			this.app,
			this.containerEl.createEl("div"),
			this.creature.get_items()
		);
		this.item_repair_table.onload();

		rpgUtils.hookMarkdownLinkMouseEventHandlers(
			this.app,
			this.containerEl,
			this.fp,
			this.fp
		);
	}

	async view_stat_block() {
		/* -------------------------------------------------------------------------- */
		/*                                  StatBlock                                 */
		/* -------------------------------------------------------------------------- */
		// const details = this.creature.get_details();
		// const key_details = [details.hp, details.blood, details.mana];
		// const data = {
		// 	layout: "Vampire",
		// 	...details,
		// 	key_details: Object.values(key_details),
		// 	image: this.creature.get("image"),
		// 	name: this.fn,
		// 	stats: stats,
		// };
		// let data_str = "";
		// for (const key in data) {
		// 	let value_str = (data as any)[key];
		// 	if (Array.isArray(value_str)) {
		// 		value_str = "[" + "" + value_str.join(", ") + "]";
		// 	} else value_str = String(value_str);
		// 	data_str += `${key}: ${value_str}\n`;
		// }
		// await rpgFieldMaker.markdown(this, `~~~statblock\n${data_str}\n~~~`);
	}

	async info_area() {
		const type_selector = `INPUT[inlineSelect(
						option(npc, NPC),
						option(player, Player)
					):type]`;
		const clan_selector = `INPUT[inlineSelect(
						option(#y, Y),
						option(#x, X)
					):clan]`;
		const is_player = this.creature.is_player();

		const info_data = {
			Information: {
				columns: ["Field", "Value"],
				data: {
					Nickname: ["INPUT[text:nickname]", type_selector],
					Image: [
						`INPUT[imageSuggester(optionQuery("${rpgUtils.getAppImagesPathPrefix()}")):image]`,
						clan_selector,
					],
					Experience: ["INPUT[number:xp]"],
				},
			},
		};
		for (const header in info_data) {
			await rpgFieldMaker.render_statblock(
				this,
				header,
				(info_data as any)[header]
			);
		}
	}

	async stat_area() {
		const stat_key_names = Object.keys(STAT_KEYS);
		const info_data = {
			Attributes: {
				header: `Attributes`,
				columns: this.get_stat_cols([
					stat_key_names[0] as any,
					stat_key_names[1] as any,
					stat_key_names[2] as any,
				]),
				data: this.get_stat_rows([
					stat_key_names[0] as any,
					stat_key_names[1] as any,
					stat_key_names[2] as any,
				]),
			},
			Abilities: {
				header: `Abilities`,
				columns: this.get_stat_cols([
					stat_key_names[3] as any,
					stat_key_names[4] as any,
					stat_key_names[5] as any,
				]),
				data: this.get_stat_rows([
					stat_key_names[3] as any,
					stat_key_names[4] as any,
					stat_key_names[5] as any,
				]),
			},
			Classes: {
				columns: ["Class", "Level", ""],
				data: CLASS_CATEGORIES.reduce((prev, curr) => {
					return {
						...prev,
						[String(curr)]: this.make_input("number", `${curr}`),
					};
				}, {}),
			},
			Advantages: {
				header: "Advantages And Flaws",
				columns: ["Advantage/Flaw", "Key", "Value"],
				class: "advantage-table",
				data: [0, 1, 2, 3, 4, 5, 6].map((i) => {
					return [
						this.make_input("text", `bonus_${i}`),
						this.make_input("text", `bonus_key_${i}`),
						this.make_input("number", `bonus_value_${i}`),
					];
				}),
			},
		};

		for (const header in info_data) {
			await rpgFieldMaker.render_statblock(
				this,
				header,
				(info_data as any)[header]
			);
		}

		/* -------------------------------------------------------------------------- */
		/*                                   Skills                                   */
		/* -------------------------------------------------------------------------- */
		this.containerEl.createEl("h4", { text: "Ultimate" });
		await rpgFieldMaker.markdown(
			this,
			`~~~meta-bind\nINPUT[textArea:ultimate]\n~~~`
		);

		this.containerEl.createEl("h4", { text: "Skills" });
		await rpgFieldMaker.markdown(
			this,
			`~~~meta-bind\nINPUT[textArea:skills]\n~~~`
		);
	}
}
