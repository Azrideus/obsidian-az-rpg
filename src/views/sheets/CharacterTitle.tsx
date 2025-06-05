import { App } from "obsidian";
import SheetBackground from "./SheetBackground";

export default function CharacterTitle(props: { image_folder: string }) {
	return (
		<div className="flex flex-col items-center absolute top-0 left-0 w-full h-full z-20">
			<h3 className="pt-[18px] font-felipa text-[55px] mb-[2px] border-red-300 border-8">
				Issac Rizzark
			</h3>
			<h4 className="m-[1px] font-felipa text-[30px]">
				The Great Scientist
			</h4>
		</div>
	);
}
