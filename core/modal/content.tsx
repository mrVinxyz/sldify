import { createEffect, type JSX, Show } from 'solid-js';
import { cva, type VariantProps } from 'class-variance-authority';
import { Portal } from 'solid-js/web';
import { useModal } from './context';
import type { ClassName } from '../types';

/**
 * Properties for configuring the modal content.
 * @param children - JSX element that represents the modal's content.
 * @param size - Defines the width of the modal. Defaults to 'md'.
 *  - 'sm': Small modal size.
 *  - 'md': Medium modal size.
 *  - 'lg': Large modal size.
 *  - 'xl': Extra large modal size.
 * @param position - Specifies the vertical positioning of the modal. Defaults to 'middle'.
 *  - 'top': Aligns the modal near the top of the view.
 *  - 'bottom': Aligns the modal near the bottom of the view.
 *  - 'middle': Centers the modal vertically in the view.
 */
export type ModalContentProps = VariantProps<typeof modalContentClass> & {
	children: JSX.Element;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	className?: ClassName;
};

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

/**
 * Component to render everything which will be shown within a modal.
 * - The content is shown based on the current modal context state.
 * - It appends the modal backdrop to the body, ensuring it overlays the entire screen.
 * @param props - Props to define size, position, and modal content.
 */
export const ModalContent = (props: ModalContentProps) => {
	const modalCtx = useModal();

	const modalWrapperClass = cva(
		'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full max-h-full max-w-full focus:outline-none',
	);

	const modalInnerContentClass = cva('relative    modal-content-target z-50');

	const Backdrop = () => <div class={'fixed inset-0 h-screen w-screen bg-black opacity-20'} />;

	createEffect(() => {
		if (modalCtx.isShown()) document.getElementById(modalCtx.modalId)?.focus();
	});

	return (
		<Show when={modalCtx.isShown()}>
			<Portal mount={document.body}>
				<div
					class={modalWrapperClass()}
					tabindex={-1}
					id={modalCtx.modalId}
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
