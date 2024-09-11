import { splitProps } from 'solid-js';
import type { ClassName, Element } from '../types';
import { cva } from 'class-variance-authority';

export type InputStyle = 'default' | 'success' | 'error';

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
	const [local, others] = splitProps(props, [
		'name',
		'placeholder',
		'disabled',
		'class',
		'style',
	]);

	const inputClasses = cva(
		'block w-full rounded-sm p-2.5 bg-gray-50 border border-gray-200 text-gray-800 font-medium text-sm transition focus:outline-none focus:ring-1',
		{
			variants: {
				style: {
					default: 'border-gray-200 focus:border-blue-600 focus:ring-blue-600 focus:border-blue-600',
					success: 'bg-green-50 text-green-800 border-green-600 focus:ring-green-600 focus:border-green-600',
					error: 'bg-red-50 text-red-800 border-red-600 focus:ring-red-600 focus:border-red-600',
				},
				disabled: {
					true: 'cursor-not-allowed opacity-60',
					false: '',
				},
			},
			defaultVariants: {
				style: 'default',
				disabled: false,
			},
		},
	);

	return (
		<input
			id={`${local.name}Input`}
			name={local.name}
			type='text'
			class={
				inputClasses({ style: local.style, disabled: local.disabled }) +
				' '.concat(local.class || '')
			}
			placeholder={local.placeholder}
			disabled={local.disabled}
			autocomplete='off'
			{...others}
		/>
	);
};
