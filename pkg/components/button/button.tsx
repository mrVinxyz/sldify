import type { VariantProps } from 'class-variance-authority';
import { type Component, type JSX, splitProps } from 'solid-js';
import buttonVariants from './variants';
import type { View } from '../../utils/types';

type ButtonProps = JSX.IntrinsicElements['button'] &
	VariantProps<typeof buttonVariants> & {
		leading?: View;
		trailing?: View;
		loading?: boolean;
		controls?: string;
		labelText?: string;
	};

const Button: Component<ButtonProps> = (props) => {
	const [local, rest] = splitProps(props, [
		'type',
		'variant',
		'color',
		'size',
		'rounded',
		'class',
		'loading',
		'leading',
		'trailing',
		'children',
	]);

	return (
		<button
			class={buttonVariants({
				variant: local.variant,
				color: local.color,
				size: local.size,
				rounded: local.rounded,
				class: local.class,
				hasIcon: !!(local.leading || local.trailing),
			})}
			disabled={local.loading}
			type={local.type || 'button'}
			{...rest}
		>
			{local.loading && (
				<span class='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
			)}
			{local.leading}
			{local.children}
			{local.trailing}
		</button>
	);
};

const SubmitBtn: Component<ButtonProps> = (props) => (
	<Button
		type={'submit'}
		{...props}
	/>
);

const ResetBtn: Component<ButtonProps> = (props) => (
	<Button
		type={'reset'}
		{...props}
	/>
);

export { type ButtonProps, Button, SubmitBtn, ResetBtn };
