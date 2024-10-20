import { type JSX, createEffect, onCleanup, createMemo } from 'solid-js';
import { createModal, ModalContext, type ModalContextProps } from './context';
import type { OptChild, OptComponentCtx, View } from '../types';

export type ModalProps = {
	id?: Readonly<string>;
	onOpen?: () => void;
	onClose?: () => void;
};

export function Modal(props: ModalProps & OptChild & OptComponentCtx<ModalContextProps>): View {
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
}
