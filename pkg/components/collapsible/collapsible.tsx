import {
	type Component,
	createContext,
	createEffect,
	createSignal,
	onCleanup,
	onMount,
	useContext,
} from 'solid-js';
import type { View } from '../../utils/types';
import generateId from '../../utils/id';

type CollapsibleContext = {
	id: () => string;
	show: () => void;
	hide: () => void;
	toggle: () => void;
	isActive: () => boolean;
};

const collapsibleContext = createContext<CollapsibleContext>();

function useCollapsible(): CollapsibleContext {
	const ctx = useContext(collapsibleContext);
	if (!ctx) throw new Error('useCollapsible must be used within a Collapsible component');
	return ctx;
}

type CollapsibleProps = {
	id?: string;
	onActive?: () => void;
	onToggle?: (isActive: boolean) => void;
	closeOnOutsideClick?: boolean;
	hoverDelay?: number;
	defaultOpen?: boolean;
	class?: string;
	ctx?: CollapsibleContext;
	children: View;
};

function createCollapsible(props?: Omit<CollapsibleProps, 'ctx' | 'children'>): CollapsibleContext {
	const collapsibleId = props?.id ?? generateId('collapsible');
	const [active, setActive] = createSignal(props?.defaultOpen ?? false);
	let hoverTimeout: number | undefined;
	let isFirstActivation = true;

	let rootEl: HTMLElement | null = null;
	let controlEl: HTMLElement | null = null;
	let portalEl: HTMLElement | null = null;
	let contentEl: HTMLElement | null = null;

	const show = () => {
		setActive(true);
		props?.onActive?.();
	};

	const hide = () => {
		setActive(false);
	};

	const toggle = () => {
		const isActive = active();
		setActive(!isActive);
		props?.onToggle?.(!isActive);
	};

	const handleMouseEnter = () => {
		clearTimeout(hoverTimeout);
		hoverTimeout = window.setTimeout(() => show(), props?.hoverDelay);
	};

	const handleMouseLeave = () => {
		clearTimeout(hoverTimeout);
		hoverTimeout = window.setTimeout(() => hide(), props?.hoverDelay);
	};

	// Initial setup for control element
	onMount(() => {
		rootEl = document.getElementById(collapsibleId);

		if (props?.hoverDelay !== undefined) {
			controlEl = document.getElementById(collapsibleId.concat('-control'));
			if (controlEl) {
				controlEl.addEventListener('mouseenter', handleMouseEnter);
			}
		}
	});

	createEffect(() => {
		if (active() && isFirstActivation && props?.hoverDelay !== undefined) {
			queueMicrotask(() => {
				isFirstActivation = false;
				portalEl = document.getElementById(collapsibleId.concat('-portal'));
				contentEl = document.getElementById(collapsibleId.concat('-content'));

				controlEl?.addEventListener('mouseleave', handleMouseLeave);

				if (portalEl && contentEl) {
					portalEl.addEventListener('mouseenter', handleMouseEnter);
					portalEl.addEventListener('mouseleave', handleMouseLeave);

					contentEl.addEventListener('mouseenter', handleMouseEnter);
					contentEl.addEventListener('mouseleave', handleMouseLeave);
				}
			});
		}
	});

	const handleOutsideClick = (e: MouseEvent) => {
		if (!props?.closeOnOutsideClick) return;
		const target = e.target as HTMLElement | null;
		if (!target) return;

		const elements = [controlEl, portalEl, contentEl, rootEl];
		if (!elements.some((el) => el?.contains(target))) hide();
	};

	createEffect(() => {
		if (active()) {
			const handleEscapeKey = (e: KeyboardEvent) => e.key === 'Escape' && hide();
			window.addEventListener('click', handleOutsideClick);
			window.addEventListener('keydown', handleEscapeKey);

			onCleanup(() => {
				window.removeEventListener('click', handleOutsideClick);
				window.removeEventListener('keydown', handleEscapeKey);
			});
		}
	});

	onCleanup(() => {
		clearTimeout(hoverTimeout);

		if (controlEl) {
			controlEl.removeEventListener('mouseenter', handleMouseEnter);
			controlEl.removeEventListener('mouseleave', handleMouseLeave);
		}
		if (portalEl) {
			portalEl.removeEventListener('mouseenter', handleMouseEnter);
			portalEl.removeEventListener('mouseleave', handleMouseLeave);
		}
		if (contentEl) {
			contentEl.removeEventListener('mouseenter', handleMouseEnter);
			contentEl.removeEventListener('mouseleave', handleMouseLeave);
		}
	});

	return {
		id: () => collapsibleId,
		show,
		hide,
		toggle,
		isActive: () => active(),
	};
}

const Collapsible: Component<CollapsibleProps> = (props) => {
	const collapsible = props.ctx ?? createCollapsible(props);
	return (
		<collapsibleContext.Provider value={collapsible}>
			<div
				id={collapsible.id()}
				class={'relative w-full '.concat(props.class || '')}
			>
				{props.children}
			</div>
		</collapsibleContext.Provider>
	);
};

export {
	type CollapsibleContext,
	type CollapsibleProps,
	useCollapsible,
	createCollapsible,
	Collapsible,
};
