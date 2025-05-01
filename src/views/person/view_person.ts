import {
	App,
	Component,
	ItemView,
	MarkdownRenderer,
	WorkspaceLeaf,
} from "obsidian";

import { azrpg_component_base } from "../base/azrpg_component_base";

export class view_person extends azrpg_component_base {
	readonly c_utils: CreatureUtils;
	constructor(app: App) {
		super(app);
		this.c_utils = new CreatureUtils(app);
	}
	get_stat_columns(stat) {
		if (CreatureUtils.is_player()) {
			return [`mod_${stat}`, `${stat}`];
		} else {
			return [`mod_${stat}`, `${stat}`, `auto_${stat}`];
		}
	}
	get_stat_rows() {
		const stat_rows = {};
		const stats = CreatureUtils.get_stats(true);
		const stat_keys = CreatureUtils.get_stat_keys();
		const is_player = CreatureUtils.is_player();

		stat_keys.map((s) => {
			const fns = get_stat_columns(s);
			const row = fns.map((r) => `INPUT[number(placeholder(${r})):${r}]`);
			if (!is_player) {
				row.push(stats[s]); //auto row
			}
			stat_rows[s] = row;
		});

		return stat_rows;
	}
}
