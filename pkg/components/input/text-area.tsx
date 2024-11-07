import { splitProps, type Component, type JSX } from 'solid-js';
import { cva, type VariantProps } from 'class-variance-authority';

type TextAreaProps = JSX.IntrinsicElements['textarea'] & VariantProps<typeof textAreaVariants>;

const textAreaVariants = cva(
	'block w-full text-sm font-medium transition-colors focus-visible:outline-none focus:ring-2 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			variant: {
				plain: '',
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
			rounded: {
				none: 'rounded-none',
				sm: 'rounded-sm',
				md: 'rounded-md',
				lg: 'rounded-lg',
				xl: 'rounded-xl',
				full: 'rounded-full',
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
			rounded: 'lg',
		},
	},
);

function textAreaAria(props: TextAreaProps) {
	const textAreaId = props.id || props.name;

	return {
		id: textAreaId,
		'aria-describedby': props.name,
		'aria-invalid': props.variant === 'error' ? true : undefined,
		'aria-required': props.required,
		'aria-disabled': props.disabled,
	} as const;
}

const TextArea: Component<TextAreaProps> = (props) => {
	const [local, rest] = splitProps(props, ['variant', 'size', 'rounded', 'class']);
	const aria = textAreaAria(props);

	return (
		<textarea
			class={textAreaVariants({
				variant: local.variant,
				size: local.size,
				rounded: local.rounded,
				class: local.class,
			})}
			{...aria}
			{...rest}
		/>
	);
};

export { type TextAreaProps, TextArea, textAreaVariants };
