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
import { rpgUtils } from "src/controllers/rpgUtils";
import {
	azrpg_view_stat,
	VIEW_TYPE_STAT,
} from "src/views/base/azrpg_view_stat";

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: "default",
};

export default class az_rpg extends Plugin {
	settings: MyPluginSettings;
	image_folder: string;
	static ref: az_rpg;

	async onload() {
		await this.loadSettings();
		await this.registerImages();
		az_rpg.ref = this;

		this.registerView(
			VIEW_TYPE_STAT,
			(leaf) => new azrpg_view_stat(this, leaf)
		);

		this.addRibbonIcon("scroll", "AZ-RPG", () => {
			this.openRpgView(VIEW_TYPE_STAT);
		});

		this.registerMarkdownCodeBlockProcessor(
			"azdnd",
			async (source, el, ctx) => {
				// source = contents inside the code block
				// el = HTML element to render into
				// ctx = MarkdownPostProcessorContext

				// Example: render a styled custom component
				const container = el.createDiv({ cls: "myplugin-block" });
				container.setText(`Hello from MyPlugin!\nContent:\n${source}`);
			}
		);
	}

	async openRpgView(view_name: string) {
		const { workspace } = this.app;
		// const leaves = workspace.getLeavesOfType(view_name);
		// Get current right leaf
		const rightLeaf = workspace.getRightLeaf(false);

		if (rightLeaf) {
			await rightLeaf.setViewState({
				type: view_name,
				active: true,
			});
			workspace.revealLeaf(rightLeaf);
		}
	}

	onunload() {}

	async registerImages() {
		this.image_folder = this.app.vault.adapter.getResourcePath(
			`${this.manifest.dir}/src/images`
		);
		this.image_folder = this.image_folder.split("?")[0]; // Remove query params if any
	}
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
