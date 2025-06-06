import { App, TFile } from "obsidian";
import { rpgCreature } from "src/classes/rpgCreature";
import SheetBackground from "./SheetBackground";
import CharacterTitle from "./CharacterTitle";
import CharacterStats from "./CharacterStats";
export type SharedProps = {
	image_folder: string;
	creature: rpgCreature;
};
export default function CharacterSheet(props: SharedProps) {
	return (
		<div>
			<div className="w-[210mm] h-[297mm] relative">
				<SheetBackground {...props} />

				<div
					className="absolute inset-0 flex flex-col items-center"
					style={{ zIndex: 2 }}
				>
					<CharacterTitle {...props} />
					<CharacterStats {...props} />
				</div>
			</div>
			<div className="w-[210mm] h-[297mm] relative">
				<SheetBackground {...props} />
			</div>
		</div>
	);
}
