import az_rpg from "main";
import {
	App,
	ItemView,
	MarkdownRenderer,
	TFile,
	WorkspaceLeaf,
} from "obsidian";
import { getAPI } from "obsidian-dataview";
import { DataviewApi } from "obsidian-dataview/lib/api/plugin-api";
import { RPG_FileType, rpgUtils } from "src/controllers/rpgUtils";
import { SheetTheme } from "../themes";

export class azrpg_view_base extends ItemView {
	readonly plugin: az_rpg;
	default_file: TFile | null = null;
	target_file: TFile;
	target_file_type: RPG_FileType;
	target_file_theme: SheetTheme;

	constructor(plugin: az_rpg, leaf: WorkspaceLeaf) {
		super(leaf);
		this.plugin = plugin;

		this.registerEvent(
			this.app.workspace.on("active-leaf-change", () =>
				this.reloadActiveFile()
			)
		);
	}

	reloadActiveFile() {
		const active_file = rpgUtils.getRelatdFile(this.app, this.leaf);
		if (active_file) {
			this.setTargetFile(active_file);
		}
	}
	getViewType(): string {
		return "";
	}

	getDisplayText(): string {
		return "";
	}
	getIcon(): string {
		return "scroll"; // or any valid Lucide icon name
	}

	get dv(): DataviewApi {
		return getAPI(this.app);
	}
	get fp(): string {
		return this.app.workspace.getActiveFile()?.path || "";
	}

	setTargetFile(target_file: TFile) {
		let isChanged = false;
		if (this.target_file !== target_file) {
			this.target_file = target_file;
			isChanged = true;
		}
		this.target_file_type = rpgUtils.getFileRpgType(
			this.app,
			this.target_file
		);
		this.target_file_theme = rpgUtils.getFileRpgTheme(
			this.app,
			this.target_file
		);
		return isChanged;
	}
}
