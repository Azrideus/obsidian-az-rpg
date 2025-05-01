import az_dnd from "main";
import { CachedMetadata, FrontMatterCache, TFile } from "obsidian";

export class dnd_page {
	page_ref: TFile | null = null;
	file_cache: CachedMetadata | null = null;
	frontmatter: FrontMatterCache | null = null;

	set(p: TFile | null) {
		this.page_ref = p;
		if (this.page_ref != null) {
			this.file_cache = az_dnd.ref.app.metadataCache.getFileCache(
				this.page_ref
			);
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
