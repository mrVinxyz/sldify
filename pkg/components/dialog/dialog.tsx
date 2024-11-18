import {
	type Component,
	createContext,
	createEffect,
	createSignal,
	Show,
	useContext,
} from 'solid-js';
import generateId from '../../utils/id';
import type { View } from '../../utils/types';
import { DialogBackdrop, type DialogBackdropProps } from './dialog-backdrop';

type DialogContext = {
	id: () => string;
	open: () => void;
	close: () => void;
	toggle: () => void;
	setState: (state: boolean) => void;
	isActive: () => boolean;
	titleId: () => string;
	descriptionId: () => string;
};

const dialogContext = createContext<DialogContext>();

function useDialog(): DialogContext {
	const ctx = useContext(dialogContext);
	if (!ctx) throw new Error('useDialog must be used within a Dialog component');
	return ctx;
}

type DialogProps = {
	id?: string;
	onActive?: () => void;
	onToggle?: (isActive: boolean) => void;
	closeOnOutsideClick?: boolean;
	defaultOpen?: boolean;
	class?: string;
	ctx?: DialogContext;
	children: View;
	backdrop?: DialogBackdropProps | 'none';
};

function createDialog(props?: DialogProps): DialogContext {
	const dialogId = props?.id || generateId('dialog');

	const [active, setActive] = createSignal(props?.defaultOpen ?? false);

	createEffect(() => {
		if (active()) props?.onActive?.();
	});

	const open = () => {
		setActive(true);
	};

	const close = () => {
		setActive(false);
	};

	const toggle = () => {
		setActive((prev) => {
			const newState = !prev;
			props?.onToggle?.(newState);
			return newState;
		});
	};

	return {
		id: () => dialogId,
		open,
		close,
		toggle,
		isActive: () => active(),
		titleId: () => dialogId.concat('-title'),
		descriptionId: () => dialogId.concat('-description'),
		setState: (state) => setActive(state),
	};
}

const Dialog: Component<DialogProps> = (props) => {
	const dialog = props.ctx ?? createDialog(props);

	return (
		<dialogContext.Provider value={dialog}>
			<Show when={props.backdrop !== 'none'}>
				<DialogBackdrop {...(props.backdrop as DialogBackdropProps)} />
			</Show>
			{props.children}
		</dialogContext.Provider>
	);
};

export type { DialogContext, DialogProps };
export { createDialog, useDialog, Dialog };
