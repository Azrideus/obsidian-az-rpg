import { RawStatObject } from "../../classes/rpgCreature";
import LineDivider from "../shared/LineDivider";
import { SharedProps } from "./CharacterSheet";
import StatLine from "./StatLine";

export default function StatGroup(
	props: SharedProps & {
		title: string;
		stats: RawStatObject;
	}
) {
	return (
		<div className="flex flex-col flex-1">
			<LineDivider small>
				<b className="capitalize text-center w-full">{props.title}</b>
			</LineDivider>
			<div className="flex flex-col">
				{Object.entries(props.stats).map((s) => {
					return (
						<StatLine {...props} label={String(s[0])} value={2} />
					);
				})}
			</div>
		</div>
	);
}
