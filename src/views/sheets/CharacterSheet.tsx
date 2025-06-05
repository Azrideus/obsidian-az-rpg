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
		<div className="w-[210mm] h-[297mm] relative">
			<SheetBackground {...props} />

			<div
				className="absolute inset-0 az-character-sheet-body"
				style={{ zIndex: 2 }}
			>
				<CharacterTitle {...props} />
			</div>
		</div>
	);
}
