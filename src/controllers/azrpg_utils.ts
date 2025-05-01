import { App, Editor, MarkdownView, TFile } from "obsidian";
export class azrpg_utils {
	static getActiveEditor(app: App): Editor | null {
		const view = app.workspace.getActiveViewOfType(MarkdownView);
		return view ? view.editor : null;
	}
	static getActiveFile(app: App): TFile | null {
		return app.workspace.getActiveFile();
	}
}
