import { App, Editor, Keymap, MarkdownView, TFile } from "obsidian";

export type RPG_FileType = "creature" | "item" | "none";
export type RPG_FileTypeObject = {
	[key in RPG_FileType]: string[];
};
export class rpgUtils {
	static getActiveEditor(app: App): Editor | null {
		const view = app.workspace.getActiveViewOfType(MarkdownView);
		return view ? view.editor : null;
	}
	static getActiveFile(app: App): TFile | null {
		return app.workspace.getActiveFile();
	}
	static getAppPathPrefix(): string {
		return "DND/DnD - Red Mask/";
	}
	static getAppImagesPathPrefix(): string {
		return `${rpgUtils.getAppPathPrefix()}1.1 - Images`;
	}
	static getFileFromPath(app: App, path: string): TFile | null {
		if (path.startsWith("[")) {
			/**
			 * need to resolve the link
			 */
			const inner = path.slice(2, -2); // remove [[ and ]]
			const [linkPath] = inner.split("|");

			// Step 2: Resolve the link to a TFile
			const tfile = app.metadataCache.getFirstLinkpathDest(
				linkPath,
				rpgUtils.getActiveFile(app)?.path || ""
			);
			return tfile;
		}
		const file = app.vault.getAbstractFileByPath(path);
		if (file instanceof TFile) {
			return file;
		}
		return null;
	}
	/**
	 * get the active file and check if its #item or #creature
	 */
	static getFileRpgType(
		app: App,
		file: TFile,
		use_folder = true
	): RPG_FileType {
		const tags = app.metadataCache.getFileCache(file)?.tags || [];

		//TODO FIX
		const tag_mappings: RPG_FileTypeObject = {
			creature: ["#creature", "#npc", "#monster", "#player"],
			item: ["#item", "items"],
			none: [],
		};
		const folder_mappings: RPG_FileTypeObject = {
			creature: [
				"creature",
				"npc",
				"monster",
				"player",
				"creatures",
				"npcs",
				"monsters",
				"players",
			],
			item: ["item", "items"],
			none: [],
		};

		let mapping_key: RPG_FileType;
		for (mapping_key in tag_mappings) {
			const mapping_list = tag_mappings[mapping_key];
			if (!Array.isArray(mapping_list)) continue;
			if (
				mapping_list.some((mapping) =>
					tags.some((tag) => rpgUtils.str_eq(tag.tag, mapping))
				)
			)
				return mapping_key;
		}

		const file_path = file.parent?.path || "";

		if (use_folder && file_path !== "") {
			const file_parts = file_path.split("/");
			console.log(file_parts);
			/* -------------------------- get type from folder -------------------------- */
			for (mapping_key in folder_mappings) {
				const mapping_list = folder_mappings[mapping_key];
				if (!Array.isArray(mapping_list)) continue;
				if (
					mapping_list.some((mapping) =>
						file_parts.some((part) =>
							rpgUtils.str_eq(part, mapping)
						)
					)
				)
					return mapping_key;
			}
		}

		return "none";
	}
	static str_eq(a: any, b: any) {
		return String(a).toLowerCase() === String(b).toLowerCase();
	}
	static hookMarkdownLinkMouseEventHandlers(
		app: App,
		containerEl: HTMLElement,
		sourcePath: string,
		filePath: string
	) {
		setTimeout(() => {
			containerEl.querySelectorAll("a.internal-link").forEach((el) => {
				el.addEventListener("click", (evt: MouseEvent) => {
					evt.preventDefault();
					const linktext = el.getAttribute("href");
					if (linktext) {
						app.workspace.openLinkText(
							linktext,
							sourcePath,
							Keymap.isModEvent(evt)
						);
					}
				});

				el.addEventListener("mouseover", (event: MouseEvent) => {
					event.preventDefault();
					const linktext = el.getAttribute("href");
					if (linktext) {
						app.workspace.trigger("hover-link", {
							event,
							source: "preview",
							hoverParent: { hoverPopover: null },
							targetEl: event.currentTarget,
							linktext: linktext,
							sourcePath: filePath,
						});
					}
				});
			});
		}, 10);
	}
}
