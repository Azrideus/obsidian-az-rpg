import { App, TFile } from "obsidian";
import { rpgBaseClass } from "./base/rpgBaseClass";
import { string_grab_number } from "@azrico/string.basic";

/**
 * Base class for all creatures
 */
export class rpgSpell extends rpgBaseClass {
	readonly spell_index: number = 1;
	cost: number;
	hp: number;
	shield: number;
	willpower: number;
	damage: number;

	constructor(app: App, p: TFile | string | null, spell_index: number) {
		super(app, p);
		this.spell_index = spell_index;
		this.refresh_spell_details();
	}
	refresh_spell_details() {
		this.cost = Number(
			string_grab_number(this.spell_name, [
				"[%]",
				"cost:%",
				"mana:%",
				"blood:%",
				"b:%",
			])
		);
		this.damage = string_grab_number(this.spell_name, [
			"d:%",
			/d(\d+)/,
			"damage:%",
			"dmg:%",
		]);
		this.hp = string_grab_number(this.spell_name, ["hp:%", /h(\d+)/]);
		this.shield = string_grab_number(this.spell_name, [
			"shield:%",
			"s:%",
			/s(\d+)/,
		]);
		this.willpower = string_grab_number(this.spell_name, [
			"willpower:%",
			"wp:%",
			"w:%",
			/w(\d+)/,
		]);
	}
	get spell_name() {
		return this.getStr_lc(this.spell_meta_name);
	}
	get spell_meta_name() {
		return `spell_${this.spell_index}`;
	}
}
