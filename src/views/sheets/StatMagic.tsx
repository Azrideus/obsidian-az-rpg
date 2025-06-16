import { App } from "obsidian";
import { SharedProps } from "./CharacterSheet";
import LinkedField from "../shared/LinkedField";
import DotView from "../shared/DotView";
import LinkedDotView from "../shared/LinkedDotView";
import { rpgSpell } from "src/classes/rpgSpell";
import { MAX_COUNT_SPELL } from "src/classes/rpgCreature";

export default function StatMagic(props: SharedProps) {
	const magic_list = [];
	for (let index = 0; index < MAX_COUNT_SPELL; index++) {
		magic_list.push(
			<MagicLine
				index={index}
				spell={props.creature.spells[index]}
				{...props}
				key={index}
			/>
		);
	}
	return <div className="flex flex-col w-full ">{magic_list}</div>;
}
function MagicLine(props: SharedProps & { index: number; spell: rpgSpell }) {
	return (
		<div className="flex flex-row justify-center items-center az-bottom-dashed opacity-80">
			<LinkedField
				target={props.creature}
				type="text"
				field_name={`spell_${props.index}`}
				className="flex-1 !pt-0 !border-none !bg-transparent"
			/>
			<DotView
				{...props}
				target={props.creature}
				value={props.spell.spell_cost}
				max={props.spell.spell_cost}
				hidden={false}
				dotSymbol={props.theme.manaSymbol}
				dotSize={props.theme.manaSize}
			/>
		</div>
	);
}
