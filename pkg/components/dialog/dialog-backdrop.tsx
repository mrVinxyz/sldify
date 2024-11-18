import { cva, type VariantProps } from 'class-variance-authority';
import type { JSX } from 'solid-js';
import { useDialog } from './dialog';
import { Portal } from 'solid-js/web';

type DialogBackdropProps = VariantProps<typeof dialogBackdropVariants> &
	JSX.IntrinsicElements['div'];

const dialogBackdropVariants = cva('fixed inset-0 z-10', {
	variants: {
		variant: {
			default: 'bg-black/50',
			light: 'bg-white/80',
			blur: 'backdrop-blur-sm bg-transparent',
			solid: 'bg-neutral-950',
			none: 'hidden',
		},
		animation: {
			fade: 'animate-in fade-in duration-200',
			scale: 'animate-in fade-in scale-in-95 duration-200',
			none: '',
		},
	},
	defaultVariants: {
		variant: 'default',
		animation: 'fade',
	},
});

const DialogBackdrop = (props: DialogBackdropProps) => {
	const dialog = useDialog();
	return (
		<Portal>
			<div
				class={dialogBackdropVariants({
					variant: props.variant,
					class: `${props.class} ${!dialog.isActive() ? 'hidden' : ''}`,
				})}
				aria-hidden='true'
			/>
		</Portal>
	);
};

export { type DialogBackdropProps, DialogBackdrop };
