import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";
import { PersonView, VIEW_TYPE_PERSONVIEW } from "src/views/PersonView";

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: "default",
};

export default class az_dnd extends Plugin {
	settings: MyPluginSettings;
	static ref: az_dnd;

	async onload() {
		await this.loadSettings();
		az_dnd.ref = this;

		this.registerView(VIEW_TYPE_PERSONVIEW, (leaf) => new PersonView(leaf));

		this.addRibbonIcon("dice", "Open Hello World View", () => {
			this.activateView(VIEW_TYPE_PERSONVIEW);
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
