import clsx from "clsx";
import { SharedProps } from "./CharacterSheet";
import useStat from "../hooks/useStat";
import { StatKeyType } from "src/classes/rpgCreature";
import DotView from "../shared/DotView";
export default function StatLine(
	props: SharedProps & {
		stat: StatKeyType;
		label?: string;
		max?: number;
	}
) {
	const max = props.max ?? 7;
	const [value, set_value] = useStat(props.creature, props.stat);
	const label = props.label ?? props.stat;
	return (
		<DotView set_value={set_value} value={value} label={label} max={max} />
	);
}
