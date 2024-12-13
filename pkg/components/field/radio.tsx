import { type Component, type JSX, splitProps } from 'solid-js';
import type { BaseInputProps } from './base';
import cn from '../../utils/cn';

type RadioProps = BaseInputProps & Omit<JSX.IntrinsicElements['input'], 'size' | 'type'>;

const RADIO_STYLES = [
	'w-4 h-4 bg-gray-100 border-gray-300',
	'focus:ring-2',
	'dark:bg-gray-700 dark:border-gray-600 dark:ring-offset-gray-800',

	'text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600',
	'data-[state=success]:text-green-600 data-[state=success]:focus:ring-green-500 data-[state=success]:dark:focus:ring-green-600',
	'data-[state=error]:text-red-600 data-[state=error]:focus:ring-red-500 data-[state=error]:dark:focus:ring-red-600',

	'data-[size=sm]:w-3 data-[size=sm]:h-3',
	'data-[size=md]:w-4 data-[size=md]:h-4',
	'data-[size=lg]:w-5 data-[size=lg]:h-5',

	'disabled:opacity-80 disabled:cursor-not-allowed',
].join(' ');

const Radio: Component<RadioProps> = (props) => {
	const [local, rest] = splitProps(props, ['variant', 'size', 'class']);
	return (
		<input
			type="radio"
			class={cn(RADIO_STYLES, local.class)}
			data-state={local.variant !== 'default' ? local.variant : undefined}
			data-size={local.size || 'md'}
			{...rest}
		/>
	);
};

export { type RadioProps, Radio };
