import { dnd_base_util } from "./base/dnd_base_util";

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

export class CreatureUtils extends dnd_base_util {
	get_items(slot_name = ""): any[] {
		const slot_keys = [];

		for (const key in this.manager.frontmatter) {
			if (key.startsWith("slot")) {
				if (slot_name == "") slot_keys.push(key);
				else if (key.includes(slot_name)) slot_keys.push(key);
			}
		}

		const unique_items: any = {};
		for (const key of slot_keys) {
			const slot_items = this.getArray(key);
			slot_items.map((r: any) => {
				if (!unique_items[r.path]) {
					unique_items[r.path] = {
						obj: r,
						path: r.path,
						name: r.name,
						count: 1,
					};
					// if (null != this.dv) {
					// 	// unique_items[r.path].page = this.dv.page(r.path);
					// }
				} else {
					unique_items[r.path].count++;
				}
			});
		}
		for (const key in unique_items) {
			const item_obj = unique_items[key];
			item_obj.total_size =
				Number(Number(item_obj.page.size) * item_obj.count) || 0;
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
			const used_points = this.get_stat_totals(false).base;
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
	 */
	get_stat_totals(use_auto = true) {
		const stat_keys = this.get_stat_keys();
		const stat_totals = { mod: 0, base: 0, auto_upgrade: 0, final: 0 };
		for (const stat of stat_keys) {
			const sum_keys = [`mod_${stat}`, stat, `auto_${stat}`];
			stat_totals["mod"] += this.getNum(sum_keys[0]);
			stat_totals["base"] += this.getNum(sum_keys[1]);
			stat_totals["auto_upgrade"] += this.getNum(sum_keys[2]);
		}

		if (use_auto) {
			const stats = this.get_stats();
			for (const s in stats) {
				stat_totals["final"] += stats[s as StatKey];
			}
		}

		return stat_totals;
	}

	get_level_up_details() {
		/**
		 * 1-5 =  Level*300  +3 point per level
		 * 6-10 =  Level*400   +4 point per level
		 * 11-15 = Level*500   +5 point per level
		 */
		const next_level = this.getNum("level") + 1;
		const next_level_tier = Math.ceil(next_level / 5);
		const pb_cost = next_level * (next_level_tier * 100 + 200);
		let points = 3;
		for (let i = 1; i < this.getNum("level"); i++) {
			points += 3 + Math.floor(this.getNum("level") / 5);
		}
		return {
			points: points,
			pb_cost: pb_cost,
			pb_current: this.getNum("pb"),
			progress: Math.round((this.getNum("pb") / pb_cost) * 100),
		};
	}
}
