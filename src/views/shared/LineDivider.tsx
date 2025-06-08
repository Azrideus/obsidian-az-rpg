import clsx from "clsx";

export default function LineDivider(props: any) {
	return (
		<div className="relative flex py-1 items-center w-full">
			<div
				className="flex-grow opacity-70"
				style={{ borderTop: "2px solid gray" }}
			></div>
			{props.children && (
				<b
					className={clsx(
						"flex-shrink mx-4 font-felipa capitalize",
						props.className,
						props.small ? "text-[15pt]" : "text-[20pt]"
					)}
				>
					{props.children}
				</b>
			)}

			<div
				className="flex-grow opacity-70"
				style={{ borderTop: "2px solid gray" }}
			></div>
		</div>
	);
}
