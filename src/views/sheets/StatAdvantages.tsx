import { App } from "obsidian";
import { SharedProps } from "./CharacterSheet";
import { MAX_BONUS_COUNT } from "src/classes/rpgCreature";
import useProperty from "../hooks/useProperty";
import LinkedField from "../shared/LinkedField";
import UnderlineView from "../shared/UnderlineView";
import LinkedDotView from "../shared/LinkedDotView";

export default function StatAdvantages(props: SharedProps) {
	const advantage_list = [];
	for (let index = 0; index < MAX_BONUS_COUNT; index++) {
		advantage_list.push(
			<AdvantageLine index={index} {...props} key={index} />
		);
	}
	return <div className="flex flex-col w-full gap-2">{advantage_list}</div>;
}
function AdvantageLine(props: SharedProps & { index: number }) {
	return (
		<div className="flex flex-row justify-center items-center  opacity-80 h-[5mm]">
			<div className="flex-1 flex flex-row az-bottom-dashed">
				<LinkedField
					target={props.creature}
					type="text"
					field_name={`bonus_text_${props.index}`}
					className="flex-1 !pt-0 !border-none !bg-transparent"
				/>
			</div>
			<LinkedDotView
				{...props}
				className="text-[18pt]"
				target={props.creature}
				hidden={false}
				field_name={`bonus_${props.index}`}
				style={props.theme.stat}
				max={5}
			></LinkedDotView>
		</div>
	);
}
