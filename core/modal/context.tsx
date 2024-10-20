import { createContext, createSignal, useContext } from 'solid-js';
import { randomHash } from '../utils';

export type ModalState = 'shown' | 'hidden';

export type ModalContextProps = {
	state: () => ModalState;
	setState: (state: ModalState) => void;
	open: () => void;
	close: () => void;
	isShown: () => boolean;
	isHidden: () => boolean;
	id: Readonly<string>;
};

export const ModalContext = createContext<ModalContextProps>();

const modalStack: ModalContextProps[] = [];

export function createModal(
	id: string = randomHash(),
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
			id,
		});
		onOpen?.();
	};

	const close = () => {
		modalStack.pop()?.setState('hidden');

		modalStack.at(-1)?.setState('shown');
		onClose?.();
	};

	return { state, setState, open, close, isShown, isHidden, id };
}

export function useModal(): ModalContextProps {
	const ctx = useContext(ModalContext);
	if (!ctx) throw new Error('useModal must be used within a Modal component');
	return ctx;
}
