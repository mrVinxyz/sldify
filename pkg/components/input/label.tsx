import { type Component, type JSX, splitProps } from 'solid-js';
import { cva, type VariantProps } from 'class-variance-authority';

type LabelProps = JSX.LabelHTMLAttributes<HTMLLabelElement> &
	VariantProps<typeof labelVariants> & {
		required?: boolean;
	};

const labelVariants = cva('block mb-2 text-sm font-medium', {
	variants: {
		variant: {
			default: 'text-gray-900 dark:text-white',
			error: 'text-red-600 dark:text-red-400',
			success: 'text-green-600 dark:text-green-400',
		},
		required: {
			true: 'after:content-["*"] after:ml-0.5 after:text-red-500',
			false: '',
		},
	},
	defaultVariants: {
		variant: 'default',
		required: false,
	},
});

const Label: Component<LabelProps> = (props) => {
	const [local, rest] = splitProps(props, ['variant', 'required', 'children', 'class']);

	return (
		<label
			class={labelVariants({
				variant: local.variant,
				required: local.required,
				class: local.class,
			})}
			aria-required={local.required}
			{...rest}
		>
			{local.children}
			{/*{local.required && <span class='text-red-500 ml-1'>*</span>}*/}
		</label>
	);
};

export { Label, type LabelProps };
