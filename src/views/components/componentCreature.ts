import { App } from "obsidian";
import { rpgBaseExtendedComponent } from "../base/rpgBaseExtendedComponent";
import { rpgFieldMaker } from "src/controllers/rpgFieldMaker";
import { rpgCreature } from "src/classes/rpgCreature";
import { rpgUtils } from "src/controllers/rpgUtils";
import { rpgItem } from "src/classes/rpgItem";
import { componentRepairTable } from "./componentRepairTable";

export const VIEW_TYPE_STAT = "rpg_view";

export class componentCreature extends rpgBaseExtendedComponent {
	readonly creature: rpgCreature;
	item_repair_table: componentRepairTable;
	constructor(app: App, container: HTMLElement, creature: rpgCreature) {
		super(app, container);
		this.creature = creature;
	}
	get_stat_columns(stat: string) {
		if (this.creature.is_player()) {
			return [`mod_${stat}`, `${stat}`];
		} else {
			return [`mod_${stat}`, `${stat}`, `auto_${stat}`];
		}
	}
	get_stat_rows() {
		const stat_rows: any = {};
		const stats = this.creature.get_stats(true);
		const stat_keys = this.creature.get_stat_keys();
		const is_player = this.creature.is_player();

		stat_keys.map((s) => {
			const fns = this.get_stat_columns(s);
			const row = fns.map((r) => `INPUT[number(placeholder(${r})):${r}]`);
			if (!is_player) {
				row.push(String(stats[s])); //auto row
			}
			stat_rows[s] = row;
		});

		return stat_rows;
	}
	get_stat_sum_row() {
		const stat_totals = this.creature.get_stat_totals();
		const levelup_details = this.creature.get_level_up_details();
		const sum_row = [
			stat_totals["mod"],
			stat_totals["spent"] + "/" + levelup_details.points,
		];

		if (!this.creature.is_player()) {
			sum_row.push(stat_totals["auto_upgrade"]);
			sum_row.push(stat_totals["final"]);
		}
		return sum_row.map((r) => `<center><b>${r}</b></center>`);
	}
	async onload() {
		await this.statblock_area();
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
		/* -------------------------------------------------------------------------- */
		/*                                Proficencies                                */
		/* -------------------------------------------------------------------------- */
		const prof_data = {
			Proficencies: {
				columns: ["Proficencies", "Level", ""],
				data: {
					// Strength
					Athletics: "INPUT[number:Athletics]",

					// Dexterity
					Acrobatics: "INPUT[number:Acrobatics]",
					Sleight_Of_Hand: "INPUT[number:Sleight_Of_Hand]",
					Stealth: "INPUT[number:Stealth]",

					// Intelligence
					Arcana: "INPUT[number:Arcana]",
					History: "INPUT[number:History]",
					Investigation: "INPUT[number:Investigation]",
					Nature: "INPUT[number:Nature]",
					Religion: "INPUT[number:Religion]",

					// Wisdom
					Animals: "INPUT[number:Animals]",
					Insight: "INPUT[number:Insight]",
					Medicine: "INPUT[number:Medicine]",
					Perception: "INPUT[number:Perception]",
					Survival: "INPUT[number:Survival]",
					Driving: "INPUT[number:Driving]",
					Guns: "INPUT[number:Guns]",

					// Charisma
					Deception: "INPUT[number:Deception]",
					Intimidation: "INPUT[number:Intimidation]",
					Performance: "INPUT[number:Performance]",
					Persuasion: "INPUT[number:Persuasion]",
				},
			},
		};
		for (const s in prof_data) {
			await rpgFieldMaker.render_statblock(
				this,
				s,
				(prof_data as any)[s]
			);
		}

		rpgUtils.hookMarkdownLinkMouseEventHandlers(
			this.app,
			this.containerEl,
			this.fp,
			this.fp
		);
	}

	async statblock_area() {
		/* -------------------------------------------------------------------------- */
		/*                                  StatBlock                                 */
		/* -------------------------------------------------------------------------- */
		const details = this.creature.get_details();
		const stats = Object.values(this.creature.get_stats(true)).map(
			(r) =>
				/**
				 * DND 5e Stats start at 10
				 */
				//Number(r) + 10
				r
		);
		const key_details = [
			details.level,
			details.hp,
			details.blood,
			details.speed,
			details.ap,
			details.power,
		];

		const data = {
			layout: "Vampire",
			...details,
			key_details: Object.values(key_details),
			image: this.creature.get("image"),
			name: this.fn,
			stats: stats,
		};
		let data_str = "";
		for (const key in data) {
			let value_str = (data as any)[key];
			if (Array.isArray(value_str)) {
				value_str = "[" + "" + value_str.join(", ") + "]";
			} else value_str = String(value_str);

			data_str += `${key}: ${value_str}\n`;
		}
		await rpgFieldMaker.markdown(this, `~~~statblock\n${data_str}\n~~~`);
	}
	async stat_area() {
		const levelup_details = this.creature.get_level_up_details();
		const type_selector = `INPUT[inlineSelect(
						option(npc, NPC),
						option(player, Player)
					):type]`;
		const clan_selector = `INPUT[inlineSelect(
						option(#y, Y),
						option(#x, X)
					):clan]`;
		const is_player = this.creature.is_player();
		const stat_cols = [];
		if (is_player) {
			stat_cols.push(
				...["Stat", "Multiplier X", "Spent Points", "Final Value"]
			);
		} else {
			stat_cols.push(
				...[
					"Stat",
					"Multiplier X",
					"Spent Points",
					"Auto Upgrade",
					"Final Value",
				]
			);
		}
		//TODO auto Upgrade column fix
		let stat_rows = this.get_stat_rows();
		stat_rows["Sum"] = this.get_stat_sum_row();

		const info_data = {
			Information: {
				columns: ["Field", "Value", ""],
				data: {
					Nickname: ["INPUT[text:nickname]", type_selector],
					Image: [
						`INPUT[imageSuggester(optionQuery("${rpgUtils.getAppPathPrefix()}Images")):image]`,
						clan_selector,
					],
					Level: [
						"INPUT[number:level]",
						`Points: ${levelup_details.points}`,
					],
					Pureblood: [
						"INPUT[number:pb]",
						`${levelup_details.pb_current}/${levelup_details.pb_cost}`,
					],
				},
			},
			Stats: {
				header: `Stats (${levelup_details.points})`,
				columns: stat_cols,
				data: stat_rows,
			},
		};
		const stat_data = {
			Classes: {
				columns: ["Class", "Level", ""],
				data: {
					Enhancer: "INPUT[number:Enhancer]",
					Emission: "INPUT[number:Emission]",
					Transmutation: "INPUT[number:Transmutation]",
					Manipulator: "INPUT[number:Manipulator]",
					Conjuration: "INPUT[number:Conjuration]",
					Special: "INPUT[number:Special]",
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
		/* ---------------------------- level up progress --------------------------- */

		for (const header in stat_data) {
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
