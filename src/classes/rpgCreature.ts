import { rpgUtils } from "src/controllers/rpgUtils";
import { rpgBaseClass as rpgBaseClass } from "./base/rpgBaseClass";
import { rpgItem } from "./rpgItem";

type StatObject = { [key: string]: { [key: string]: number } };
type StatArray = { [key: string]: string[] };
/**
 * Base class for all creatures
 */
export class rpgCreature extends rpgBaseClass {
	get_items(slot_name = ""): rpgItem[] {
		const slot_keys = [];

		for (const key in this.frontmatter) {
			if (key.startsWith("slot")) {
				if (slot_name == "") slot_keys.push(key);
				else if (key.includes(slot_name)) slot_keys.push(key);
			}
		}

		const unique_items: { [key: string]: rpgItem } = {};
		for (const key of slot_keys) {
			const slot_items = this.getArray(key);
			slot_items.map((r: any) => {
				const item_file = rpgUtils.getFileFromPath(this.app, r);
				if (null == item_file) return;
				if (item_file.path in unique_items) {
					unique_items[item_file.path].item_count++;
				} else {
					unique_items[item_file.path] = new rpgItem(
						this.app,
						item_file
					);
				}
			});
		}

		return Object.values(unique_items);
	}

	get_attribute_keys(): StatArray {
		return {
			physical: ["str", "agi", "vit"],
			mental: ["int", "wis", "mem"],
			social: ["cha", "man"],
		};
	}
	get_abilitiy_keys(): StatArray {
		return {
			talents: [
				"awareness",
				"brawl",
				"",
				"",
				"athletics",
				"",
				"Intimidation",
				"Leadership",
				"Deception",
			],
			skills: [
				"Melee",
				"Firearms",
				"",
				"Etiquette",
				"Driving",
				"",
				"Crafting",
				"Animals",
				"Survival",
			],
			knowledges: [
				"Academics",
				"Technology",
				"",
				"Investigation",
				"",
				"",
				"Medical",
				"Occult",
				"Politics",
			],
		};
	}
	get_stat_keys(): StatArray {
		return {
			...this.get_attribute_keys(),
			...this.get_abilitiy_keys(),
		};
	}
	/**
	 * Get the main stats of the creature
	 * will use AutoStats if possible
	 */
	get_stats(): StatObject {
		const all_stats = this.get_stat_keys();
		const result: StatObject = {};
		for (const category in all_stats) {
			result[category] = {};
			for (const key in all_stats[category]) {
				result[category][key] = this.getNum(key);
			}
		}
		return result;

		// if (true === use_auto) {
		// 	/**
		// 	 * get the stats of the creature by automatically calculating them
		// 	 */
		// 	const stat_keys = this.get_attribute_keys();
		// 	const auto_stat_keys = stat_keys.filter((r) => {
		// 		return this.getNum("auto_" + r) > 0;
		// 	});bad

		// 	const total_points = this.get_level_up_details().points;
		// 	const used_points = this.get_stat_totals(false).spent;
		// 	let remaining_points = total_points - used_points;
		// 	const result_stats = this.get_stats(false);

		// 	if (auto_stat_keys.length > 0) {
		// 		/**
		// 		 * while we have points to assign,loop over the stats and assign them one by one
		// 		 */
		// 		while (remaining_points > 0) {
		// 			for (const stat of auto_stat_keys) {
		// 				const auto = this.getNum(`auto_${stat}`);
		// 				const STAT_MOD = this.getNum(`mod_${stat}`, 1);

		// 				const allocation_max = Math.min(auto, remaining_points);
		// 				result_stats[stat] += STAT_MOD * allocation_max;
		// 				remaining_points -= allocation_max;
		// 				if (remaining_points <= 0) break;
		// 			}
		// 		}
		// 	}

		// 	return result_stats;
		// } else {

		// }
	}

	get_details() {
		const stats = this.get_stats();
		return {
			level: this.getNum("level"),
			...stats,
		};
	}

	is_player() {
		return this.getStr_lc("type") == "player";
	}
}
