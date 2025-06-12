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
import { ThemeNameType } from "../themes";
import { SheetTheme } from "../sheets/CharacterSheet";
export class azrpg_view_base extends ItemView {
	readonly plugin: az_rpg;
	target_file: TFile;
	target_file_type: RPG_FileType;
	target_file_theme: SheetTheme;

	constructor(plugin: az_rpg, leaf: WorkspaceLeaf) {
		super(leaf);
		this.plugin = plugin;
	}
	getViewType(): string {
		return "";
	}

	getDisplayText(): string {
		return "";
	}

	get dv(): DataviewApi {
		return getAPI(this.app);
	}
	get fp(): string {
		return this.app.workspace.getActiveFile()?.path || "";
	}

	setTargetFile(target_file: TFile) {
		if (this.target_file == target_file) return;
		this.target_file = target_file;
		this.target_file_type = rpgUtils.getFileRpgType(
			this.app,
			this.target_file
		);
		this.target_file_theme = rpgUtils.getFileRpgTheme(
			this.app,
			this.target_file
		);
	}
}
