import { App } from "obsidian";
import { STAT_KEYS } from "src/classes/rpgCreature";
import { SharedProps } from "./CharacterSheet";
import LineDivider from "../shared/LineDivider";
import StatGroup from "./blocks/StatGroup";
import StatAdvantages from "./StatAdvantages";
import StatMagic from "./StatMagic";
import StatHPArea from "./StatHPArea";
import BigBlock from "./blocks/BigBlock";

export default function CharacterStats(props: SharedProps) {
	const stats = props.creature.get_stats(true); // include bonuses
	const ATTRIBUTE_CATEGORIES = ["physical", "mental", "social"] as const;
	const ABILITY_CATEGORIES = ["talents", "skills", "knowledges"] as const;

	return (
		<div className="flex flex-col w-full items-center px-[1.5cm] gap-2">
			<BigBlock title="Attributes">
				{ATTRIBUTE_CATEGORIES.map((category) => (
					<StatGroup
						{...props}
						key={category}
						title={category}
						stats={Object.keys(stats[category]) as any}
					/>
				))}
			</BigBlock>
			<BigBlock title="Abilities">
				{ABILITY_CATEGORIES.map((category) => (
					<StatGroup
						{...props}
						key={category}
						title={category}
						stats={Object.keys(stats[category]) as any}
					/>
				))}
			</BigBlock>
			<BigBlock title="Advantages">
				<StatAdvantages {...props} />
			</BigBlock>
			<BigBlock title="Magical Abilities">
				<StatMagic {...props} />
			</BigBlock>
			<BigBlock title="">
				<StatHPArea {...props} />
			</BigBlock>
		</div>
	);
}
