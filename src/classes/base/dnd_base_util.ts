import { dnd_manager } from "../dnd_manager";

export class dnd_base_util {
	readonly manager: dnd_manager;
	constructor(manager: dnd_manager) {
		this.manager = manager;
		this.get = this.manager.get;
	}

	/* -------------------------------------------------------------------------- */
	/*                                   Getters                                  */
	/* -------------------------------------------------------------------------- */
	get = (key: string) => this.manager.get(key);
	getStr_lc = (key: string) => this.manager.getStr_lc(key);
	getArray = (key: string) => this.manager.getArray(key);
	getNum = (key: string, def = 0) => this.manager.getNum(key, def);
}
