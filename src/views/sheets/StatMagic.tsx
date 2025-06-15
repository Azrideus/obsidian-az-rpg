import { App } from "obsidian";
import { SharedProps } from "./CharacterSheet";
import LinkedField from "../shared/LinkedField";
import DotView from "../shared/DotView";
import LinkedDotView from "../shared/LinkedDotView";
import { rpgSpell } from "src/classes/rpgSpell";

export default function StatMagic(props: SharedProps) {
	const magic_list = [];
	for (let index = 0; index < 5; index++) {
		magic_list.push(
			<MagicLine
				index={index}
				spell={props.creature.spells[i]}
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
				value={props.spell.ability_cost}
				max={props.spell.ability_cost}
				hidden={false}
				dotSymbol="▽"
				dotSize={10}
			/>
		</div>
	);
}
