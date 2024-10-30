import { type Component, createContext, createSignal, JSX, useContext } from 'solid-js';
import type {ChildrenCtxProp, OptChildProp, OptContextProp} from '../../utils/types';

type CollapsibleContext = {
	show: () => void;
	hide: () => void;
	toggle: () => void;
	isActive: () => boolean;
};

type CollapsibleProps = OptContextProp<CollapsibleContext> &
	OptChildProp & {
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
	const [visibility, setVisibility] = createSignal(false);

	const show = () => {
		setVisibility(true);
		props?.onShow?.();
	};

	const hide = () => {
		setVisibility(false);
		props?.onHide?.();
	};

	const toggle = () => {
		setVisibility((prev) => !prev);
		props?.onToggle?.();
	};

	const isActive = () => visibility();

	return {
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

type CollapsibleCtxProps =  ChildrenCtxProp<CollapsibleContext> & {
	collapsible?: CollapsibleProps;
};

const CollapsibleCtx: Component<CollapsibleCtxProps> = (props) => {
	const collapsible = props.collapsible?.ctx ?? createCollapsible(props.collapsible);
	return props.children(collapsible);
};

export {
	type CollapsibleContext,
	type CollapsibleProps,
	type CollapsibleCtxProps,
	useCollapsible,
	createCollapsible,
	Collapsible,
	CollapsibleCtx,
};
