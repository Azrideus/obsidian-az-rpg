import clsx from "clsx";
import { SharedProps } from "./CharacterSheet";
import useStat from "../hooks/useStat";
import { StatKeyType } from "src/classes/rpgCreature";
import DotView from "../shared/DotView";
import * as React from "react";
export default function StatLine(
	props: SharedProps & {
		stat: StatKeyType;
		label?: string;
		max?: number;
	}
) {
	const max = props.max ?? 7;
	const [value, set_value] = useStat(props.creature, props.stat);
	let label = React.useMemo(() => {
		let s = props.label ?? props.stat;
		if (s.startsWith("__")) s = "";
		return s;
	}, [props.label, props.stat]);
	return (
		<DotView
			{...props}
			set_value={set_value}
			value={value}
			label={label}
			max={max}
		/>
	);
}
