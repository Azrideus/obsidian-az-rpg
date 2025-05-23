import { rpgUtils } from "src/controllers/rpgUtils";
import { rpgBaseClass as rpgBaseClass } from "./base/rpgBaseClass";
import { rpgItem } from "./rpgItem";

type StatKey = "str" | "agi" | "vit" | "int" | "wis" | "cha" | "mem";
type StatList = {
	str: number;
	agi: number;
	vit: number;
	int: number;
	wis: number;
	cha: number;
	mem: number;
};

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

	get_stat_keys(): StatKey[] {
		return ["str", "agi", "vit", "int", "wis", "cha", "mem"];
	}
	/**
	 * Get the main stats of the creature
	 * will use AutoStats if possible
	 */
	get_stats(use_auto = true): StatList {
		if (true === use_auto) {
			/**
			 * get the stats of the creature by automatically calculating them
			 */
			const stat_keys = this.get_stat_keys();
			const auto_stat_keys = stat_keys.filter((r) => {
				return this.getNum("auto_" + r) > 0;
			});

			const total_points = this.get_level_up_details().points;
			const used_points = this.get_stat_totals(false).spent;
			let remaining_points = total_points - used_points;
			const result_stats = this.get_stats(false);

			if (auto_stat_keys.length > 0) {
				/**
				 * while we have points to assign,loop over the stats and assign them one by one
				 */
				while (remaining_points > 0) {
					for (const stat of auto_stat_keys) {
						const auto = this.getNum(`auto_${stat}`);
						const STAT_MOD = this.getNum(`mod_${stat}`, 1);

						const allocation_max = Math.min(auto, remaining_points);
						result_stats[stat] += STAT_MOD * allocation_max;
						remaining_points -= allocation_max;
						if (remaining_points <= 0) break;
					}
				}
			}

			return result_stats;
		} else {
			return {
				str: this.getNum("str") || 0,
				agi: this.getNum("agi") || this.getNum("dex") || 0,
				vit: this.getNum("vit") || this.getNum("con") || 0,
				int: this.getNum("int") || 0,
				wis: this.getNum("wis") || 0,
				cha: this.getNum("cha") || 0,
				mem: this.getNum("mem") || 0,
			};
		}
	}

	get_details() {
		const levelup_details = this.get_level_up_details();
		const stats = this.get_stats(true);
		return {
			level: this.getNum("level"),
			...stats,
			power: levelup_details.points,
			hp: stats.vit * 5 + 30,
			blood: stats.vit * 50 + stats.int * 100,
			ap:
				3 +
				Math.floor(stats.str / 10) +
				Math.floor(stats.int / 10) +
				Math.floor(stats.wis / 10) +
				Math.floor(stats.agi / 5),
			speed: 3 + Math.floor(stats.agi / 10),
		};
	}

	is_player() {
		return this.getStr_lc("type") == "player";
	}

	/* -------------------------------------------------------------------------- */
	/*                                    UTILS                                   */
	/* -------------------------------------------------------------------------- */

	/**
	 * get total points spent in stat category
	 * TODO totals based on Multiplier?
	 */
	get_stat_totals(use_auto = true) {
		const stat_keys = this.get_stat_keys();
		const stat_totals = { mod: 0, spent: 0, auto_upgrade: 0, final: 0 };
		for (const stat of stat_keys) {
			const sum_keys = [`mod_${stat}`, stat, `auto_${stat}`]; //Read Value from fields filled by user

			const mod = this.getNum(sum_keys[0]);
			const spent = this.getNum(sum_keys[1]);
			const auto_upgrade = this.getNum(sum_keys[2]);

			stat_totals["mod"] += mod;
			stat_totals["spent"] += spent;
			stat_totals["auto_upgrade"] += auto_upgrade;
			stat_totals["final"] += mod * spent;
		}

		// if (use_auto) {
		// 	const stats = this.get_stats();
		// 	for (const s in stats) {
		// 		stat_totals["final"] += stats[s as StatKey];
		// 	}
		// }

		return stat_totals;
	}

	/**
	 * 1-5 = 3
	 * 6-10 = 4
	 * 11-15 = 5
	 * @param level
	 * @returns
	 */
	get_level_tier(level: number) {
		let level_tier = 3;
		if (level >= 6) level_tier++;
		if (level >= 11) level_tier++;
		if (level >= 16) level_tier++;
		return level_tier;
	}
	get_level_up_details() {
		/**
		 * 1-5 =   Level*300   +3 point per level
		 * 6-10 =  Level*400   +4 point per level
		 * 11-15 = Level*500   +5 point per level
		 */
		const level = this.getNum("level");

		let points = 0;
		for (let i = 0; i <= level; i++) {
			const level_points = this.get_level_tier(i);
			points += level_points;
			// console.log("give points for level", i, level_points);
		}
		const pb_cost = (level + 1) * this.get_level_tier(level + 1) * 100;

		// console.log(
		// 	`Level: ${level}
		// 		Next Level: ${next_level}
		// 		Next Tier: ${next_level_tier}
		// 		points: ${points}
		// 		PB Cost: ${pb_cost}`
		// );
		return {
			points: points,
			pb_cost: pb_cost,
			pb_current: this.getNum("pb"),
			progress: Math.round((this.getNum("pb") / pb_cost) * 100),
		};
	}
}
