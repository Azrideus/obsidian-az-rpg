import { DataviewApi } from "obsidian-dataview";
import { rpgBaseClass } from "../classes/base/rpgBaseClass";
import { rpgBaseExtendedComponent } from "src/views/base/rpgBaseExtendedComponent";
import { MarkdownRenderer } from "obsidian";

export class rpgFieldMaker {
	static async render_statblock(
		cmp: rpgBaseExtendedComponent,
		header: string,
		stat_data: any
	) {
		if (!stat_data || header == null) return;

		cmp.containerEl.createEl("h2", {
			text: `${header}`,
		});

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
		const table_wrapper = cmp.containerEl.createEl("div");
		await cmp.dv.table(columns, rows, table_wrapper, cmp, cmp.fp);
		return 1;
	}

	static async markdown(cmp: rpgBaseExtendedComponent, content: string) {
		await MarkdownRenderer.render(
			cmp.app,
			content,
			cmp.containerEl as any,
			cmp.fp,
			cmp
		);
	}
}
