import { App } from "obsidian";
import { rpgBaseExtendedComponent } from "../base/rpgBaseExtendedComponent";
import { rpgFieldMaker } from "src/controllers/rpgFieldMaker";
import { rpgCreature } from "src/classes/rpgCreature";
import { rpgUtils } from "src/controllers/rpgUtils";
import { rpgItem } from "src/classes/rpgItem";

export default function SheetBackground(props: { image_folder: string }) {
	const backgroundImage = `${props.image_folder}/bg-vampire.png`;
	const backgroundMask = `${props.image_folder}/bg-mask.png`;
	const avatarMask = `${props.image_folder}/avatar-mask.png`;
	return (
		<div
			className="az-masked-image"
			style={{
				maskImage: `url(${backgroundMask})`,
				position: "absolute",
				inset: 0,
			}}
		>
			<div
				className="az-masked-image"
				style={{
					zIndex: 1,
					maskImage: `url(${avatarMask})`,
					position: "absolute",
					inset: 0,
				}}
			>
				{/* <img src="https://www.w3schools.com/css/paris.jpg"></img> */}
			</div>
			<div
				className="dimmed-bg"
				style={{
					zIndex: 0,
					position: "absolute",
					inset: 0,
				}}
			>
				<img
					src={backgroundImage}
					style={{
						width: "unset",
						objectFit: "cover",
					}}
				></img>
			</div>
		</div>
	);
}
