import { App, TFile } from "obsidian";
import { rpgCreature } from "src/classes/rpgCreature";
import SheetBackground from "./SheetBackground";
import CharacterTitle from "./CharacterTitle";
import CharacterStats from "./CharacterStats";
import BigBlock from "./blocks/BigBlock";
import StatAdvantages from "./StatAdvantages";
import StatSpells from "./StatSpells";
import StatHPArea from "./StatHPArea";
import StatItems from "./StatItems";
import SmallBlock from "./blocks/SmallBlock";
import { SheetTheme } from "../themes";

export type SharedProps = {
	image_folder: string;
	creature: rpgCreature;
	theme: SheetTheme;
};
export default function CharacterSheet(props: SharedProps) {
	return (
		<div>
			<div className="w-[210mm] h-[297mm] relative">
				<SheetBackground {...props} />

				<div
					className="absolute inset-0 flex flex-col items-center px-[1.5cm]  gap-2"
					style={{ zIndex: 2 }}
				>
					<CharacterTitle {...props} />
					<CharacterStats {...props} />
					<BigBlock>
						<SmallBlock title="Items">
							<StatItems {...props} />
						</SmallBlock>
						<SmallBlock title="Magical Abilities">
							<StatSpells {...props} />
						</SmallBlock>
					</BigBlock>

					<BigBlock title="">
						<StatHPArea {...props} />
					</BigBlock>
				</div>
			</div>
			<div className="w-[210mm] h-[297mm] relative">
				<SheetBackground {...props} />
			</div>
		</div>
	);
}
