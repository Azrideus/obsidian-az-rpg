import { rpgUtils } from "src/controllers/rpgUtils";
import { rpgBaseClass as rpgBaseClass } from "./base/rpgBaseClass";
import { rpgItem } from "./rpgItem";

export const MAX_BONUS_COUNT = 4;
export const CLASS_CATEGORIES = [
	"enhancer",
	"emission",
	"transmutation",
	"manipulator",
	"conjuration",
	"special",
] as const;
export const STAT_CATEGORIES = [
	"physical",
	"social",
	"mental",
	"talents",
	"skills",
	"knowledges",
] as const;

export const STAT_KEYS = {
	physical: ["strength", "agility", "vitality"],
	social: ["charisma", "manipulation"],
	mental: ["intelligence", "wisdom", "memory"],
	talents: [
		"awareness",
		"brawl",
		"__1",
		"athletics",
		"__2",
		"__3",
		"intimidation",
		"leadership",
		"deception",
	],
	skills: [
		"melee",
		"firearms",
		"",
		"etiquette",
		"driving",
		"stealth",
		"",
		"crafting",
		"animals",
		"survival",
	],
	knowledges: [
		"academics",
		"technology",
		"",
		"investigation",
		"",
		"",
		"medical",
		"occult",
		"law",
	],
} as const;

const STAT_TO_CATEGORY_MAP = Object.entries(STAT_KEYS).reduce(
	(map, [category, keys]) => {
		keys.forEach((key) => {
			if (key) map[key as any] = category as keyof typeof STAT_KEYS;
		});
		return map;
	},
	{} as Record<string, keyof typeof STAT_KEYS>
);
/* -------------------------------------------------------------------------- */
export type StatCategoryType = (typeof STAT_CATEGORIES)[number];
export type StatKeyType = (typeof STAT_KEYS)[StatCategoryType][number];

export type RawStatObject = {
	[key in StatKeyType]: number;
};
export type CategorizedStatObject = {
	[key in StatCategoryType]: RawStatObject;
};
export type StatObject = RawStatObject & CategorizedStatObject;
type StatArray = { [key in StatCategoryType]: StatKeyType[] };
type DetailsObjectType = {
	hp: number;
	mana: number;
	blood: number;
} & StatObject;
/* -------------------------------------------------------------------------- */
export const CATEGORY_INFO: {
	[key in StatCategoryType]: { minimun: number; cost: number };
} = {
	physical: { minimun: 1, cost: 5 },
	social: { minimun: 1, cost: 5 },
	mental: { minimun: 1, cost: 5 },
	talents: { minimun: 0, cost: 3 },
	skills: { minimun: 0, cost: 3 },
	knowledges: { minimun: 0, cost: 3 },
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

	/**
	 * Get the main stats of the creature
	 * will use AutoStats if possible
	 */
	get_stats(add_bonus_and_flaw = false): StatObject {
		const result: StatObject = {} as any;

		for (const category in STAT_KEYS) {
			const cat = category as StatCategoryType;
			result[cat] = {} as any;
			for (const stat_key of STAT_KEYS[cat]) {
				const key = stat_key as StatKeyType;
				let stat_value = this.get_stat(key, add_bonus_and_flaw);
				result[cat][key] = stat_value;
				result[key] = stat_value;
			}
		}
		return result;
	}
	/**
	 * get value of a single stat
	 */
	get_stat(stat_key: StatKeyType, add_bonus_and_flaw = false): number {
		let stat_value = Math.max(
			this.get_minimun_of_stat(stat_key),
			this.getNum("stat_" + stat_key, 0)
		);
		if (add_bonus_and_flaw) {
			const stat_bonus = this.get_bonus_of(stat_key);
			stat_value += stat_bonus;
		}
		return stat_value;
	}
	get_category_of_stat(stat_key: StatKeyType): string {
		return STAT_TO_CATEGORY_MAP[stat_key]; // Default to physical if not found
	}
	get_minimun_of_stat(stat_key: StatKeyType): number {
		const cat = this.get_category_of_stat(stat_key) as StatCategoryType;
		if (cat in CATEGORY_INFO) {
			return Number(CATEGORY_INFO[cat].minimun ?? 0);
		}
		return 0;
	}

	get_stat_sum(stat_keys: StatKeyType[], add_bonus_and_flaw = false): number {
		let sum = 0;
		stat_keys.forEach((s) => {
			sum += this.get_stat(s, add_bonus_and_flaw);
		});
		return sum;
	}

	async set_stat(stat_key: StatKeyType, value: number) {
		await this.set("stat_" + stat_key, value);
		const result_value = this.get_stat(stat_key, false);
		return result_value;
	}

	get_bonus_of(stat_key: StatKeyType): number {
		for (let i = 0; i < MAX_BONUS_COUNT; i++) {
			const bonus_key = this.get(`bonus_key_${i}`);
			const bonus_value = this.getNum(`bonus_value_${i}`, 0);
			if (bonus_key == stat_key) {
				return bonus_value;
			}
		}
		return 0;
	}

	get_details(): DetailsObjectType {
		const stats = this.get_stats(true);
		return {
			hp: 4 + 2 * stats.vitality,
			mana: 2 * stats.intelligence,
			blood: 2 * stats.intelligence + stats.vitality,
			...stats,
		};
	}
	get_xp() {
		const stats = this.get_stats();
		let sum = 0;
		// XP is based on purchased stats
		for (const key in stats) {
			const stat_value = stats[key as keyof StatObject];
			if (Array.isArray(stat_value)) continue; // Skip arrays
			if (typeof stat_value !== "number") continue; // Skip non-numeric values
			const cat = this.get_category_of_stat(key as StatKeyType);
			const cat_info = CATEGORY_INFO[cat as StatCategoryType];
			if (!cat_info) continue; // Skip if no category info
			const stat_minum = cat_info.minimun ?? 0;
			const cost = cat_info.cost ?? 0;
			/**
			 * 5 + 10 + 15...
			 * 5 * (n)
			 */
			sum += rpgUtils.numberic_sum(stat_value, cost, cost);
			sum -= rpgUtils.numberic_sum(stat_minum, cost, cost);
		}
		return sum;
	}

	is_player() {
		return this.getStr_lc("type") == "player";
	}
}
