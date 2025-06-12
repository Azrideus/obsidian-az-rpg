import { SheetTheme } from "./sheets/CharacterSheet";

export const themes: { [key: string]: SheetTheme } = {
	vampire: {
		showTotals: true,
		primaryColor: "crimson",
		manaUnit: "blood",
		manaSymbol: "●",
		image: "bg-vampire.png",
	},
	frost: {
		showTotals: true,
		primaryColor: "cyan",
		manaUnit: "heat",
		manaSymbol: "▽",
		image: "bg-frost.jpg",
	},
	snowpiercer: {
		showTotals: true,
		primaryColor: "#d34836",
		manaUnit: "heat",
		manaSymbol: "▽",
		image: "bg-snowpiercer.jpg",
	},
};
export type ThemeNameType = keyof typeof themes;
