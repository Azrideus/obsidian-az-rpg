import { App } from "obsidian";
import { SharedProps } from "./CharacterSheet";
import { MAX_BONUS_COUNT } from "src/classes/rpgCreature";
import useProperty from "../hooks/useProperty";
import LinkedField from "../shared/LinkedField";

export default function StatAdvantages(props: SharedProps) {
	const advantage_list = [];
	for (let index = 0; index < MAX_BONUS_COUNT; index++) {
		advantage_list.push(
			<AdvantageLine index={index} {...props} key={index} />
		);
	}
	return <div className="flex flex-col w-full ">{advantage_list}</div>;
}
function AdvantageLine(props: SharedProps & { index: number }) {
	return (
		<div className="flex flex-row justify-center items-center az-bottom-dashed opacity-80">
			<span>{String(1 + props.index) + ". "}</span>
			<LinkedField
				target={props.creature}
				type="text"
				field_name={`bonus_text_${props.index}`}
				className="flex-1 !pt-0 !border-none !bg-transparent"
			/>
			<LinkedField
				target={props.creature}
				type="text"
				field_name={`bonus_key_${props.index}`}
				className="font-mono !pt-0 !border-none !bg-transparent"
			/>
			<LinkedField
				target={props.creature}
				type="number"
				field_name={`bonus_value_${props.index}`}
				className="font-mono !pt-0 !border-none !bg-transparent w-16"
			/>
		</div>
	);
}
