import { createContext, createSignal, splitProps } from 'solid-js';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ClassName, OptComponentCtx, PropAttr, View } from '../types';

export type InputValue = string | number | boolean | undefined;

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

/**
 * Properties of an Input.
 * @param name The name of the input field.
 * @param placeholder The placeholder text for the input field.
 * @param required Indicates if the input field must be filled before form submission.
 * @param readonly Indicates if the input field is read-only and cannot be edited.
 * @param className Additional CSS class names to apply to the input field for custom styling.
 */
export type InputProps = VariantProps<typeof inputStyles> &
	PropAttr & {
		name: string;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		className?: ClassName;
		onInput?: (e: InputEvent) => void;
		onEnter?: (ctx: InputContext) => void;
	};

export const inputStyles = cva(
	'block w-full rounded-lg p-2 bg-gray-50 border border-gray-300 text-gray-800 font-medium text-sm transition focus:outline-none focus:ring-1',
	{
		variants: {
			style: {
				plain: 'border-gray-200 focus:border-blue-600 focus:ring-blue-600 focus:border-blue-600',
				success:
					'bg-green-50 text-green-800 border-green-600 focus:ring-green-600 focus:border-green-600',
				error: 'bg-red-50 text-red-800 border-red-600 focus:ring-red-600 focus:border-red-600',
			},
			variant: {
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
			style: 'plain',
			disabled: false,
		},
	},
);

/**
 * The Input component to render a text input field.
 *
 * @param {InputProps} props - The properties for the InputEl component.
 * @returns {View} - The rendered InputEl component.
 */
export const Input = (props: InputProps & OptComponentCtx<InputContext>): View => {
	const [prop, others] = splitProps(props, [
		'name',
		'type',
		'placeholder',
		'disabled',
		'style',
		'variant',
		'readonly',
		'className',
		'onInput',
		'onEnter',
		'ctx',
	]);

	const ctx = prop.ctx || createInput(prop.name);

	return (
		<inputContext.Provider value={prop.ctx || createInput(prop.name)}>
			<input
				{...others}
				id={props.name.concat('_Input')}
				name={prop.name}
				type={'text'}
				class={inputStyles({
					style: prop.style,
					variant: prop.variant,
					disabled: prop.disabled,
				}).concat(prop.className ? ` ${prop.className}` : '')}
				placeholder={prop.placeholder}
				disabled={prop.disabled}
				readonly={prop.readonly}
				autocomplete='off'
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
			/>
		</inputContext.Provider>
	);
};
