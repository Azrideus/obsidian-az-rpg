import LineDivider from "../../shared/LineDivider";

export default function SmallBlock(props: { title: any; children?: any }) {
	return (
		<div className="flex flex-col w-full">
			<LineDivider small>{props.title}</LineDivider>
			<div className="flex flex-col">{props.children}</div>
		</div>
	);
}
