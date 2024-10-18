import {
	createContext,
	createEffect,
	createSignal,
	For,
	type JSX,
	splitProps,
} from 'solid-js';
import { inputStyles } from './input';
import type { VariantProps } from 'class-variance-authority';
import type { ClassNames, PropAttr } from '../types';

const InputSelectContext = createContext();

export type SelectValueProp = {
	value: string | number;
	name: string;
};

export type SelectProps = VariantProps<typeof inputStyles> &
	PropAttr &
	ClassNames & {
		name: string;
		options: SelectValueProp[];
		defaultIndex: number;
		value?: string | number;
		disabled?: boolean;
		onSelect?: (value: string | number) => void;
	};

export const InputSelect = <T,>(props: SelectProps): JSX.Element => {
	const [prop, others] = splitProps(props, [
		'className',
		'disabled',
		'name',
		'defaultIndex',
		'options',
		'value',
		'style',
		'onSelect',
	]);

	const [value, setValue] = createSignal<SelectValueProp>({ value: '', name: '' });
	createEffect(() => prop.onSelect?.(value().value));

	return (
		<InputSelectContext.Provider value={{}}>
			<select
				{...others}
				id={prop.name}
				name={prop.name}
				class={
					inputStyles({ disabled: prop.disabled, style: prop.style }) +
					' '.concat(prop.className || '')
				}
				onChange={(e: Event) => {
					const value = (e.target as HTMLSelectElement).value;
					setValue({ name: prop.name, value });
					props.onSelect?.(value);
				}}
			>
				<For each={prop.options}>
					{(option, i) => (
						<option
							value={String(option.value)}
							selected={i() === prop.defaultIndex}
						>
							{option.name}
						</option>
					)}
				</For>
			</select>
		</InputSelectContext.Provider>
	);
};
