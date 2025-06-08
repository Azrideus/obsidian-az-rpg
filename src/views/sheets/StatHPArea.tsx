import { App } from "obsidian";
import { SharedProps } from "./CharacterSheet";

export default function StatHPArea(props: SharedProps) {
	return (
		<div className="flex flex-col w-full items-center px-[1.5cm]">
			<span>XP :{props.creature.get_xp()}</span>
		</div>
	);
}
