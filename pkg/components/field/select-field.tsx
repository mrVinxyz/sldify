import { type Component, For, type JSX, splitProps } from 'solid-js';
import { cva, type VariantProps } from 'class-variance-authority';
import { FieldGroup, type FieldGroupProps } from './field';
import type { BaseInputProps } from './base';
import cn from "../../utils/cn";

const SELECT_STYLES = [
	'block w-full text-sm font-medium rounded-lg transition-colors focus-visible:outline-none focus:ring-2',
	'bg-gray-50 border border-gray-300 text-gray-900',
	'focus:ring-blue-500 focus:border-blue-500',
	'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white',
	'dark:focus:ring-blue-500 dark:focus:border-blue-500',
	'disabled:cursor-not-allowed disabled:opacity-50',

	'data-[state=success]:bg-green-50 data-[state=success]:border-green-500 data-[state=success]:text-green-900',
	'data-[state=success]:dark:text-green-400 data-[state=success]:dark:border-green-500',
	'data-[state=success]:focus:ring-green-500 data-[state=success]:focus:border-green-500',
	'data-[state=success]:dark:focus:ring-green-500 data-[state=success]:dark:focus:border-green-500',

	'data-[state=error]:bg-red-50 data-[state=error]:border-red-500 data-[state=error]:text-red-900',
	'data-[state=error]:dark:text-red-400 data-[state=error]:dark:border-red-500',
	'data-[state=error]:focus:ring-red-500 data-[state=error]:focus:border-red-500',
	'data-[state=error]:dark:focus:ring-red-500 data-[state=error]:dark:focus:border-red-500',

	'data-[size=sm]:p-1.5 data-[size=sm]:text-xs',
	'data-[size=md]:p-2 data-[size=md]:text-sm',
	'data-[size=lg]:p-2.5 data-[size=lg]:text-base',
].join(' ');

export type SelectOption<T = unknown> = {
	label: string;
	value: T;
};

type SelectProps<T = unknown> = {
	options: SelectOption<T>[];
	placeholder?: string;
	defaultValue?: T;
	onChange?: (value: T) => void;
	value?: T;
} & BaseInputProps &
	Omit<JSX.IntrinsicElements['select'], 'size' | 'onChange'>;

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const createObjectHash = <T,>(obj: T): string => {
	if (!isPlainObject(obj)) {
		return String(obj);
	}

	const sortedKeys = Object.keys(obj).sort();
	const hashObj = sortedKeys.reduce(
		(acc, key) => {
			acc[key] = obj[key];
			return acc;
		},
		{} as Record<string, unknown>,
	);

	return JSON.stringify(hashObj);
};

const isSelected = <T,>(option: T, value: unknown): boolean => {
	let selected: boolean;

	if (isPlainObject(option)) {
		const optionHash = createObjectHash(option);
		const valueHash = createObjectHash(value);
		selected = optionHash === valueHash;
	} else {
		selected = option === value;
	}

	return selected;
};

const valueParser = (value: unknown): string | string[] | number => {
	if (value === null || value === undefined) return '';

	const valueType = typeof value;

	if (Array.isArray(value)) {
		return value.map(String);
	}

	if (valueType === 'object') {
		return JSON.stringify(value);
	}

	if (valueType === 'number') {
		return value as number;
	}

	return String(value);
};

const Select = <T,>(props: SelectProps<T>) => {
	const [local, rest] = splitProps(props, [
		'variant',
		'size',
		'class',
		'options',
		'placeholder',
		'value',
		'defaultValue',
		'onChange',
	]);

	const currentValue = local.value ?? local.defaultValue;

	const handleChange = (e: Event) => {
		const select = e.target as HTMLSelectElement;
		const selectedOption = local.options.find((opt) => valueParser(opt.value) === select.value);
		if (selectedOption && local.onChange) {
			local.onChange(selectedOption.value);
		}
	};

	return (
		<select
			class={cn(SELECT_STYLES, local.class)}
			data-state={local.variant !== 'default' ? local.variant : undefined}
			data-size={local.size || 'md'}
			onChange={handleChange}
			value={currentValue !== undefined ? valueParser(currentValue) : ''}
			{...rest}
		>
			{local.placeholder && (
				<option
					value=''
					disabled
					selected
				>
					{local.placeholder}
				</option>
			)}
			<For each={local.options}>
				{(option) => (
					<option
						value={valueParser(option.value)}
						selected={isSelected(option.value, local.value || local.defaultValue)}
					>
						{option.label}
					</option>
				)}
			</For>
		</select>
	);
};

type SelectFieldProps<T = unknown> = SelectProps<T> & Omit<FieldGroupProps, 'child' | 'variant'>;

const SelectField: Component<SelectFieldProps> = (props) => {
	const [fieldProps, selectProps] = splitProps(props, [
		'name',
		'label',
		'containerClass',
		'labelClass',
		'labelSrOnly',
		'help',
		'error',
		'required',
	]);

	return (
		<FieldGroup
			{...fieldProps}
			variant={selectProps.variant}
			child={(childProps) => (
				<Select
					{...childProps}
					{...selectProps}
				/>
			)}
		/>
	);
};

export { type SelectFieldProps, SelectField };
