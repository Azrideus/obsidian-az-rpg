import { ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE_PERSONVIEW = "DnDPersonView";

export class PersonView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType(): string {
		return VIEW_TYPE_PERSONVIEW;
	}

	getDisplayText(): string {
		return "Hello World";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		container.createEl("h2", { text: "Hello World from your plugin!" });
	}

	async onClose() {
		// Cleanup if needed
	}
}
