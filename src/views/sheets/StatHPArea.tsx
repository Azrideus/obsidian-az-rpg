import { App } from "obsidian";
import { SharedProps } from "./CharacterSheet";
import StatGroup from "./StatGroup";
import SmallBlock from "./blocks/SmallBlock";
import DotView from "../shared/DotView";
import useProperty from "../hooks/useProperty";
import UnderlineView from "../shared/UnderlineView";
import * as React from "react";
import LinkedField from "../shared/LinkedField";

export default function StatHPArea(props: SharedProps) {
	const details = React.useMemo(() => {
		return props.creature.get_details();
	}, [props.creature]);
	const max_hp = details.hp;
	const max_mana = details.mana;
	const max_blood = details.blood;

	const [willpower, set_willpower] = useProperty(props.creature, "willpower");
	const [total_xp, set_total_xp] = useProperty(props.creature, "total_xp");
	const [hp, set_hp] = useProperty(props.creature, "hp");
	const [mana, set_mana] = useProperty(props.creature, "mana");
	const [blood, set_blood] = useProperty(props.creature, "blood");

	return (
		<div className="flex flex-row w-full ">
			<div className="flex-1"> </div>

			<div className="flex-1 flex flex-col gap-2">
				<UnderlineView
					label="XP"
					info={props.creature.get_xp() + "/" + total_xp}
				>
					<LinkedField
						creature={props.creature}
						field_name="total_xp"
						type="number"
						className="!bg-transparent !border-none w-16"
					/>
				</UnderlineView>
				<DotView
					dotSymbol="◇"
					dotSize={14}
					showValue
					label={"Willpower"}
					value={willpower}
					set_value={set_willpower}
					max={10}
					color="#f4b400"
				></DotView>
				<DotView
					dotSymbol="♡"
					dotSize={16}
					showValue
					label={"HP"}
					value={hp}
					set_value={set_hp}
					max={max_hp}
					color="#a4c639"
				></DotView>

				{props.theme.useBlood ? (
					<DotView
						showValue
						label={"Blood"}
						value={blood}
						set_value={set_blood}
						max={max_blood}
					></DotView>
				) : (
					<DotView
						dotSymbol="▽"
						showValue
						label={"Mana"}
						value={mana}
						set_value={set_mana}
						max={max_mana}
					></DotView>
				)}
			</div>
		</div>
	);
}
