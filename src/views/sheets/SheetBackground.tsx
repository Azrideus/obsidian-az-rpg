import { App } from "obsidian";

import { SharedProps } from "./CharacterSheet";

export default function SheetBackground(props: SharedProps) {
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
			<div className="absolute  inset-0 az-masked-image az-dimmed-overlay z-0 ">
				<img
					src={backgroundImage}
					className="absolute inset-0 object-cover"
				/>
			</div>
		</div>
	);
}
