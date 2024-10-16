import { cva, type VariantProps } from 'class-variance-authority';
import type { ClassName, OptChild, PropAttr } from '../types';
import { splitProps } from 'solid-js';

export type ButtonProps = VariantProps<typeof buttonStyles> &
	OptChild &
	PropAttr & {
		text?: string;
		name?: string; // to be removed
		disabled?: boolean;
		loading?: boolean;
		className?: ClassName;
		// onPress is when an affirmative action happens, such as mouse `Click`, keystrokes for `Enter` and `Space`.
		onPress?: (e: Event) => void;
	};

const buttonStyles = cva('font-medium text-sm focus:outline-none text-nowrap rounded-lg', {
	variants: {
		color: {
			primary:
				'text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 rounded-full dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-300 dark:focus:ring-blue-700',
			secondary: 'text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-400',
			success: 'text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-400',
			danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-400',
			warning:
				'text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-400',
			alert: 'text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-400',
			light: 'text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100',
			dark: 'text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300',
			outline:
				'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-300',
			plain: 'text-gray-900 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100',
			text_primary:
				'text-blue-600 hover:bg-blue-50 font-semibold focus:ring-4 focus:ring-blue-400 rounded-full',
			'': '',
			none: '',
		},
		variant: {
			primary:
				'text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 rounded-full dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-300 dark:focus:ring-blue-700',
			secondary: 'text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-400',
			success: 'text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-400',
			danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-400',
			warning:
				'text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-400',
			alert: 'text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-400',
			light: 'text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100',
			dark: 'text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300',
			outline:
				'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-300',
			plain: 'text-gray-900 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100',
			link: 'text-blue-600 hover:border-b hover:border-b-blue-300 font-semibold focus:ring-4 focus:ring-blue-400 rounded-full',
			'': '',
			none: ''
		},
		size: {
			rec_xs: 'text-xs px-2 py-1',
			rec_sm: 'text-xs px-3 py-1.5',
			rec_md: 'text-sm px-5 py-2.5',
			rec_lg: 'text-base px-7 py-3.5',
			sqr_xs: 'text-xs px-1 py-1',
			sqr_sm: 'text-xs px-1.5 py-1.5',
			sqr_md: 'text-sm px-2.5 py-2.5',
			sqr_lg: 'text-base px-3.5 py-3.5',
			'': '',
			none: ''
		},
		disabled: {
			true: 'opacity-80 cursor-not-allowed',
		},
	},
	defaultVariants: {
		color: 'plain',
		size: 'rec_md',
	},
});

const Btn = (props: { type: 'submit' | 'reset' | 'button' } & ButtonProps) => {
	const [local, others] = splitProps(props, [
		'text',
		'name', // to be removed
		'type',
		'children',
		'className',
		'disabled',
		'loading',
		'onPress',
		'color', // to be removed
		'variant',
		'size',
	]);

	return (
		<button
			{...others}
			type={local.type}
			class={buttonStyles({
				color: local.color,
				variant: local.variant,
				size: local.size,
				disabled: local.disabled,
			}).concat(local.className ? ' '.concat(local.className) : '')}
			onClick={(e) => {
				const handler = others.onClick;
				if (handler && typeof handler === 'function') handler(e);
				local.onPress?.(e);
			}}
			disabled={local.disabled || local.loading}
			aria-busy={local.loading}
			aria-disabled={local.disabled || local.loading}
		>
			{local.text || local.name || local.children}
		</button>
	);
};

const createButton = (type: 'submit' | 'reset' | 'button') => (props: ButtonProps) => (
	<Btn
		type={type}
		{...props}
	/>
);

export const Button = createButton('button');

export const SubmitBtn = createButton('submit');

export const ResetBtn = createButton('reset');
