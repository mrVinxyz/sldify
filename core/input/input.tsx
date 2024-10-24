import {
	type Accessor,
	type Setter,
	createContext,
	createEffect,
	createSignal,
	splitProps,
	useContext,
} from 'solid-js';
import { cva } from 'class-variance-authority';
import type { ClassNames, OptComponentCtx, PropAttr, View } from '../types';

export type InputNamedValue<T> = Record<string, T | undefined>;

export type InputContext<T> = {
	value: () => T | undefined;
	setValue: (value: T | undefined) => void;
	namedValue: () => InputNamedValue<T>;
};

export function createInput<T>(inputName: string, initialValue?: T): InputContext<T> {
	const [value, setValue] = createSignal<T | undefined>(initialValue ?? (undefined as T));
	const namedValue = (): InputNamedValue<T> => ({
		[inputName]: value(),
	});
	return { value, setValue, namedValue };
}

const inputContext = createContext<InputContext<unknown>>();

export type InputProps<T> = PropAttr &
	ClassNames & {
		name: string;
		type?: string;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		onInput?: (e: InputEvent) => void;
		onEnter?: (ctx: InputContext<T>) => void;
		color?: InputColorVariant;
		sync?: Accessor<T>;
		bind?: (value: T | undefined) => void;
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

export const Input = <T,>(props: InputProps<T> & OptComponentCtx<InputContext<T>>): View => {
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
		'sync',
		'bind',
	]);

	const ctx = prop.ctx || createInput(prop.name);

	createEffect(() => prop.sync && ctx.setValue(prop.sync()));
	createEffect(() => prop.bind?.(ctx.value()));

	return (
		<inputContext.Provider value={ctx as InputContext<unknown>}>
			<input
				autocomplete='off'
				id={prop.name.concat('_Input')}
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
					ctx.setValue((e.target as HTMLInputElement).value as T);
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
