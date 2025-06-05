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
			className="absolute inset-0 az-masked-image "
			style={{
				maskImage: `url(${backgroundMask})`,
			}}
		>
			<div
				className="absolute az-masked-image inset-0 z-[1]"
				style={{
					maskImage: `url(${avatarMask})`,
				}}
			>
				{/* Avatar layer (optional content) */}
			</div>
			<div className="absolute  inset-0 az-masked-image z-0">
				<img
					src={backgroundImage}
					className="absolute inset-0 object-cover"
				/>
			</div>
		</div>
	);
}
