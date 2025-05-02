import { App, CachedMetadata, FrontMatterCache, TFile } from "obsidian";
import { DataviewApi, getAPI } from "obsidian-dataview";
import { rpgUtils } from "../../controllers/rpgUtils";

/**
 * Wrapper class for all classes in the azrpg project.
 */
export class rpgBaseClass {
	readonly app: App;
	readonly file: TFile | null = null;
	readonly file_cache: CachedMetadata | null = null;
	readonly frontmatter: FrontMatterCache | null = null;
	constructor(app: App, p: TFile | string) {
		this.app = app;
		if (typeof p === "string") {
			this.file = rpgUtils.getFileFromPath(app, p);
		} else {
			this.file = p;
		}
		if (this.file != null) {
			this.file_cache = app.metadataCache.getFileCache(this.file);
			this.frontmatter = this.file_cache?.frontmatter ?? null;
		} else {
			this.file_cache = null;
			this.frontmatter = null;
		}
	}

	/* -------------------------------------------------------------------------- */
	/*                                   Getters                                  */
	/* -------------------------------------------------------------------------- */
	get(key: string) {
		if (this.frontmatter == null || !(key in this.frontmatter)) return null;
		return this.frontmatter[key];
	}
	getStr_lc(key: string) {
		const value = String(this.get(key) || "");
		return value.toLowerCase();
	}
	getNum(key: string, def = 0) {
		return Number(this.get(key)) || def;
	}
	getArray(key: string) {
		return Array.isArray(this.get(key)) ? this.get(key) : [this.get(key)];
	}
}
