import { App } from "obsidian";

import SheetBackground from "./SheetBackground";

export default function CharacterTitle(props: { image_folder: string }) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				zIndex: 2,
			}}
		>
			<h3
				style={{
					paddingTop: 18,
					fontFamily: "Felipa",
					fontSize: 55,
					marginBottom: 2,
					borderBottom: "2px solid rgba(255, 255, 255, 0.5)",
				}}
			>
				Issac Rizzark
			</h3>
			<h4
				style={{
					margin: 1,
					fontFamily: "Felipa",
					fontSize: 30,
				}}
			>
				The Great Scientist
			</h4>
		</div>
	);
}
