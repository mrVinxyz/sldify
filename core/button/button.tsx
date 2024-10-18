import {cva} from 'class-variance-authority';
import type {ClassNames, OptChild, PropAttr} from '../types';
import {splitProps} from 'solid-js';

export type ButtonProps = OptChild &
	ClassNames &
	PropAttr & {
    id?: string;
    text?: string;
    disabled?: boolean;
    loading?: boolean; // TODO impl this feature
    // onPress is when an affirmative action happens, such as mouse `Click`, keystrokes for `Enter` and `Space`.
    onPress?: (e: Event) => void;
	color: ButtonColorVariant,
	size: ButtonSizeVariant,
};

export type ButtonColorVariant =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'danger'
	| 'warning'
	| 'alert'
	| 'light'
	| 'dark'
	| 'outline'
	| 'plain'
	| 'text_primary'
	| 'underline';

export type ButtonSizeVariant =
	| 'rec_xs'
	| 'rec_sm'
	| 'rec_md'
	| 'rec_lg'
	| 'sqr_xs'
	| 'sqr_sm'
	| 'sqr_md'
	| 'sqr_lg';

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
            dark: 'text-white bg-neutral-900 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300',
            outline:
                'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-300',
            plain: 'text-gray-900 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100',
            text_primary:
                'text-blue-600 hover:bg-blue-50 font-medium focus:underline rounded-full',
            underline:
                'rounded-none text-gray-900 bg-white border-b border-gray-300 focus:outline-none hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-300',
            none: '',
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
            none: '',
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
    const [prop, others] = splitProps(props, [
        'id',
        'text',
        'type',
        'children',
        'className',
        'disabled',
        'loading',
        'onPress',
        'color',
        'size',
    ]);

    return (
        <button
            id={prop.id}
            {...others}
            type={prop.type}
            class={buttonStyles({
                color: prop.color,
                size: prop.size,
                disabled: prop.disabled,
            }).concat(prop.className ? ' '.concat(prop.className) : '')}
            onClick={(e) => {
                const handler = others.onClick;
                if (handler && typeof handler === 'function') handler(e);
                prop.onPress?.(e);
            }}
            disabled={prop.disabled || prop.loading}
            aria-busy={prop.loading}
            aria-disabled={prop.disabled || prop.loading}
        >
            {prop.text || prop.children}
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
