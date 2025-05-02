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
	static getFileRpgType(app: App, file: TFile): RPG_FileType {
		const tags = app.metadataCache.getFileCache(file)?.tags || [];
		const tag_mapping: RPG_FileTypeObject = {
			creature: ["#creature", "#npc", "#monster", "#player"],
			item: ["#item"],
			none: [],
		};
		let tag: RPG_FileType;
		for (tag in tag_mapping) {
			const tag_list = tag_mapping[tag];
			if (Array.isArray(tag_list)) {
				if (
					tag_list.some((t) =>
						tags.some(
							(tag) =>
								String(tag.tag).toLowerCase() ===
								String(t).toLowerCase()
						)
					)
				) {
					return tag;
				}
			}
		}
		return "none";
	}

	static hookMarkdownLinkMouseEventHandlers(
		app: App,
		containerEl: HTMLElement,
		sourcePath: string,
		filePath: string
	) {
		setTimeout(() => {
			console.log("hookMarkdownLinkMouseEventHandlers", containerEl);
			containerEl.querySelectorAll("a.internal-link").forEach((el) => {
				console.log("hookMarkdownLinkMouseEventHandlers", el);
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
