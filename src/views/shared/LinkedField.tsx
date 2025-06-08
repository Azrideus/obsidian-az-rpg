import clsx from "clsx";
import useProperty from "../hooks/useProperty";
import { rpgCreature } from "../../classes/rpgCreature";
import { HTMLInputTypeAttribute } from "react";

export default function LinkedField(props: {
	field_name: string;
	className?: string;
	type: HTMLInputTypeAttribute;
	creature: rpgCreature;
}) {
	const [value, set_value] = useProperty(props.creature, props.field_name);
	return (
		<input
			key={props.field_name}
			type={props.type}
			defaultValue={value}
			onChange={(e) => {
				if (props.type === "number") {
					const newValue = parseFloat(e.target.value);
					if (!isNaN(newValue)) {
						set_value(newValue);
					}
				} else {
					// For text input, we can set the value directly
					// or handle it as needed.
					// For example, if you want to trim whitespace:
					set_value(e.target.value.trim());
				}
			}}
			className={clsx("!bg-transparent !border-none ", props.className)}
		></input>
	);
}
