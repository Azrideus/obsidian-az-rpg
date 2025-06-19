import { App } from "obsidian";
import { SharedProps } from "./CharacterSheet";
import StatGroup from "./blocks/StatGroup";
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
	const sharedClassName = "!h-[5mm]";
	return (
		<div className="flex flex-row w-full flex-1 ">
			<div className="flex-1 flex flex-col gap-2 text-[18pt]">
				<UnderlineView
					className={sharedClassName}
					label="XP"
					info={props.creature.get_xp() + "/" + total_xp}
				>
					<LinkedField
						target={props.creature}
						field_name="total_xp"
						type="number"
						className="!bg-transparent !border-none w-16"
					/>
				</UnderlineView>
				<LinkedDotView
					{...props}
					className={sharedClassName}
					target={props.creature}
					style={props.theme.willpower}
					field_name={"willpower"}
					showValue
					label={"Willpower"}
					max={10}
				/>
				<LinkedDotView
					{...props}
					className={sharedClassName}
					target={props.creature}
					field_name="shield"
					style={props.theme.shield}
					showValue
					label={"shield"}
					max={5}
				/>
				<LinkedDotView
					{...props}
					className={sharedClassName}
					target={props.creature}
					field_name="hp"
					style={props.theme.hp}
					showValue
					label={"HP"}
					max={max_hp}
				/>

				<LinkedDotView
					{...props}
					className={sharedClassName}
					target={props.creature}
					field_name={props.theme.manaUnit}
					label={props.theme.manaUnit}
					style={props.theme.mana}
					showValue
					max={max_blood}
				></LinkedDotView>
			</div>
		</div>
	);
}
