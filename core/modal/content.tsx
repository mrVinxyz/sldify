import { createEffect, type JSX, Show } from 'solid-js';
import { cva } from 'class-variance-authority';
import { Portal } from 'solid-js/web';
import { useModal } from './context';
import type { ClassName } from '../types';

export type ModalContentProps = {
	children: JSX.Element;
	size?: ModalContentSizeVariant;
	position?: ModalContentPositionVariant;
	className?: ClassName;
};

export type ModalContentSizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ModalContentPositionVariant = 'top' | 'bottom' | 'middle';

const modalContentClass = cva('relative p-4 w-full max-h-full', {
	variants: {
		size: {
			xs: 'max-w-md',
			sm: 'max-w-xl',
			md: 'max-w-2xl',
			lg: 'max-w-4xl',
			xl: 'max-w-6xl',
		},
		position: {
			top: 'md:bottom-36',
			bottom: 'md:top-36',
			middle: '',
		},
	},
	defaultVariants: {
		size: 'md',
		position: 'middle',
	},
});

export const ModalContent = (props: ModalContentProps) => {
	const modalCtx = useModal();

	const modalWrapperClass = cva(
		'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full max-h-full max-w-full focus:outline-none',
	);

	const modalInnerContentClass = cva('relative    modal-content-target z-50');

	const Backdrop = () => <div class={'fixed inset-0 h-screen w-screen bg-black opacity-20'} />;

	createEffect(() => {
		if (modalCtx.isShown()) document.getElementById(modalCtx.id)?.focus();
	});

	return (
		<Show when={modalCtx.isShown()}>
			<Portal mount={document.body}>
				<div
					class={modalWrapperClass()}
					tabindex={-1}
					id={modalCtx.id}
					role='dialog'
					aria-modal='true'
				>
					<div
						class={modalContentClass({
							size: props.size,
							position: props.position,
						})}
					>
						<div
							class={modalInnerContentClass().concat(
								props.className ? ` ${props.className}` : '',
							)}
						>
							{props.children}
						</div>
					</div>
				</div>
				<Backdrop />
			</Portal>
		</Show>
	);
};
