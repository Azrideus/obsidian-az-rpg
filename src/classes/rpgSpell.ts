import { App, TFile } from "obsidian";
import { rpgBaseClass } from "./base/rpgBaseClass";
import { rpgUtils } from "src/controllers/rpgUtils";

/**
 * Base class for all creatures
 */
export class rpgSpell extends rpgBaseClass {
	readonly spell_index: number = 1;
	spell_cost: number;
	spell_hp: number;
	spell_shield: number;
	spell_willpower: number;

	constructor(app: App, p: TFile | string | null, spell_index: number) {
		super(app, p);
		this.spell_index = spell_index;
		this.refresh_spell_details();
	}
	refresh_spell_details() {
		this.spell_cost = Number(
			String(this.spell_name.match(/\[\d\]/i)?.[0] || "0").replace(
				/\[|\]/g,
				""
			)
		);
	}
	get spell_name() {
		return this.getStr_lc(this.spell_meta_name);
	}
	get spell_meta_name() {
		return `spell_${this.spell_index}`;
	}
}
