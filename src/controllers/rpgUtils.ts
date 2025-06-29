import {
	App,
	Editor,
	Keymap,
	MarkdownView,
	TFile,
	WorkspaceLeaf,
	WorkspaceTabs,
} from "obsidian";
import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_IMG_SRC_TYPES } from "react";
import { SheetTheme, themes } from "src/views/themes";

export type RPG_FileType = "creature" | "item" | "none";
export type RPG_FileTypeObject = {
	[key in RPG_FileType]: string[];
};
export class rpgUtils {
	static getActiveEditor(app: App): Editor | null {
		const view = app.workspace.getActiveViewOfType(MarkdownView);
		return view ? view.editor : null;
	}
	static getAllLeaves(app: App): WorkspaceLeaf[] {
		const leaves: WorkspaceLeaf[] = [];
		app.workspace.iterateAllLeaves((leaf) => {
			leaves.push(leaf);
		});
		return leaves;
	}
	static getLeavesOfGroup(app: App, leaf: WorkspaceLeaf): WorkspaceLeaf[] {
		const searchGroup = (leaf as any).group;
		return this.getAllLeaves(app).filter((l) => {
			return (l as any).group == searchGroup;
		});
	}

	static getFileFromLeaf(leaf: WorkspaceLeaf): TFile | null {
		const view = leaf.view;

		if (view instanceof MarkdownView) {
			return view.file;
		}

		return null;
	}

	static getRelatdFile(app: App, leaf: WorkspaceLeaf): TFile | null {
		//TODO: We need a solution to open more than 1 Stat Sheet at Once!
		return app.workspace.getActiveFile();
		const leavesInSameGroup = this.getLeavesOfGroup(app, leaf).filter(
			(s) => s !== leaf
		);
		if (leavesInSameGroup.length === 0) {
		} else {
			const relatedFile = this.getFileFromLeaf(leavesInSameGroup[0]);
			return relatedFile;
		}
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
	static getFileRpgTheme(app: App, file: TFile | null): SheetTheme {
		if (!file) return themes["vampire"]; // default theme if no file is provided
		const tags = app.metadataCache.getFileCache(file)?.tags || [];
		for (let theme_key in themes) {
			if (tags.some((tag) => rpgUtils.str_eq(tag.tag, "#" + theme_key)))
				return themes[theme_key];
		}
		return themes["vampire"]; // default theme if no tag matches
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
			creature: ["#creature", "#npc", "#monster", "#player", "#unit"],
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

	/**
	 * SUM = a + ad + ad^2 + ad^3 + ... + ad^(n-1)
	 */
	static geometric_sum(n: number, a: number, d: number): number {
		if (n == 0) return 0;
		return (a * (1 - Math.pow(d, n))) / (1 - d);
	}

	/**
	 * SUM = a + (a+d) + (a + 2d) + ... + (a + (n-1)d)
	 */
	static numberic_sum(n: number, a: number, d: number): number {
		if (n == 0) return 0;
		return n * a + (d * ((n - 1) * n)) / 2;
	}
}
