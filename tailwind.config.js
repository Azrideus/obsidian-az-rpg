/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/functions/*.{js,ts,jsx,tsx,mdx}",
		"./src/data/config.json",
	],
	theme: {
		fontFamily: {},
		fontSize: {
			base: "1rem",
			sm: "8pt",
			md: "9pt",
			lg: "10pt",
			xl: "13pt",
			"2xl": "15pt",
		},
		extend: {},
	},
};
