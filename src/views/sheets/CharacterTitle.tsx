import { App } from "obsidian";
import SheetBackground from "./SheetBackground";
import { SharedProps } from "./CharacterSheet";

export default function CharacterTitle(props: SharedProps) {
	return (
		<div className="flex flex-col items-center ">
			<h3 className="pt-[18px] font-felipa text-[55px] mb-[2px] border-red-300 border-8">
				Issac Rizzark
			</h3>
		</div>
	);
}
