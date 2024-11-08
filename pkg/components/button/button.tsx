import type { VariantProps } from 'class-variance-authority';
import { type Component, type JSX, splitProps } from 'solid-js';
import buttonVariants from './variants';
import type { View } from '../../utils/types';
import {buttonAria} from "./aria";

type ButtonProps = JSX.IntrinsicElements['button'] &
	VariantProps<typeof buttonVariants> & {
		leading?: View;
		trailing?: View;
		controls?: string;
		labelText?: string;
	};

const Button: Component<ButtonProps> = (props) => {
	const [local, rest] = splitProps(props, [
		'type',
		'variant',
		'color',
		'size',
		'class',
		'loading',
		'leading',
		'trailing',
		'children',
	]);

	const aria = buttonAria(props);

	return (
		<button
			class={buttonVariants({
				variant: local.variant,
				color: local.color,
				size: local.size,
				class: local.class,
				hasIcon: !!(local.leading || local.trailing),
			})}
			disabled={local.loading !== undefined}
			type={local.type || 'button'}
			{...aria}
			{...rest}
		>
			{local.loading && local.loading === 'left' && (
				<span class='me-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
			)}

			{local.leading}

			{local.children}

			{local.trailing}

			{local.loading && local.loading === 'right' && (
				<span class='ms-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
			)}
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
