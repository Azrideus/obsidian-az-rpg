import clsx from "clsx";
import { SharedProps } from "./CharacterSheet";
import useStat from "../hooks/useStat";
import { StatKeyType } from "src/classes/rpgCreature";
export default function StatLine(
	props: SharedProps & {
		stat: StatKeyType;
		label?: string;
		max?: number;
	}
) {
	const max = props.max ?? 7;
	const [value, set_value] = useStat(props.creature, props.stat);

	const circles = "●".repeat(Math.max(max, value)).split("");

	const label = props.label ?? props.stat;
	const hidden = !label || label === "";

	return (
		<div
			className={clsx(
				"flex justify-between items-center gap-[1mm] h-[5mm]",
				hidden ? " invisible" : " visible"
			)}
		>
			<span className="capitalize text-[10pt]  leading-snug">
				{label}
			</span>
			<span
				className=" flex-1 h-full"
				style={{ borderBottom: "0.5px dashed gray" }}
			></span>
			<span className="font-mono text-[18pt] tracking-tighter leading-[0]">
				{circles.map((circle, index) => {
					const circleNumber = index + 1;
					const isFilled = value >= circleNumber;
					return (
						<span
							aria-checked={isFilled}
							onClick={() => {
								if (circleNumber == 1 && value == 1) {
									// Reset to 0 if possible
									set_value(0);
								} else {
									set_value(circleNumber);
								}
							}}
							key={index}
							className={clsx(
								`hover:text-[crimson] opacity-50`,
								`aria-checked:text-[crimson] aria-checked:opacity-100`
							)}
							style={{ textShadow: "0 0 2px black" }}
						>
							{circle}
						</span>
					);
				})}
			</span>
		</div>
	);
}
