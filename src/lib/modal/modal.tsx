import {
	createContext,
	createEffect,
	createSignal,
	type JSX,
	onCleanup,
	Show,
	useContext,
} from 'solid-js';

export enum ModalState {
	SHOW = 'show',
	HIDE = 'hide',
}

export type ModalContextProps = {
	state: () => ModalState;
	setState: (state: ModalState) => void;
	isOpen: () => boolean;
	isHidden: () => boolean;
};

const ModalContext = createContext<ModalContextProps>();

export function useModal(): ModalContextProps {
	const ctx = useContext(ModalContext);
	if (!ctx) throw new Error('useModal must be used within a Modal component');
	return ctx;
}

const Component = (props: { children: JSX.Element }) => {
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
		if (isOpen() && modalContentTarget !== null) {
			modalContentTarget = document.querySelector('.modal-content-target');
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

	createEffect(() => {
		if (isOpen()) {
			window.addEventListener('click', handleOutsideClick);
			window.addEventListener('keydown', handleEscapeKey);
		}
	});

	createEffect(() => {
		if (isHidden()) {
			window.removeEventListener('click', handleOutsideClick);
			window.removeEventListener('keydown', handleEscapeKey);
		}
	});

	onCleanup(() => {
		window.removeEventListener('click', handleOutsideClick);
		window.removeEventListener('keydown', handleEscapeKey);
	});

	return <ModalContext.Provider value={ctxValue}>{props.children}</ModalContext.Provider>;
};

const Trigger = (props: {
	children: JSX.Element;
	action: 'open' | 'close';
}) => {
	const { setState } = useModal();

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
			onKeyPress={(e: KeyboardEvent) => {
				const key = e.key;
				if (key === 'Enter' || key === 'Backspace') updateModalState();
			}}
		>
			{props.children}
		</div>
	);
};

const Content = (props: { children: JSX.Element }) => {
	const { isOpen } = useModal();
	return (
		<Show when={isOpen()}>
			<div
				tabindex='-1'
				aria-hidden='true'
				class='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full'
			>
				<div class='relative p-4 w-full max-w-2xl max-h-full'>
					<div class='relative bg-white rounded-md shadow modal-content-target'>
						{props.children}
					</div>
				</div>
			</div>
		</Show>
	);
};

export const Modal = {
	Component,
	Trigger,
	Content,
};
