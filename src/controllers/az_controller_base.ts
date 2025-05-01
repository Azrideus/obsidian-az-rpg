import { DataviewApi } from "obsidian-dataview";

export class az_controller_base {
	static dv: DataviewApi | null = null;
	static init(dv: DataviewApi) {
		this.dv = dv;
	}
	static get_dv(): DataviewApi | null {
		return this.dv;
	}
}
