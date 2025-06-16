import { App, CachedMetadata, FrontMatterCache, TFile } from "obsidian";
import { DataviewApi, getAPI } from "obsidian-dataview";
import { rpgUtils } from "../../controllers/rpgUtils";
import { SheetTheme } from "src/views/sheets/CharacterSheet";

/**
 * Wrapper class for all classes in the azrpg project.
 */
export class rpgBaseClass {
	readonly app: App;
	readonly file: TFile | null = null;

	file_cache: CachedMetadata | null = null;
	frontmatter: FrontMatterCache | null = null;
	theme: SheetTheme | null = null;

	constructor(app: App, p: TFile | string | null) {
		this.app = app;
		if (typeof p === "string") {
			this.file = rpgUtils.getFileFromPath(app, p);
		} else {
			this.file = p;
		}
		this.refreshFileCache();
	}

	/* -------------------------------------------------------------------------- */
	/*                                   Getters                                  */
	/* -------------------------------------------------------------------------- */

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

	refreshFileCache(key: string = "", value: any = null) {
		if (key && this.frontmatter !== null) {
			/**
			 * update only the given key
			 */
			this.frontmatter[key] = value;
			return true;
		}
		this.theme = rpgUtils.getFileRpgTheme(this.app, this.file);
		/**
		 * update all
		 */
		if (this.file != null) {
			this.file_cache = this.app.metadataCache.getFileCache(this.file);
			this.frontmatter = this.file_cache?.frontmatter ?? null;
			return true;
		} else {
			this.file_cache = null;
			this.frontmatter = null;
			return false;
		}
	}

	get(key: string) {
		if (this.frontmatter == null || !(key in this.frontmatter)) return null;
		return this.frontmatter[key];
	}

	async set(key: string, value: any) {
		if (!this.file) {
			console.error("No active file.");
			return;
		}
		await this.app.fileManager.processFrontMatter(
			this.file,
			(frontmatter) => {
				frontmatter[key] = value;
			}
		);
		this.refreshFileCache(key, value);
		return value;
	}
}
