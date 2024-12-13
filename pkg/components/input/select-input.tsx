import { type Component, type JSX, splitProps } from 'solid-js';
import { Select, type SelectProps } from './select';
import { Input, type InputProps } from './input';
import { cva, type VariantProps } from 'class-variance-authority';

type SelectInputProps<T> = JSX.IntrinsicElements['div'] &
	VariantProps<typeof selectInputVariants> & {
		select: SelectProps<T>;
		input: InputProps;
	};

const selectInputVariants = cva('relative flex', {
	variants: {
		rounded: {
			none: '',
			sm: '[&>select]:rounded-s-sm [&>input]:rounded-e-sm',
			md: '[&>select]:rounded-s-md [&>input]:rounded-e-md',
			lg: '[&>select]:rounded-s-lg [&>input]:rounded-e-lg',
			xl: '[&>select]:rounded-s-xl [&>input]:rounded-e-xl',
			full: '[&>select]:rounded-s-full [&>input]:rounded-e-full',
		},
	},
	defaultVariants: {
		rounded: 'md',
	},
});

const SelectInput = <T,>(props: SelectInputProps<T>) => {
	const [local, rest] = splitProps(props, ['select', 'input', 'rounded', 'class']);
	console.log(local.select)
	return (
		<div
			class={selectInputVariants({ rounded: local.rounded, class: local.class })}
			{...rest}
		>
			<Select
				{...local.select}
				class={'rounded-none !w-min pe-8 '.concat(local.select?.class || '')}
			/>
			<Input
				{...local.input}
				class={'rounded-none '.concat(local.input?.class || '')}
			/>
		</div>
	);
};

export { type SelectInputProps, SelectInput };
