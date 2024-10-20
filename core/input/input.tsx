import { createContext, createSignal, splitProps } from 'solid-js';
import { cva } from 'class-variance-authority';
import type { ClassNames, OptComponentCtx, PropAttr, View } from '../types';

export type InputValue = string | number | boolean | undefined;

export type InputNamedValue = Record<string, string>;

export type InputContext = {
	value: () => InputValue | undefined;
	setValue: (value: InputValue) => void;
	namedValue: () => Record<string, InputValue>;
};

const inputContext = createContext<InputContext>();

export function createInput(inputName: string, initialValue?: InputValue): InputContext {
	const [value, setValue] = createSignal(initialValue);
	const namedValue = () => ({
		[inputName]: value(),
	});
	return { value, setValue, namedValue };
}

export type InputProps = PropAttr &
	ClassNames & {
		name: string;
		type?: string;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		onInput?: (e: InputEvent) => void;
		onEnter?: (ctx: InputContext) => void;
		color?: InputColorVariant;
	};

export type InputColorVariant = 'plain' | 'success' | 'error';

export const inputStyles = cva(
	'block w-full rounded-lg p-2 bg-gray-50 border border-gray-300 text-gray-800 font-medium text-sm transition focus:outline-none focus:ring-1',
	{
		variants: {
			color: {
				plain: 'border-gray-200 focus:border-blue-600 focus:ring-blue-600 focus:border-blue-600',
				success:
					'bg-green-50 text-green-800 border-green-600 focus:ring-green-600 focus:border-green-600',
				error: 'bg-red-50 text-red-800 border-red-600 focus:ring-red-600 focus:border-red-600',
			},
			disabled: {
				true: 'cursor-not-allowed opacity-60',
				false: '',
			},
		},
		defaultVariants: {
			color: 'plain',
			disabled: false,
		},
	},
);

export const Input = (props: InputProps & OptComponentCtx<InputContext>): View => {
	const [prop, others] = splitProps(props, [
		'name',
		'type',
		'placeholder',
		'disabled',
		'className',
		'onInput',
		'onEnter',
		'ctx',
		'color',
	]);

	const ctx = prop.ctx || createInput(prop.name);

	return (
		<inputContext.Provider value={prop.ctx || createInput(prop.name)}>
			<input
				autocomplete='off'
				id={props.name.concat('_Input')}
				name={prop.name}
				type={prop.type || 'text'}
				class={inputStyles({
					color: prop.color,
					disabled: prop.disabled,
				}).concat(prop.className ? ` ${prop.className}` : '')}
				placeholder={prop.placeholder}
				disabled={prop.disabled}
				onInput={(e: InputEvent) => {
					prop.onInput?.(e);
					ctx.setValue((e.target as HTMLInputElement).value);
				}}
				onKeyDown={(e: KeyboardEvent) => {
					const onKeyDown = others.onKeyDown;
					if (onKeyDown && typeof onKeyDown === 'function') onKeyDown(e);

					const key = e.key;
					if (key === 'Enter') prop.onEnter?.(ctx);
				}}
				{...others}
			/>
		</inputContext.Provider>
	);
};
