import { For } from 'solid-js';
import type { Element } from '../types';

/**
 * Props for the Select component.
 */
export type SelectProps = {
	/** The name of the select field. */
	name: string;
	/** The options for the select field. */
	options: { name: string; value: string }[];
	/** The default option for the select field. */
	default?: { name: string; value: string };
	/** The selected value for the select field. */
	value?: string | number;
	/** The change event handler for the select field. */
	onChange?: (e: Event) => void;
	/** Whether the select field is disabled. */
	disabled?: boolean;
	/** Additional properties for the select element. */
	[key: string]: unknown;
};

/**
 * Select component to render a select field.
 *
 * @param {SelectProps} props - The properties for the Select component.
 * @returns {Element} - The rendered Select component.
 */
export const InputSelect = (props: SelectProps): Element => {
	return (
		<select
			id={props.name}
			name={props.name}
			classList={{
				'w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm font-medium rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5': true,
				'cursor-not-allowed': props.disabled,
			}}
			onChange={props.onChange}
		>
			<option
				value={props?.default?.value || ''}
				selected
			>
				{props?.default?.name || ''}
			</option>
			<For each={props.options}>
				{(option) => (
					<option
						value={option.value}
						selected={props?.value === option.value}
					>
						{option.name}
					</option>
				)}
			</For>
		</select>
	);
};
