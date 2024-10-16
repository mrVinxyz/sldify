import { type JSX, splitProps } from 'solid-js';
import { inputStyles } from './input';

/**
 * Props for the TextArea component.
 */
export type TextAreaProps = {
	/** The name of the textarea field. */
	name: string;
	/** The placeholder text for the textarea field. */
	placeholder?: string;
	/** The number of rows for the textarea field. */
	rows?: number;
	/** Whether the textarea field is disabled. */
	disabled?: boolean;
	/** Optional additional class names for the input field. */
	className?: string;
	/** Additional properties for the textarea element. */
	[key: string]: unknown;
};

/**
 * TextArea component to render a textarea field.
 *
 * @param {TextAreaProps} props - The properties for the TextArea component.
 * @returns {JSX.Element} - The rendered TextArea component.
 */
export const TextArea = (props: TextAreaProps): JSX.Element => {
	const [prop, others] = splitProps(props, [
		'name',
		'placeholder',
		'disabled',
		'rows',
		'className',
	]);

	return (
		<textarea
			id={prop.name + 'Input'}
			name={prop.name}
			class={inputStyles({ disabled: prop.disabled }) + ' '.concat(prop.className || '')}
			disabled={prop.disabled}
			placeholder={props.placeholder}
			rows={prop.rows || 2}
			{...others}
		/>
	);
};
