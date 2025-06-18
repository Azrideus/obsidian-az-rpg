import clsx from "clsx";
import LineDivider from "../../shared/LineDivider";

export default function SmallBlock(props: {
	title: any;
	children?: any;
	className?: string;
}) {
	return (
		<div className={clsx("flex flex-col w-full", props.className)}>
			<LineDivider small>{props.title}</LineDivider>
			<div className="flex flex-col">{props.children}</div>
		</div>
	);
}
