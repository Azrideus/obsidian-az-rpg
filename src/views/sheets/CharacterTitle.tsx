import { SharedProps } from "./CharacterSheet";

export default function CharacterTitle(props: SharedProps) {
	const { creature } = props;
	const title = creature.file?.basename;
	return (
		<div className="flex flex-col items-center gap-0">
			<h3 className="pt-[12mm] m-0 leading-none font-[inter] font-thin text-[55px]  border-red-300 border-8">
				{title}
			</h3>
			<h2 className="m-0 mt-[-1mm] mb-[1mm] font-[inter] font-thin">
				The Great Scientist
			</h2>
		</div>
	);
}
