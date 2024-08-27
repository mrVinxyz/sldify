import {
	createContext,
	createEffect,
	createSignal,
	type JSX,
	onCleanup,
	onMount,
	useContext,
} from 'solid-js';
import { randomHash } from '../utils';

type DropDownContextProps = {
	open: () => boolean;
	setOpen: (open: boolean) => void;
	id: string;
	position?: 'down' | 'up' | 'left' | 'right';
};

const DropDownContext = createContext<DropDownContextProps>();

export function useDropDown() {
	const ctx = useContext(DropDownContext);
	if (!ctx) {
		throw new Error('useDropDown must be used within a DropDown component');
	}
	return ctx;
}

const Component = (props: {
	id?: string;
	children: JSX.Element;
	position?: 'down' | 'up' | 'left' | 'right';
}) => {
	const [open, setOpen] = createSignal<boolean>(false);
	const dropdownId = props.id || randomHash();
	const position = props.position || 'down';

	const ctxValue = { open, setOpen, id: dropdownId, position };

	const handleOutsideClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const element = document.getElementById(`dropdown-${dropdownId}`);
		if (!element?.contains(target)) {
			setOpen(false);
			return;
		}
	};

	createEffect(() => {
		if (open()) document.addEventListener('click', handleOutsideClick);
		else document.removeEventListener('click', handleOutsideClick);
	});

	onCleanup(() => {
		document.removeEventListener('click', handleOutsideClick);
	});

	return (
		<DropDownContext.Provider value={ctxValue}>
			<div
				id={`dropdown-${dropdownId}`}
				class={'dropdown-component relative'}
			>
				{props.children}
			</div>
		</DropDownContext.Provider>
	);
};

const Trigger = (props: { children: JSX.Element }) => {
	const ctx = useDropDown();

	let items: HTMLElement[] = [];
	onMount(() => {
		items = document.querySelectorAll(`.dropdown-item${ctx.id}`) as unknown as HTMLElement[];
		console.log(items);
	});

	const handleKeyNavigation = (e: KeyboardEvent) => {
		e.preventDefault();

		switch (e.key) {
			case 'Enter' || ' ':
				ctx.setOpen(!ctx.open());
				break;
			case 'Escape':
				ctx.setOpen(false);
				break;
		}
	};

	return (
		<div
			id={`dropdown-trigger-${ctx.id}`}
			class={'dropdown-trigger'}
			onClick={() => ctx.setOpen(!ctx.open())}
			onKeyDown={handleKeyNavigation}
		>
			{props.children}
		</div>
	);
};

const Menu = (props: { children: JSX.Element }) => {
	const ctx = useDropDown();
	const controlVisibility = () => (ctx.open() ? 'block' : 'hidden');

	const positionClasses = () => {
		switch (ctx.position) {
			case 'up':
				return 'bottom-full mb-1';
			case 'right':
				return 'left-full -top-2 ms-1';
			case 'left':
				return 'right-full -top-2 me-1';
			case 'down':
				return 'top-full mt-1';
			default:
				return 'top-full mt-1';
		}
	};

	return (
		<div
			id={`dropdown-menu-${ctx.id}`}
			class={`absolute z-50 w-48 py-1 bg-white rounded-md border ${controlVisibility()} ${positionClasses()}`}
		>
			<ul class='py-1 text-sm text-gray-700'>{props.children}</ul>
		</div>
	);
};

const Item = (props: { content?: string; children?: JSX.Element }) => {
	const ctx = useDropDown();
	return (
		<li
			class={`block px-4 py-2 hover:bg-gray-100 font-medium dropdown-item${ctx.id} cursor-pointer focus:outline-none focus:bg-gray-100`}
			tabIndex={0}
		>
			{props.content || props.children}
		</li>
	);
};

const Group = (props: { children: JSX.Element }) => {
	const ctx = useDropDown();
	return (
		<ul
			id={`dropdown-group-${ctx.id}`}
			class='py-2 text-sm text-gray-700 dropdown-group'
		>
			{props.children}
		</ul>
	);
};

export const Dropdown = {
	Component,
	Trigger,
	Menu,
	Item,
	Group,
};
