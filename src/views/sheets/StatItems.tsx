import { App } from "obsidian";
import { SharedProps } from "./CharacterSheet";
import LinkedField from "../shared/LinkedField";
import LinkedDotView from "../shared/LinkedDotView";
import { MAX_COUNT_SPELL } from "src/classes/rpgCreature";

export default function StatItems(props: SharedProps) {
	const item_list = [];
	for (let index = 0; index < MAX_COUNT_SPELL; index++) {
		item_list.push(<ItemLine index={index} {...props} key={index} />);
	}
	return <div className="flex flex-col w-full ">{item_list}</div>;
}
function ItemLine(props: SharedProps & { index: number }) {
	return (
		<div className="flex flex-row justify-center items-center az-bottom-dashed opacity-80">
			<LinkedField
				target={props.creature}
				type="text"
				field_name={`item_${props.index}`}
				className="flex-1 !pt-0 !border-none !bg-transparent"
			/>
		</div>
	);
}
