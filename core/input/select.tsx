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
	const [local, others] = splitProps(props, [
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
	createEffect(() => local.onSelect?.(value().value));

	return (
		<InputSelectContext.Provider value={{}}>
			<select
				{...others}
				id={local.name}
				name={local.name}
				class={
					inputStyles({ disabled: local.disabled, style: local.style }) +
					' '.concat(local.className || '')
				}
				onChange={(e: Event) => {
					const value = (e.target as HTMLSelectElement).value;
					setValue({ name: local.name, value });
					props.onSelect?.(value);
				}}
			>
				<For each={local.options}>
					{(option, i) => (
						<option
							value={String(option.value)}
							selected={i() === local.defaultIndex}
						>
							{option.name}
						</option>
					)}
				</For>
			</select>
		</InputSelectContext.Provider>
	);
};
