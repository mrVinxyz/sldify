import type { ButtonProps } from './button';
import generateId from "../../utils/id";

export function buttonAria(props: ButtonProps) {
	const buttonId = props.id || generateId('btn');

	return {
		id: buttonId,
		'aria-label': !props.children ? props.labelText : undefined,
		'aria-controls': props.controls,
		'aria-expanded': props.controls ? false : undefined,
		'aria-busy': props.loading ? 'true' : 'false',
		'aria-hidden': props.leading || props.trailing ? 'true' : undefined,
	} as const;
}
