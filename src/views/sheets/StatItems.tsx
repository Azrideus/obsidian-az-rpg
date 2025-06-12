import { App } from "obsidian";
import { SharedProps } from "./CharacterSheet";

export default function StatAdvantages(props: SharedProps) {
	const advantage_list = [];
	for (let index = 0; index < 4; index++) {
		advantage_list.push(<ItemLine index={index} {...props} key={index} />);
	}
	return <div className="flex flex-col w-full ">{advantage_list}</div>;
}
function ItemLine(props: SharedProps & { index: number }) {
	return (
		<div className="flex flex-row justify-center items-center az-bottom-dashed opacity-80">
			<span>{String(1 + props.index) + ". "}</span>
		</div>
	);
}
