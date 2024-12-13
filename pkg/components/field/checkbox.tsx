import { type Component, type JSX, splitProps } from 'solid-js';
import type { BaseInputProps } from './base';
import cn from '../../utils/cn';

type CheckboxProps<T = unknown> = {
	value: T;
	checked?: boolean;
	onChange?: (value: T) => void;
} & BaseInputProps &
	Omit<JSX.IntrinsicElements['input'], 'size' | 'type' | 'onChange' | 'value'>;

const CHECKBOX_STYLES = [
	'w-4 h-4 border rounded focus:ring-2 dark:ring-offset-gray-800',
	'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600',
	'text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600',
	'data-[state=success]:text-green-600 data-[state=success]:focus:ring-green-500 data-[state=success]:dark:focus:ring-green-600',
	'data-[state=error]:text-red-600 data-[state=error]:focus:ring-red-500 data-[state=error]:dark:focus:ring-red-600',
	'data-[size=sm]:w-3 data-[size=sm]:h-3',
	'data-[size=md]:w-4 data-[size=md]:h-4',
	'data-[size=lg]:w-5 data-[size=lg]:h-5',
].join(' ');

const Checkbox: Component<CheckboxProps> = (props) => {
	const [local, rest] = splitProps(props, [
		'variant',
		'size',
		'class',
		'value',
		'checked',
		'onChange',
	]);

	const handleChange = (e: Event) => {
		if (local.onChange) {
			local.onChange(local.value);
		}
	};

	return (
		<input
			type='checkbox'
			checked={local.checked}
			value={JSON.stringify(local.value)}
			class={cn(CHECKBOX_STYLES, local.class)}
			data-state={local.variant !== 'default' ? local.variant : undefined}
			data-size={local.size}
			onChange={handleChange}
			{...rest}
		/>
	);
};

export { type CheckboxProps, Checkbox };
