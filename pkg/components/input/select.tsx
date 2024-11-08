import { For, type JSX, splitProps } from 'solid-js';
import { cva, type VariantProps } from 'class-variance-authority';

type SelectOption<T = unknown> = {
	label: string;
	value: T;
};

type SelectProps<T = unknown> = Omit<JSX.IntrinsicElements['select'], 'value' | 'onChange'> &
	VariantProps<typeof selectVariants> & {
		options?: SelectOption<T>[];
		defaultOption?: number;
		value?: T;
		onChange?: (value: T) => void;
		placeholder?: string;
	};

const selectVariants = cva(
	'block w-full text-sm font-medium transition-colors focus-visible:outline-none focus:ring-2 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60 select',
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
				xs: 'p-1.5',
				sm: 'p-2',
				md: 'p-2.5',
				lg: 'p-3',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	},
);

function selectAria<T>(props: SelectProps<T>) {
	const selectId = props.id || props.name;

	return {
		id: selectId,
		'aria-describedby': props.name,
		'aria-invalid': props.variant === 'error' ? true : undefined,
		'aria-required': props.required,
		'aria-disabled': props.disabled,
	} as const;
}

function Select<T>(props: SelectProps<T>) {
	const [local, rest] = splitProps(props, [
		'options',
		'value',
		'onChange',
		'placeholder',
		'variant',
		'size',
		'class',
		'defaultOption'
	]);

	const aria = selectAria(props);

	const valueParser = (value: unknown) => {
		if (value === null || value === undefined) return '';
		return typeof value === 'object' ? JSON.stringify(value) : String(value);
	};

	const handleChange = (e: Event) => {
		const target = e.target as HTMLSelectElement;
		const selectedValue = target.value;

		const parsedValue = valueParser(selectedValue);

		local.onChange?.(parsedValue as T);
	};

	const isSelected = (option: T, index: number): boolean => {
		let selected: boolean;

		if (typeof option === 'object' && option !== null) {
			selected = JSON.stringify(option) === JSON.stringify(local.value);
		} else {
			selected = option === local.value;
		}

		if (!selected) {
			selected = index === local.defaultOption;
		}

		return selected;
	};

	return (
		<select
			class={selectVariants({
				variant: local.variant,
				size: local.size,
				class: local.class,
			})}
			value={valueParser(local.value)}
			onChange={handleChange}
			{...aria}
			{...rest}
		>
			{local.placeholder && (
				<option
					value=''
				>
					{local.placeholder}
				</option>
			)}
			<For each={local.options}>
				{(option, i) => (
					<option
						value={valueParser(option.value)}
						selected={isSelected(option.value, i())}
					>
						{option.label}
					</option>
				)}
			</For>
		</select>
	);
}

export { type SelectProps, type SelectOption, Select };
