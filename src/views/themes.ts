import { SheetTheme } from "./sheets/CharacterSheet";

export const themes: { [key: string]: SheetTheme } = {
	vampire: { showTotals: true, primaryColor: "crimson", useBlood: true },
	frost: { showTotals: true, primaryColor: "cyan", useBlood: false },
};
