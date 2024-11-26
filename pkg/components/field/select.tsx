import { For, type JSX, splitProps } from 'solid-js';
import { cva, type VariantProps } from 'class-variance-authority';

export type SelectOption<T = unknown> = {
	label: string;
	value: T;
};

const selectVariants = cva(
	'block w-full text-sm font-medium transition-colors rounded-lg focus-visible:outline-none focus:ring-2 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500',
				success:
					'bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-500',
				error: 'bg-red-50 border border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-red-500',
			},
			size: {
				sm: 'p-1.5',
				md: 'p-2',
				lg: 'p-2.5',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	},
);

type SelectProps<T = unknown> = {
	options: SelectOption<T>[];
	placeholder?: string;
	defaultValue?: T;
	onChange?: (value: T) => void;
	value?: T;
} & Omit<JSX.IntrinsicElements['select'], 'size' | 'onChange'> &
	VariantProps<typeof selectVariants>;

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
			class={selectVariants({
				variant: local.variant,
				size: local.size,
				class: local.class,
			})}
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

export { type SelectProps, Select };
