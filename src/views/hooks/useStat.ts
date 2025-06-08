import React from "react";
import { rpgCreature, StatKeyType } from "src/classes/rpgCreature";

export default function useStat(creature: rpgCreature, stat_key: StatKeyType) {
	const [statValue, setStatValue] = React.useState(
		creature.get_stat(stat_key, false)
	);
	const set = React.useCallback(
		(value: any) => {
			creature.set_stat(stat_key, Number(value)).then(setStatValue);
		},
		[creature, stat_key]
	);

	return [Number(statValue), set] as const;
}
