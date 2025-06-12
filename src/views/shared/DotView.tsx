import clsx from "clsx";
import UnderlineView from "./UnderlineView";
import { rpgCreature } from "src/classes/rpgCreature";
import { SharedProps } from "../sheets/CharacterSheet";

export type DotViewProps = SharedProps & {
	creature: rpgCreature;
	label?: string;
	color?: string;
	dotSymbol?: string;
	dotSize?: number;
	dotSpacing?: number;
	max?: number;
	showValue?: boolean;
};
export type DotViewWithValueProps = DotViewProps & {
	value: any;
	set_value: (v: any) => void;
};
export default function DotView(props: DotViewWithValueProps) {
	const { value, set_value } = props;
	const max = props.max ?? 7;

	const dotSymbol = props.dotSymbol || "●";
	const dotSize = props.dotSize ?? 18;
	const circles = dotSymbol.repeat(Math.max(max, value)).split("");
	const label = props.label;
	const hidden = !label || label === "";
	const color = props.color ?? props.theme?.primaryColor ?? "crimson";

	return (
		<UnderlineView
			label={label}
			hidden={hidden}
			info={props.showValue ? `${value}/${max}` : undefined}
		>
			<div
				className="font-mono  tracking-tighter leading-[0] flex flex-row"
				style={{ fontSize: `${dotSize}pt` }}
			>
				{circles.map((circle, index) => {
					const circleNumber = index + 1;
					const isFilled = value >= circleNumber;
					return (
						<div
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
							style={{
								color: isFilled ? color : "",
								textShadow: "0 0 2px black",
								letterSpacing: props.dotSpacing ?? "0.1pt",
							}}
							className={clsx(
								`hover:text-[crimson] opacity-50`,
								`aria-checked:opacity-100`
							)}
						>
							<span className="leading-[0]">{circle}</span>
						</div>
					);
				})}
			</div>
		</UnderlineView>
	);
}
