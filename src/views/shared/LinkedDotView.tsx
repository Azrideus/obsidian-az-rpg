import { DotViewProps } from "./DotView";
import useProperty from "../hooks/useProperty";
import DotView from "./DotView";
import { rpgBaseClass } from "src/classes/base/rpgBaseClass";
export default function LinkedDotView(
	props: DotViewProps & {
		target: rpgBaseClass;
		field_name: string;
	}
) {
	const [value, set_value] = useProperty(props.target, props.field_name);

	return <DotView {...props} value={value} set_value={set_value} />;
}
