import { type Component, type JSX, splitProps } from 'solid-js';
import { cva, type VariantProps } from 'class-variance-authority';

const inputGroupVariants = cva('relative w-full col-span-12', {
	variants: {
		size: {
			xs: 'md:col-span-2',
			sm: 'md:col-span-4',
			md: 'md:col-span-6',
			lg: 'md:col-span-8',
			xl: 'md:col-span-10',
			full: 'md:col-span-12',
		},
	},
	defaultVariants: {
		size: 'md',
	},
});

type InputGroupProps = JSX.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof inputGroupVariants>;

const InputGroup: Component<InputGroupProps> = (props) => {
	const [local, rest] = splitProps(props, ['size', 'class', 'children']);

	return (
		<div
			class={inputGroupVariants({ size: local.size, class: local.class })}
			{...rest}
		>
			{local.children}
		</div>
	);
};

export { InputGroup, type InputGroupProps, inputGroupVariants };
