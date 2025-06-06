import clsx from "clsx";
import { SharedProps } from "./CharacterSheet";
export default function StatLine(
	props: SharedProps & {
		label: string;
		value: number;
		max?: number;
	}
) {
	const max = props.max ?? 7;
	const filledCircles = "●".repeat(props.value).split("");
	const emptyCircles = "●".repeat(max - props.value).split("");

	const hidden = !props.label || props.label === "";

	return (
		<div
			className={clsx(
				"flex justify-between items-center gap-[1mm] h-[5mm]",
				hidden ? " invisible" : " visible"
			)}
		>
			<span className="capitalize text-[10pt]  leading-snug">
				{props.label}
			</span>
			<span
				className=" flex-1 h-full"
				style={{ borderBottom: "0.5px dashed gray" }}
			>
				{" "}
			</span>
			<span className="font-mono text-[18pt] tracking-tighter leading-[0]">
				{filledCircles.map((circle, index) => (
					<span
						key={index}
						className="text-[crimson]"
						style={{ textShadow: "0 0 2px black" }}
					>
						{circle}
					</span>
				))}
				{emptyCircles.map((circle, index) => (
					<span key={index} className="hover:text-[crimson]">
						{circle}
					</span>
				))}
			</span>
		</div>
	);
}
