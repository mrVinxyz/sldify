import { createContext, createSignal, useContext } from 'solid-js';
import { randomHash } from '../utils';

/**
 * States of a modal.
 * @param shown This puts the modal in current view scope.
 * @param hidden This removes the modal from the current view scope.
 */
export type ModalState = 'shown' | 'hidden';

/**
 * Methods a `Context` has:
 * @param state - Returns the current state of the modal.
 * @param setState - Updates the modal state.
 * @param open - Opens the modal.
 * @param close - Closes the modal.
 * @param isShown - Returns true if the modal is shown.
 * @param isHidden - Returns true if the modal is hidden.
 */
export type ModalContextProps = {
	state: () => ModalState;
	setState: (state: ModalState) => void;
	open: () => void;
	close: () => void;
	isShown: () => boolean;
	isHidden: () => boolean;
	modalId: Readonly<string>;
};

/** The context instance for managing modal state and behaviors. */
export const ModalContext = createContext<ModalContextProps>();

/** Maintain the stack of active modal dialog contexts. */
const modalStack: ModalContextProps[] = [];

/** Creates the modal state and its behaviors. */
export function createModal(
	modalId: string = randomHash(),
	onOpen?: () => void,
	onClose?: () => void,
): ModalContextProps {
	const [state, setState] = createSignal<ModalState>('hidden');
	const [isShown, isHidden] = [() => state() === 'shown', () => state() === 'hidden'];

	const open = () => {
		const currentModal = modalStack.at(-1);
		currentModal?.setState('hidden');

		setState('shown');
		modalStack.push({
			state,
			setState,
			open,
			close,
			isShown,
			isHidden,
			modalId,
		});
		onOpen?.();
	};

	const close = () => {
		modalStack.pop()?.setState('hidden');

		modalStack.at(-1)?.setState('shown');
		onClose?.();
	};

	return { state, setState, open, close, isShown, isHidden, modalId };
}

/** Access the modal functionalities within a Modal context. */
export function useModal(): ModalContextProps {
	const ctx = useContext(ModalContext);
	if (!ctx) throw new Error('useModal must be used within a Modal component');
	return ctx;
}
