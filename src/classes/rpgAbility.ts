import { App, TFile } from "obsidian";
import { rpgBaseClass } from "./base/rpgBaseClass";
import { rpgUtils } from "src/controllers/rpgUtils";

/**
 * Base class for all creatures
 */
export class rpgAbility extends rpgBaseClass {
	ability_cost: number = 1;
	constructor(app: App, p: TFile | string) {
		super(app, p);
	}
}
