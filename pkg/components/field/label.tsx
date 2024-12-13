import { type Component, type JSX, splitProps } from 'solid-js';
import { cva, type VariantProps } from 'class-variance-authority';

const labelVariants = cva('block text-sm font-medium', {
	variants: {
		variant: {
			default: 'text-neutral-800 dark:text-neutral-100',
			error: 'text-red-600 dark:text-red-400',
			success: 'text-green-600 dark:text-green-400',
		},
		required: {
			true: 'after:content-["*"] after:ml-0.5 after:text-red-500',
			false: '',
		},
		srOnly: {
			true: 'sr-only',
			false: '',
		},
	},
	defaultVariants: {
		variant: 'default',
		required: false,
		srOnly: false,
	},
});

type LabelProps = {
	for: string;
} & Omit<JSX.IntrinsicElements['label'], 'for'> &
	VariantProps<typeof labelVariants>;

const Label: Component<LabelProps> = (props) => {
	const [local, rest] = splitProps(props, ['variant', 'required', 'srOnly', 'class', 'for']);
	return (
		<label
			for={local.for}
			class={labelVariants({
				variant: local.variant,
				required: local.required,
				srOnly: local.srOnly,
				class: local.class,
			})}
			{...rest}
		/>
	);
};

export { type LabelProps, Label };
