import { TFile } from "obsidian";
import { CreatureUtils } from "./CreatureUtils"; // Adjust the path as necessary
import { dnd_base_page } from "./base/dnd_base_page";

export class dnd_manager extends dnd_base_page {
	creature: CreatureUtils;
	constructor(p: TFile | null = null) {
		super(p);
		this.creature = new CreatureUtils(this);
	}
}
