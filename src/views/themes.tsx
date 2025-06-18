export type SheetTheme = {
	primaryColor: string;
	image: string;
	showTotals: boolean;
	manaUnit: string;
	stat: SymbolStyle;
	mana: SymbolStyle;
	hp: SymbolStyle;
	shield: SymbolStyle;
	willpower: SymbolStyle;
	damage: SymbolStyle;
	size_mana?: number;
};
export type SymbolStyle = {
	size?: string;
	spacing?: string;
	symbol?: string;
	color?: string;
};
export const themes: { [key: string]: SheetTheme } = {
	vampire: {
		showTotals: true,
		primaryColor: "crimson",
		manaUnit: "blood",
		stat: { size: "1em", symbol: "●", color: "crimson" },
		damage: { size: "0.7em", symbol: "⚔️", color: "crimson" },

		mana: { size: "1em", symbol: "●", color: "crimson" },
		hp: { size: "1em", symbol: "♡", color: "#a4c639" },
		shield: { size: "0.9em", symbol: "▢", color: "#00a4ef" },
		willpower: { size: "0.65em", symbol: "◇", color: "#f4b400" },
		image: "bg-vampire.png",
	},
	frost: {
		showTotals: true,
		primaryColor: "cyan",
		manaUnit: "heat",
		stat: { size: "1em", symbol: "●", color: "crimson" },
		damage: { size: "0.7em", symbol: "⚔️", color: "crimson" },

		mana: { size: "1em", symbol: "●", color: "crimson" },
		hp: { size: "1em", symbol: "♡", color: "#a4c639" },
		shield: { size: "0.9em", symbol: "▢", color: "#00a4ef" },
		willpower: { size: "0.65em", symbol: "◇", color: "#f4b400" },
		size_mana: 13,
		image: "bg-frost.jpg",
	},
	snowpiercer: {
		showTotals: true,
		primaryColor: "#d34836",
		manaUnit: "heat",
		stat: { size: "1em", symbol: "●", color: "crimson", spacing: "0.1pt" },
		damage: { size: "0.7em", symbol: "⚔️", color: "red" },
		mana: { size: "0.7em", symbol: "▽", color: "crimson" },
		hp: { size: "1em", symbol: "♡", color: "#a4c639" },
		shield: { size: "0.9em", symbol: "▢", color: "#00a4ef" },
		willpower: { size: "0.65em", symbol: "◇", color: "#f4b400" },
		image: "bg-snowpiercer.jpg",
	},
};
export type ThemeNameType = keyof typeof themes;
