import { DataviewApi } from "obsidian-dataview";
import { rpgBaseClass } from "../classes/base/rpgBaseClass";
import { rpgBaseExtendedComponent } from "src/views/base/rpgBaseExtendedComponent";
import { MarkdownRenderer } from "obsidian";

export class rpgFieldMaker {
	static markdownTable(headers: string[], rows: string[][]): string {
		const escape = (cell: string) => String(cell).replace(/\|/g, "\\|");

		const headerLine = "| " + headers.map(escape).join(" | ") + " |";
		const separatorLine =
			"| " + headers.map(() => "---").join(" | ") + " |";
		const rowLines = rows.map(
			(row) => "| " + row.map(escape).join(" | ") + " |"
		);

		return [headerLine, separatorLine, ...rowLines].join("\n");
	}
	static async render_statblock(
		cmp: rpgBaseExtendedComponent,
		key: string,
		stat_data: any
	) {
		if (!stat_data || key == null) return;
		const header = stat_data.header || key;
		cmp.containerEl.createEl("h2", {
			text: `${header}`,
		});

		const columns = stat_data.columns;
		const rows = [];
		const data = stat_data.data;

		for (const key in data) {
			const is_array = Array.isArray(data[key]);
			let row_values = is_array ? data[key] : [data[key]];

			row_values = row_values.map((v: any) =>
				String(v).includes("INPUT") ? `\`${v}\`` : v
			);
			while (row_values.length < columns.length - 1) row_values.push("");

			if (is_array) {
				rows.push(row_values);
			} else {
				rows.push([key, ...row_values]);
			}
		}
		const table_wrapper = cmp.containerEl.createEl("div", {
			attr: {
				class:
					stat_data.className || stat_data.class || "statblock-table",
			},
		});
		await cmp.dv.table(columns, rows, table_wrapper, cmp, cmp.fp);
		return 1;
	}

	static async markdown(
		cmp: rpgBaseExtendedComponent,
		content: string,
		forced_element?: HTMLElement
	) {
		await MarkdownRenderer.render(
			cmp.app,
			content,
			forced_element ?? (cmp.containerEl as any),
			cmp.fp,
			cmp
		);
	}
}
