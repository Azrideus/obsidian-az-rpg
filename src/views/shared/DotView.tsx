import clsx from "clsx";
import UnderlineView from "./UnderlineView";
import { SharedProps } from "../sheets/CharacterSheet";
import { rpgBaseClass } from "src/classes/base/rpgBaseClass";
import { SymbolStyle } from "../themes";
import * as React from "react";

export type DotViewProps = SharedProps & {
	target: rpgBaseClass;
	hidden?: boolean;
	label?: string;
	colored_label?: boolean;
	style?: SymbolStyle;
	max?: number;
	showValue?: boolean;
	className?: string;
};
export type DotViewWithValueProps = DotViewProps & {
	value: any;
	set_value?: (v: any) => void;
};
export default function DotView(props: DotViewWithValueProps) {
	const { value, set_value } = props;
	const max = props.max ?? 7;

	const dotSymbol = props.style?.symbol || "●";
	const dotSize = props.style?.size ?? 18;
	const dotColor = props.style?.color ?? props.theme.primaryColor ?? 18;
	const dotSpacing = props.style?.spacing ?? "0.1pt";

	const repeats = Math.max(max, value);
	const circles = [];
	for (let i = 0; i < repeats; i++) {
		circles.push(dotSymbol);
	}

	const label = React.useMemo(() => {
		if (max <= 0) return "";
		if (props.label) return props.label;
	}, [props.label, max]);

	const hidden = React.useMemo(() => {
		return max <= 0 && !label;
	}, [label, max]);

	const invisible = React.useMemo(() => {
		return props.hidden ?? (max <= 0 || !label || label === "");
	}, [label, max]);

	return (
		<UnderlineView
			className={clsx(props.className)}
			label_color={props.colored_label ? dotColor : ""}
			label={label}
			hidden={hidden}
			invisible={invisible}
			info={props.showValue ? `${value}/${max}` : undefined}
		>
			<div
				className="font-mono tracking-tighter leading-[0] flex flex-row"
				style={{ fontSize: `${dotSize}`, letterSpacing: dotSpacing }}
			>
				{circles.map((circle: any, index: any) => {
					const circleNumber = index + 1;
					const isFilled = value >= circleNumber;
					return (
						<div
							data-circle={circleNumber}
							data-value={value}
							aria-checked={isFilled}
							onClick={
								set_value != null
									? () => {
											if (
												circleNumber == 1 &&
												value == 1
											) {
												// Reset to 0 if possible
												set_value(0);
											} else {
												set_value(circleNumber);
											}
									  }
									: undefined
							}
							key={index}
							style={{
								color: isFilled ? dotColor : "",
								textShadow: "0 0 2px black",
								letterSpacing: dotSpacing,
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
