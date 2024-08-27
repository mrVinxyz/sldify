import {
	type JSX,
	Show,
	createContext,
	createEffect,
	createSignal,
	onCleanup,
	useContext,
	createMemo,
} from 'solid-js';
import {Portal} from "solid-js/web";

/**
 * Enum representing the state of the modal.
 */
export enum ModalState {
	SHOW = 'show',
	HIDE = 'hide',
}

/**
 * Props for the ModalContext, including state, setState, isOpen, and isHidden.
 */
export type ModalContextProps = {
	/** Function to get the current state of the modal. */
	state: () => ModalState;
	/** Function to set the state of the modal. */
	setState: (state: ModalState) => void;
	/** Function to check if the modal is open. */
	isOpen: () => boolean;
	/** Function to check if the modal is hidden. */
	isHidden: () => boolean;
};

/**
 * Context to provide modal state and handling.
 */
const ModalContext = createContext<ModalContextProps>();

/**
 * Custom hook to use the modal context.
 *
 * @returns {ModalContextProps} - The context properties for the modal.
 * @throws Will throw an error if used outside a Modal component.
 */
export function useModal(): ModalContextProps {
	const ctx = useContext(ModalContext);
	if (!ctx) throw new Error('useModal must be used within a Modal component');
	return ctx;
}

/**
 * Component to provide modal context and manage modal state.
 *
 * @param {Object} props - The properties for the Component.
 * @param {JSX.Element} props.children - The child elements to be rendered inside the modal.
 * @returns {JSX.Element} - The rendered Component.
 */
const Component = (props: { children: JSX.Element }): JSX.Element => {
	const [state, setState] = createSignal<ModalState>(ModalState.HIDE);
	const isOpen = () => state() === ModalState.SHOW;
	const isHidden = () => state() === ModalState.HIDE;

	const ctxValue = {
		state,
		setState,
		isOpen,
		isHidden,
	};

	let modalContentTarget: HTMLElement | null;
	createEffect(() => {
		const hasOpen = createMemo(() => isOpen());
		if (hasOpen()) {
			window.addEventListener('click', handleOutsideClick);
			window.addEventListener('keydown', handleEscapeKey);
		}

		if (hasOpen() && modalContentTarget !== null) {
			modalContentTarget = document.querySelector('.modal-content-target');
		}
	});

	createEffect(() => {
		if (isHidden()) {
			window.removeEventListener('click', handleOutsideClick);
			window.removeEventListener('keydown', handleEscapeKey);
		}
	});

	const handleOutsideClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target.contains(modalContentTarget)) {
			setState(ModalState.HIDE);
		}
	};

	const handleEscapeKey = (e: KeyboardEvent) => {
		const key = e.key;
		if (key === 'Escape') setState(ModalState.HIDE);
	};

	onCleanup(() => {
		window.removeEventListener('click', handleOutsideClick);
		window.removeEventListener('keydown', handleEscapeKey);
	});

	return <ModalContext.Provider value={ctxValue}>{props.children}</ModalContext.Provider>;
};

/**
 * Component to trigger the modal open or close action.
 *
 * @param {Object} props - The properties for the Trigger component.
 * @param {JSX.Element} props.children - The child elements to be rendered inside the trigger.
 * @param {'open' | 'close'} props.action - The action to perform on click or key press.
 * @returns {JSX.Element} - The rendered Trigger component.
 */
const Trigger = (props: { children: JSX.Element; action: 'open' | 'close' }): JSX.Element => {
	const { setState } = useModal();

	/**
	 * Update the modal state based on the action.
	 */
	const updateModalState = () => {
		if (props.action === 'open') {
			setState(ModalState.SHOW);
		} else {
			setState(ModalState.HIDE);
		}
	};

	return (
		<div
			onClick={updateModalState}
			onKeyDown={(e: KeyboardEvent) => {
				const key = e.key;
				if (key === 'Enter' || key === 'Backspace') updateModalState();
			}}
		>
			{props.children}
		</div>
	);
};

/**
 * Props for the Content component, including children, size, and position.
 */
type ModalContentProps = {
	children: JSX.Element;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	position?: 'top' | 'bottom' | 'middle';
};

/**
 * Component to render the modal content with specified size and position.
 *
 * @param {ModalContentProps} props - The properties for the Content component.
 * @returns {JSX.Element} - The rendered Content component.
 */
const Content = (props: ModalContentProps): JSX.Element => {
	const { isOpen } = useModal();

	const sizeClass = (): string => {
		switch (props.size) {
			case 'sm':
				return 'max-w-xl';
			case 'md':
				return 'max-w-2xl';
			case 'lg':
				return 'max-w-4xl';
			case 'xl':
				return 'max-w-6xl';
			default:
				return 'max-w-2xl';
		}
	};

	const positionClass = (): string => {
		switch (props.position) {
			case 'top':
				return 'md:bottom-36';
			case 'bottom':
				return 'md:top-36';
			default:
				return '';
		}
	};

	return (
		<Show when={isOpen()}>
			<div
				tabindex='-1'
				class={
					'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 flex justify-center items-center w-full h-full max-h-full'
				}
			>
				<div class={`relative p-4 w-full max-h-full ${sizeClass()} ${positionClass()}`}>
					<div class='relative bg-white rounded-lg shadow modal-content-target'>
						{props.children}
					</div>
				</div>
			</div>

			<Portal mount={document.body}><div class={'fixed inset-0 h-screen w-screen bg-black opacity-20'}/></Portal>
		</Show>
	);
};

/**
 * Modal components collection.
 */
export const Modal = {
	Component,
	Trigger,
	Content,
};
