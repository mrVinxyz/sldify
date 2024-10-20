import {
	createContext,
	createEffect,
	createSignal,
	For,
	type JSX,
	splitProps,
	createMemo,
} from 'solid-js';
import { type InputColorVariant, inputStyles } from './input';
import type { ClassNames, PropAttr, View } from '../types';

const SelectContext = createContext();

export type SelectValueProp<T> = {
	value: T;
	name: string;
};

export type SelectProps<T> = PropAttr &
	ClassNames & {
		name: string;
		options: SelectValueProp<T>[];
		defaultOpt?: number;
		value?: string | number;
		disabled?: boolean;
		onSelect?: (value: T) => void;
		color?: InputColorVariant;
	};

export function Select<T>(props: SelectProps<T>) {
	const [prop, others] = splitProps(props, [
		'className',
		'disabled',
		'name',
		'defaultOpt',
		'options',
		'value',
		'color',
		'onSelect',
	]);

	const [value, setValue] = createSignal<SelectValueProp<T>>();
	createEffect(() => {
		const val = value();
		if (val) prop.onSelect?.(val.value);
	});

	return (
		<SelectContext.Provider value={{}}>
			<select
				{...others}
				id={prop.name}
				name={prop.name}
				class={
					inputStyles({ disabled: prop.disabled, color: prop.color }) +
					' '.concat(prop.className || '')
				}
				onChange={(e: Event) => {
					const selectedValue = (e.target as HTMLSelectElement).value;
					const selectedOption = prop.options.find((opt) =>
						typeof opt.value === 'object'
							? JSON.stringify(opt.value) === selectedValue
							: String(opt.value) === selectedValue,
					);
					if (selectedOption) setValue(selectedOption);
				}}
			>
				<For each={prop.options}>
					{(option, i) => (
						<option
							value={
								typeof option.value === 'object'
									? JSON.stringify(option.value)
									: String(option.value)
							}
							selected={i() === prop.defaultOpt ?? 0}
						>
							{option.name}
						</option>
					)}
				</For>
			</select>
		</SelectContext.Provider>
	);
}
