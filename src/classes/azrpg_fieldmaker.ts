import { DataviewApi } from "obsidian-dataview";
import { azrpg_base_class } from "./base/azrpg_base_class";

class azrpg_fieldmaker extends azrpg_base_class {
	render_statblock(header: string, stat_data: any) {
		if (!stat_data || header == null) return;
		this.get_dv().header(2, header);
		const columns = stat_data.columns;
		const rows = [];
		const data = stat_data.data;
		for (const key in data) {
			let row_values = Array.isArray(data[key]) ? data[key] : [data[key]];
			row_values = row_values.map((v: any) =>
				String(v).includes("INPUT") ? `\`${v}\`` : v
			);
			while (row_values.length < columns.length - 1) row_values.push("");
			rows.push([key, ...row_values]);
		}
		return this.get_dv().table(columns, rows);
	}
}
