import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	WorkspaceLeaf,
} from "obsidian";
import { azrpg_view_stat, VIEW_TYPE_STAT } from "src/views/azrpg_view_stat";

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: "default",
};

export default class az_rpg extends Plugin {
	settings: MyPluginSettings;
	static ref: az_rpg;

	async onload() {
		await this.loadSettings();
		az_rpg.ref = this;

		this.registerView(VIEW_TYPE_STAT, (leaf) => new azrpg_view_stat(leaf));

		this.addRibbonIcon("dice", "Open Hello World View", () => {
			this.activateView(VIEW_TYPE_STAT);
		});
	}

	async activateView(view_name: string) {
		const { workspace } = this.app;
		const leaves = workspace.getLeavesOfType(view_name);
		if (leaves.length === 0) {
			await workspace.getRightLeaf(false)?.setViewState({
				type: view_name,
				active: true,
			});
		}
		workspace.revealLeaf(workspace.getLeavesOfType(view_name)[0]);
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
