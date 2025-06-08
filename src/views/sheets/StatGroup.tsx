import * as React from "react";
import { RawStatObject, StatKeyType } from "../../classes/rpgCreature";
import LineDivider from "../shared/LineDivider";
import { SharedProps } from "./CharacterSheet";
import StatLine from "./StatLine";

export default function StatGroup(
	props: SharedProps & {
		title: string;
		stats: StatKeyType[];
	}
) {
	const showTotals = props.theme.showTotals ?? true;
	const title = React.useMemo(() => {
		if (showTotals) {
			const sum = props.creature.get_stat_sum(props.stats);
			return (
				<span className="flex flex-row gap-1">
					{props.title}
					<span className="opacity-50 text-[0.9em]">({sum})</span>
				</span>
			);
		}
		return props.title;
	}, [props.title, props.stats, showTotals]);
	return (
		<div className="flex flex-col flex-1">
			<LineDivider small>
				<b className="capitalize text-center w-full">{title}</b>
			</LineDivider>
			<div className="flex flex-col">
				{props.stats.map((s) => {
					return <StatLine {...props} key={s} stat={s} />;
				})}
			</div>
		</div>
	);
}
