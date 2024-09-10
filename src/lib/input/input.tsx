import { splitProps } from 'solid-js';
import type { ClassName, Element } from '../types';
import './input.css';

export type InputStyle = 'nothing' | 'success' | 'error';

/**
 * Properties an Input component has.
 */
export type InputProps = {
	/** The name of the input field. */
	name: string;
	/** The placeholder text for the input field. */
	placeholder?: string;
	/** Whether the input field is required. */
	required?: boolean;
	/** Whether the input field is disabled. */
	disabled?: boolean;
	/** Whether the input field is read-only. */
	readonly?: boolean;
	/** Optional additional class names for the input field. */
	class?: ClassName;
	/** Whether to style the input field as an error. */
	style?: InputStyle;
	/** Additional properties for the input element. */
	[key: string]: unknown;
};

/**
 * The Input component to render a text input field.
 *
 * @param {InputProps} props - The properties for the InputEl component.
 * @returns {Element} - The rendered InputEl component.
 */
export const InputEl = (props: InputProps): Element => {
	const [prop, others] = splitProps(props, ['name', 'placeholder', 'disabled', 'class', 'style']);

	return (
		<input
			id={prop.name + 'Input'}
			name={prop.name}
			type='text'
			classList={{
				input: true,
				'input-success': prop.style === 'success',
				'input-error': prop.style === 'error',
				'cursor-not-allowed': prop.disabled,
				[prop.class || '']: !!prop.class,
			}}
			placeholder={prop.placeholder}
			disabled={prop?.disabled}
			autocomplete={'off'}
			{...others}
		/>
	);
};
