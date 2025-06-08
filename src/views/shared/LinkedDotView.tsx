import clsx from "clsx";
import UnderlineView from "./UnderlineView";
import { rpgCreature } from "../../classes/rpgCreature";
import { DotViewProps } from "./DotView";
import useProperty from "../hooks/useProperty";
import DotView from "./DotView";
export default function LinkedDotView(
	props: DotViewProps & {
		creature: rpgCreature;
		field_name: string;
	}
) {
	const [value, set_value] = useProperty(props.creature, props.field_name);

	return <DotView {...props} value={value} set_value={set_value} />;
}
