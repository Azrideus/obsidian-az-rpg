import React from "react";
import { rpgBaseClass } from "src/classes/base/rpgBaseClass";

export default function useProperty(creature: rpgBaseClass, prop_key: string) {
	const [propValue, setPropValue] = React.useState(creature.get(prop_key));
	const set = React.useCallback(
		(value: any) => {
			creature.set(prop_key, value).then(setPropValue);
		},
		[creature, prop_key]
	);
	return [propValue, set] as const;
}
