import { App } from "obsidian";
import { STAT_KEYS } from "src/classes/rpgCreature";
import { SharedProps } from "./CharacterSheet";
import LineDivider from "../shared/LineDivider";
import StatGroup from "./StatGroup";
import StatAdvantages from "./StatAdvantages";
import StatMagic from "./StatMagic";
import StatHPArea from "./StatHPArea";

export default function CharacterStats(props: SharedProps) {
	const stats = props.creature.get_stats(true); // include bonuses
	const ATTRIBUTE_CATEGORIES = ["physical", "mental", "social"] as const;
	const ABILITY_CATEGORIES = ["talents", "skills", "knowledges"] as const;

	return (
		<div className="flex flex-col w-full items-center px-[1.5cm] gap-2">
			<StatArea title="Attributes">
				{ATTRIBUTE_CATEGORIES.map((category) => (
					<StatGroup
						{...props}
						key={category}
						title={category}
						stats={Object.keys(stats[category]) as any}
					/>
				))}
			</StatArea>
			<StatArea title="Abilities">
				{ABILITY_CATEGORIES.map((category) => (
					<StatGroup
						{...props}
						key={category}
						title={category}
						stats={Object.keys(stats[category]) as any}
					/>
				))}
			</StatArea>
			<StatArea title="Advantages">
				<StatAdvantages {...props} />
			</StatArea>
			<StatArea title="Magical Abilities">
				<StatMagic {...props} />
			</StatArea>
			<StatArea title="">
				<StatHPArea {...props} />
			</StatArea>
		</div>
	);
}
function StatArea(props: { title: string; children?: any }) {
	return (
		<div className="flex flex-col w-full">
			<LineDivider>{props.title}</LineDivider>
			<div className="flex flex-row gap-4 w-full justify-between">
				{props.children}
			</div>
		</div>
	);
}
