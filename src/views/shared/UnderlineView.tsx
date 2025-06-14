import clsx from "clsx";
export default function UnderlineView(props: {
	label?: string;
	className?: string;
	children?: any;
	hidden?: boolean;
	info?: any;
}) {
	const { label, hidden, children, info } = props;
	return (
		<div
			className={clsx(
				"flex justify-between items-center gap-[1mm] h-[5mm]",
				hidden ? " invisible" : " visible",
				props.className
			)}
		>
			<span className="capitalize text-[11pt] leading-snug font-bold">
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
