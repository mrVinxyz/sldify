import {
	type Component,
	createContext,
	createEffect,
	createSignal,
	JSX,
	onCleanup,
	onMount,
	useContext,
} from 'solid-js';
import type { ChildrenCtxProp, OptChildProp, OptContextProp } from '../../utils/types';
import generateId from '../../utils/id';

type CollapsibleContext = {
	id: () => string;
	show: () => void;
	hide: () => void;
	toggle: () => void;
	isActive: () => boolean;
};

type CollapsibleProps = OptContextProp<CollapsibleContext> &
	OptChildProp & {
		id?: string;
		onShow?: () => void;
		onHide?: () => void;
		onToggle?: () => void;
	};

const collapsibleContext = createContext<CollapsibleContext>();

function useCollapsible(): CollapsibleContext {
	const ctx = useContext(collapsibleContext);
	if (!ctx) throw new Error('useCollapsible must be used within a Collapsible component');
	return ctx;
}

function createCollapsible(props?: Omit<CollapsibleProps, 'ctx'>): CollapsibleContext {
	const id = props?.id ?? generateId('collapsible');
	const [active, setActive] = createSignal(false);

	const show = () => {
		setActive(true);
		props?.onShow?.();
	};

	const hide = () => {
		setActive(false);
		props?.onHide?.();
	};

	const toggle = () => {
		setActive((prev) => !prev);
		props?.onToggle?.();
	};

	const isActive = () => active();

	let control: HTMLElement | undefined;
	let content: HTMLElement | undefined;

	onMount(() => {
		control = document.getElementById(id.concat('-control')) as HTMLElement;
		content = document.getElementById(id.concat('-content')) as HTMLElement;
	});

	const handleOutsideClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target !== control && target !== content) hide();
	};

	const handleEscapeKey = (e: KeyboardEvent) => {
		if (e.key === 'Escape') hide();
	};

	createEffect(() => {
		if (active()) {
			window.addEventListener('click', handleOutsideClick);
			window.addEventListener('keydown', handleEscapeKey);
		} else {
			window.removeEventListener('click', handleOutsideClick);
			window.removeEventListener('keydown', handleEscapeKey);
		}
	});

	onCleanup(() => {
		window.removeEventListener('click', handleOutsideClick);
		window.removeEventListener('keydown', handleEscapeKey);
	});

	return {
		id: () => id,
		show,
		hide,
		toggle,
		isActive,
	};
}

const Collapsible: Component<CollapsibleProps> = (props) => {
	const collapsible = props.ctx ?? createCollapsible(props);
	return (
		<collapsibleContext.Provider value={collapsible}>
			{props.children}
		</collapsibleContext.Provider>
	);
};

type CollapsibleCtxProps = ChildrenCtxProp<CollapsibleContext> & {
	collapsible?: CollapsibleProps;
};

export {
	type CollapsibleContext,
	type CollapsibleProps,
	type CollapsibleCtxProps,
	useCollapsible,
	createCollapsible,
	Collapsible,
};
