import { type JSX, createEffect, onCleanup, createMemo } from 'solid-js';
import { createModal, ModalContext, type ModalContextProps } from './context';

/**
 * Properties for rendering a modal component.
 * @param children - The content to be rendered inside the modal.
 * @param ctx - Optional. A specific modal context to control the modal state.
 * If not provided, a new modal context is created.
 */
export type ModalProps = {
	id?: string;
	onOpen?: () => void;
	onClose?: () => void;
};

/**
 * Modal component to manage the visibility and behavior of a modal dialog.
 * - Renders the modal content based on the provided or default context.
 * - Handles outside clicks and the Escape key to close the modal.
 *
 * @param props - Accepts `ModalProps` to define the modal's content and optional modal context.
 */
export const Modal = (
	props: ModalProps & {
		ctx?: ModalContextProps;
		children: JSX.Element;
	},
): JSX.Element => {
	const ctx = props.ctx || createModal(props.id, props.onOpen, props.onClose);

	let modalContentTarget: HTMLElement | null;

	const handleOutsideClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target.contains(modalContentTarget)) ctx.close();
	};

	const handleEscapeKey = (e: KeyboardEvent) => {
		if (e.key === 'Escape') ctx.close();
	};

	const addEvents = () => {
		window.addEventListener('click', handleOutsideClick);
		window.addEventListener('keydown', handleEscapeKey);
	};

	const rmEvents = () => {
		window.removeEventListener('click', handleOutsideClick);
		window.removeEventListener('keydown', handleEscapeKey);
	};

	createEffect(() => {
		const isOpen = createMemo(() => ctx.isShown());

		isOpen() ? addEvents() : rmEvents();

		if (isOpen() && modalContentTarget !== null) {
			modalContentTarget = document.querySelector('.modal-content-target');
		}
	});

	onCleanup(() => rmEvents);

	return <ModalContext.Provider value={ctx}>{props.children}</ModalContext.Provider>;
};
