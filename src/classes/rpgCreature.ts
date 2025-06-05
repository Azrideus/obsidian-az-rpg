import { rpgUtils } from "src/controllers/rpgUtils";
import { rpgBaseClass as rpgBaseClass } from "./base/rpgBaseClass";
import { rpgItem } from "./rpgItem";

const MAX_BONUS_COUNT = 5;
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
		"",
		"",
		"athletics",
		"",
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
export type StatCategoryType = (typeof STAT_CATEGORIES)[number];
export type StatKeyType = (typeof STAT_KEYS)[StatCategoryType][number];

type RawStatObject = {
	[key in StatKeyType]: number;
};
type CategorizedStatObject = {
	[key in StatCategoryType]: RawStatObject;
};
type StatObject = RawStatObject & CategorizedStatObject;
type StatArray = { [key in StatCategoryType]: StatKeyType[] };
type DetailsObjectType = {
	hp: number;
	mana: number;
	blood: number;
} & StatObject;

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
			for (const stat_key in STAT_KEYS[cat]) {
				const key = stat_key as StatKeyType;

				let stat_value = this.getNum(key, 0);
				if (add_bonus_and_flaw) {
					const stat_bonus = this.get_bonus_of(key);
					stat_value += stat_bonus;
				}

				result[cat][key] = stat_value;
				result[key] = stat_value;
			}
		}
		return result;
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
		const stats = this.get_stats();
		return {
			hp: 2 + stats.vitality,
			mana: 2 * stats.intelligence,
			blood: 2 * stats.intelligence + stats.vitality,
			...stats,
		};
	}

	is_player() {
		return this.getStr_lc("type") == "player";
	}
}
