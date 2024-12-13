import { type Component, type JSX, splitProps } from 'solid-js';
import { cva, type VariantProps } from 'class-variance-authority';

type InputProps = JSX.IntrinsicElements['input'] & VariantProps<typeof inputVariants>;

const inputVariants = cva(
	'block w-full text-sm font-medium transition-colors focus-visible:outline-none focus:ring-2 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 input',
	{
		variants: {
			variant: {
				plain: '',
				default:
					'bg-gray-50 border border-gray-300 text-neutral-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500',
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
		compoundVariants: [
			{
				variant: 'default',
			},
		],
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	},
);

function inputAria(props: InputProps) {
	const inputId = props.id || props.name;

	return {
		id: inputId,
		'aria-describedby': props.name,
		'aria-invalid': props.variant === 'error' ? true : undefined,
		'aria-required': props.required,
		'aria-disabled': props.disabled,
	} as const;
}

const Input: Component<InputProps> = (props) => {
	const [local, rest] = splitProps(props, ['variant', 'size', 'class']);
	const aria = inputAria(props);

	return (
		<input
			class={inputVariants({
				variant: local.variant,
				size: local.size,
				class: local.class,
			})}
			{...aria}
			{...rest}
		/>
	);
};

export { type InputProps, Input, inputVariants };
