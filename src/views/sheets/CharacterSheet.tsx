import { App } from "obsidian";
import { rpgBaseExtendedComponent } from "../base/rpgBaseExtendedComponent";
import { rpgFieldMaker } from "src/controllers/rpgFieldMaker";
import { rpgCreature } from "src/classes/rpgCreature";
import { rpgUtils } from "src/controllers/rpgUtils";
import { rpgItem } from "src/classes/rpgItem";
import Portrait from "./Portrait";
import SheetBackground from "./SheetBackground";
import CharacterTitle from "./CharacterTitle";

export default function CharacterSheet(props: { image_folder: string }) {
	return (
		<div className="az-character-sheet">
			<SheetBackground {...props} />

			<div
				className="az-absfiller az-character-sheet-body"
				style={{ zIndex: 2 }}
			>
				<CharacterTitle {...props} />
			</div>
		</div>
	);
}
