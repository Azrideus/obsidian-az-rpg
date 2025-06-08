import { App } from "obsidian";
import { SharedProps } from "./CharacterSheet";
import StatGroup from "./StatGroup";
import SmallBlock from "./blocks/SmallBlock";
import DotView from "../shared/DotView";
import useProperty from "../hooks/useProperty";
import UnderlineView from "../shared/UnderlineView";
import * as React from "react";
import LinkedField from "../shared/LinkedField";
import LinkedDotView from "../shared/LinkedDotView";

export default function StatHPArea(props: SharedProps) {
	const details = React.useMemo(() => {
		return props.creature.get_details();
	}, [props.creature]);
	const max_hp = details.hp;
	const max_mana = details.mana;
	const max_blood = details.blood;

	const [total_xp, set_total_xp] = useProperty(props.creature, "total_xp");

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
				<LinkedDotView
					creature={props.creature}
					field_name={"willpower"}
					dotSymbol="◇"
					dotSize={14}
					showValue
					label={"Willpower"}
					max={10}
					color="#f4b400"
				/>
				<LinkedDotView
					creature={props.creature}
					field_name="shield"
					dotSymbol="▢"
					dotSize={14}
					showValue
					label={"shield"}
					max={10}
					color="#00a4ef"
				/>
				<LinkedDotView
					creature={props.creature}
					field_name="hp"
					dotSymbol="♡"
					dotSize={16}
					showValue
					label={"HP"}
					max={max_hp}
					color="#a4c639"
				/>

				{props.theme.useBlood ? (
					<LinkedDotView
						creature={props.creature}
						field_name="blood"
						showValue
						label={"Blood"}
						max={max_blood}
					></LinkedDotView>
				) : (
					<LinkedDotView
						creature={props.creature}
						field_name="mana"
						dotSymbol="▽"
						showValue
						label={"Mana"}
						max={max_mana}
					></LinkedDotView>
				)}
			</div>
		</div>
	);
}
