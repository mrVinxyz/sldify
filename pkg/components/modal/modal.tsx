import {  Dialog, type DialogContext, type DialogProps } from '../dialog/dialog';
import {
	type Component,
	createContext,
	createSignal,
	useContext,
} from 'solid-js';
import generateId from '../../utils/id';

type ModalContext = DialogContext & {
	closeAll: () => void;
};

const modalDialogContext = createContext<ModalContext>();

function useModalDialog() {
	const ctx = useContext(modalDialogContext);
	if (!ctx) throw new Error('useModalDialog must be used within a ModalDialog');
	return ctx;
}

const modalStack: ModalContext[] = [];

function createModal(props?: DialogProps): ModalContext {
	const dialogId = props?.id || generateId('dialog');
	const [active, setActive] = createSignal(props?.defaultOpen ?? false);

	const modalCtx: ModalContext = {
		id: () => dialogId,
		open: () => {
			const currentModal = modalStack.at(-1);
			if (currentModal) {
				currentModal.setState(false);
			}

			modalStack.push(modalCtx);

			setActive(true);
			props?.onActive?.();
			props?.onToggle?.(true);
		},
		close: () => {
			props?.onToggle?.(false);

			const currentModal = modalStack.at(-1);
			if (currentModal && currentModal.id() === dialogId) {
				currentModal.setState(false);
				modalStack.pop();
			}

			const previousModal = modalStack.at(-1);
			if (previousModal) previousModal.setState(true);
		},
		closeAll: () => {
			while (modalStack.length > 0) {
				modalStack.pop()?.setState(false);
			}
		},
		toggle: () => {
			const isActive = active();
			isActive ? modalCtx.close() : modalCtx.open();
		},
		setState: (state: boolean) => setActive(state),
		isActive: () => active(),
		titleId: () => dialogId.concat('-title'),
		descriptionId: () => dialogId.concat('-description'),
	};

	return modalCtx;
}

type ModalProps = Omit<DialogProps, 'ctx'> & {
	ctx?: ModalContext;
};

const ModalDialog: Component<ModalProps> = (props) => {
	const ctx = props.ctx ?? createModal(props);
	return (
		<modalDialogContext.Provider value={ctx}>
			<Dialog
				{...props}
				ctx={ctx}
			>
				{props.children}
			</Dialog>
		</modalDialogContext.Provider>
	);
};

export { type ModalContext, ModalDialog, useModalDialog, createModal };
