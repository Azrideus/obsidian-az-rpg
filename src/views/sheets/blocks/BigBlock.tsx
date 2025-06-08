import LineDivider from "../../shared/LineDivider";

export default function BigBlock(props: { title: any; children?: any }) {
	return (
		<div className="flex flex-col w-full">
			<LineDivider>{props.title}</LineDivider>
			<div className="flex flex-row gap-4 w-full justify-between">
				{props.children}
			</div>
		</div>
	);
}
