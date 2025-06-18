import { App } from "obsidian";
import { SharedProps } from "./CharacterSheet";
import LinkedField from "../shared/LinkedField";
import DotView from "../shared/DotView";
import LinkedDotView from "../shared/LinkedDotView";
import { rpgSpell } from "src/classes/rpgSpell";
import { MAX_COUNT_SPELL } from "src/classes/rpgCreature";

export default function StatSpells(props: SharedProps) {
	const magic_list = [];
	for (let index = 0; index < MAX_COUNT_SPELL; index++) {
		magic_list.push(
			<SpellLine
				index={index}
				spell={props.creature.spells[index]}
				{...props}
				key={index}
			/>
		);
	}
	return <div className="flex flex-col w-full ">{magic_list}</div>;
}
function SpellLine(props: SharedProps & { index: number; spell: rpgSpell }) {
	const spell = props.spell;
	return (
		<div className="flex flex-row justify-center items-center az-bottom-dashed opacity-80">
			<LinkedField
				target={props.creature}
				type="text"
				field_name={`spell_${props.index}`}
				className="flex-1 !pt-0 !border-none !bg-transparent"
			/>
			<div className="flex flex-row gap-1 text-[16pt]">
				<DotView
					{...props}
					target={props.creature}
					colored_label
					label={spell.damage > 0 ? " " : " "}
					className="!gap-0"
					value={spell.damage}
					max={spell.damage}
					style={props.theme.damage}
				/>
				<DotView
					{...props}
					colored_label
					label={spell.shield > 0 ? "+" : "-"}
					className="!gap-0"
					target={props.creature}
					value={spell.shield}
					max={spell.shield}
					style={props.theme.shield}
				/>
				<DotView
					{...props}
					colored_label
					label={spell.hp > 0 ? "+" : "-"}
					className="!gap-0"
					target={props.creature}
					value={spell.hp}
					max={spell.hp}
					style={props.theme.hp}
				/>
				<DotView
					{...props}
					colored_label
					label={spell.cost > 0 ? " " : "+"}
					className="!gap-0"
					target={props.creature}
					value={spell.cost}
					max={spell.cost}
					style={props.theme.mana}
				/>
			</div>
		</div>
	);
}
