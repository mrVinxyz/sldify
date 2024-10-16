import {
	createContext,
	createEffect,
	createMemo,
	createSignal,
	onCleanup,
	Show,
	splitProps,
	useContext,
} from 'solid-js';
import { cva } from 'class-variance-authority';
import { randomHash } from '../utils';
import type { Child, ClassNames, OptComponentCtx, View } from '../types';
import { Button, type ButtonProps } from '../button';

type CollapsibleState = 'open' | 'close' | 'waiting';

export type CollapsibleContext = {
	id: Readonly<string>;
	state: () => CollapsibleState;
	setState: (state: CollapsibleState) => void;
	toggle: () => void;
};

const collapsibleContext = createContext<CollapsibleContext>();

export function createCollapsible(id?: string): CollapsibleContext {
	const [state, setState] = createSignal<CollapsibleState>('close');

	const toggle = () => (state() === 'close' ? setState('open') : setState('close'));

	return {
		id: 'collapsible-'.concat(id || randomHash()),
		state,
		setState,
		toggle,
	};
}

export function useCollapsible(): CollapsibleContext {
	const ctx = useContext(collapsibleContext);
	if (!ctx) throw new Error('useCollapsible must be used within a Collapsible component');
	return ctx;
}

export type CollapsibleProps = OptComponentCtx<CollapsibleContext> & Child & ClassNames;

export function Collapsible(props: CollapsibleProps) {
	const ctx = props.ctx ?? createCollapsible();
	return (
		<collapsibleContext.Provider value={ctx}>
			<div
				id={ctx.id}
				class={'relative '.concat(props.className || '')}
			>
				{props.children}
			</div>
		</collapsibleContext.Provider>
	);
}

export function CollapsibleControl(props: ButtonProps) {
	const [prop, others] = splitProps(props, ['className', 'onPress']);
	const ctx = useCollapsible();

	return (
		<Button
			color='none'
			size='none'
			variant='none'
			className={prop.className || ''}
			id={'collapsible-control'.concat(ctx.id)}
			onPress={(e: Event) => {
				prop.onPress?.(e);
				ctx.toggle();
			}}
			{...others}
		/>
	);
}

export type CollapsibleContentProps = Child &
	ClassNames & {
		position?: CollapsiblePosition;
		size?: CollapsibleSize;
	};

const collapsibleContentStyles = cva('absolute z-10', {
	variants: {
		position: {
			left: 'left-0',
			right: 'right-0',
			'': '',
		},
		size: {
			sm: 'w-48',
			md: 'w-64',
			lg: 'w-80',
			xl: 'w-96',
			full: 'w-full',
		},
	},
	defaultVariants: {
		position: 'left',
		size: 'full',
	},
});

export type CollapsiblePosition = 'left' | 'right' | '';
export type CollapsibleSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export function CollapsibleContent(props: CollapsibleContentProps): View {
	const ctx = useCollapsible();

	const [position, setPosition] = createSignal<CollapsiblePosition>(props.position || '');
	const [element, setElement] = createSignal();

	let gotPosition = false;
	let storedPosition: CollapsiblePosition = '';

	const calculatePosition = () => {
		const el = createMemo(() => element() as HTMLElement);
		if (!gotPosition && el()) {
			gotPosition = true;

			// Acquire spacing values
			const contentRect = el().getBoundingClientRect();
			const spaceOnRight = window.innerWidth - contentRect.right;
			const spaceOnLeft = contentRect.left;

			// // Determine the position based on available space
			if (spaceOnRight < 0) {
				storedPosition = 'right';
				return storedPosition;
			}
			if (spaceOnLeft < 0) {
				storedPosition = 'left';
				return storedPosition;
			}
		}

		return storedPosition;
	};

	const positioning = () => setPosition(calculatePosition());

	let ignoreClick = false;
	const handleOutsideClick = (e: MouseEvent) => {
		if (ignoreClick) {
			ignoreClick = false;
			return;
		}

		const target = e.target as HTMLElement;
		const control = document.getElementById('collapsible-control'.concat(ctx.id));
		const content = element() as HTMLElement;

		if (!control?.contains(target) && !content.contains(target)) ctx.setState('close');
		if (ctx.state() === 'open' && control?.contains(target)) ctx.setState('close');
	};

	createEffect(() => positioning());
	createEffect(() => {
		if (ctx.state() === 'open') {
			ignoreClick = true;
			window.addEventListener('click', handleOutsideClick);
			window.addEventListener('resize', positioning);
		}
		if (ctx.state() === 'close') {
			window.removeEventListener('click', handleOutsideClick);
			window.removeEventListener('resize', positioning);
		}
	});

	onCleanup(() => {
		window.removeEventListener('click', handleOutsideClick);
		window.removeEventListener('resize', positioning);
	});

	return (
		<Show when={ctx.state() === 'open'}>
			<div
				ref={setElement}
				class={collapsibleContentStyles({ position: position(), size: props.size }).concat(
					' ',
					props.className || '',
				)}
			>
				{props.children}
			</div>
		</Show>
	);
}
