import { App, TFile } from "obsidian";
import { rpgBaseClass } from "./base/rpgBaseClass";
import { rpgUtils } from "src/controllers/rpgUtils";

/**
 * Base class for all creatures
 */
export class rpgItem extends rpgBaseClass {
	static readonly LAB_REPAIR_SPEED = 2;
	static readonly TIER_REPAIR_MOD = 0.5;

	item_count: number = 1;
	constructor(app: App, p: TFile | string | null) {
		super(app, p);
	}
	total_size() {
		return this.getNum("size") * this.item_count || 0;
	}
	static get_data_source() {
		return `optionQuery("${rpgUtils.getAppPathPrefix()}Items" or #item)`;
	}
}
