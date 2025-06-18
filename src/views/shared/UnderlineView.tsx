import clsx from "clsx";
export default function UnderlineView(props: {
	label?: string;
	className?: string;
	children?: any;
	hidden?: boolean;
	invisible?: boolean;
	label_color?: string;
	info?: any;
}) {
	const { label, hidden, invisible, children, info } = props;

	const label_empty = String(label || "").trim() === "";
	return (
		<div
			className={clsx(
				"flex justify-between items-center gap-[1mm] h-[5mm]",
				invisible ? " invisible" : " visible",
				hidden ? " hidden" : " ",
				props.className
			)}
		>
			<span
				className={clsx(
					"capitalize text-[11pt] leading-snug font-bold",
					label_empty ? "hidden" : ""
				)}
				style={
					props.label_color
						? {
								color: props.label_color,
						  }
						: undefined
				}
			>
				{label}
			</span>
			<span className=" flex-1 h-full az-bottom-dashed"></span>
			{children}

			{info && (
				<span className="text-[8pt] text-gray-500 min-w-10 pl-2">
					{info}
				</span>
			)}
		</div>
	);
}
