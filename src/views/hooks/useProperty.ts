import React from "react";
import { rpgCreature, StatKeyType } from "src/classes/rpgCreature";

export default function useProperty(creature: rpgCreature, prop_key: string) {
	const [propValue, setPropValue] = React.useState(creature.get(prop_key));
	const set = React.useCallback(
		(value: any) => {
			creature.set(prop_key, value).then(setPropValue);
		},
		[creature, prop_key]
	);
	return [propValue, set] as const;
}
