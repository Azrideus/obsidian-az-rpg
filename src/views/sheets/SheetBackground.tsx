import { App } from "obsidian";

import { SharedProps } from "./CharacterSheet";
import * as React from "react";

export default function SheetBackground(props: SharedProps) {
	const backgroundImage = React.useMemo(() => {
		return `${props.image_folder}/${props.theme.image}`;
	}, [props.theme.image]);
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
			<div className="absolute inset-0 az-masked-image az-dimmed-overlay z-0 ">
				<img
					src={backgroundImage}
					className="absolute inset-0 object-cover"
				/>
			</div>
		</div>
	);
}
