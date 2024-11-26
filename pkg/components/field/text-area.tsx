import { splitProps, type Component, type JSX } from 'solid-js';
import cn from '../../utils/cn';
import type { BaseInputProps } from './base';

type TextAreaProps = BaseInputProps & Omit<JSX.IntrinsicElements['textarea'], 'size'>;

const TEXTAREA_STYLES = [
	'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full',
	'focus:ring-blue-500 focus:border-blue-500',
	'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white',
	'dark:focus:ring-blue-500 dark:focus:border-blue-500',

	'data-[state=success]:bg-green-50 data-[state=success]:border-green-500 data-[state=success]:text-green-900',
	'data-[state=success]:focus:ring-green-500 data-[state=success]:focus:border-green-500',
	'data-[state=error]:bg-red-50 data-[state=error]:border-red-500 data-[state=error]:text-red-900',
	'data-[state=error]:focus:ring-red-500 data-[state=error]:focus:border-red-500',

	'data-[size=sm]:p-2 data-[size=sm]:text-xs',
	'data-[size=md]:p-2.5 data-[size=md]:text-sm',
	'data-[size=lg]:p-3 data-[size=lg]:text-base',
].join(' ');

const TextArea: Component<TextAreaProps> = (props) => {
	const [local, rest] = splitProps(props, ['variant', 'size', 'class']);
	return (
		<textarea
			class={cn(TEXTAREA_STYLES, local.class)}
			data-state={local.variant !== 'default' ? local.variant : undefined}
			data-size={local.size || 'md'}
			{...rest}
		/>
	);
};

export { type TextAreaProps, TextArea };
