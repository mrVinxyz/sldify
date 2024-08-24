import { createContext, createSignal, type JSX, onCleanup, useContext } from 'solid-js';
import { randomHash } from '../util/utils';

type DropDownContextProps = {
	open: () => boolean;
	setOpen: (open: boolean) => void;
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
}) => {
	const [open, setOpen] = createSignal<boolean>(false);
	const ctxValue = { open, setOpen };
	const dropdownId = props.id || randomHash();

	const handleOutsideClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const element = document.getElementById(dropdownId);

		if (!element?.contains(target)) {
			setOpen(false);
			return;
		}
	};

	window.addEventListener('click', handleOutsideClick);

	onCleanup(() => {
		window.removeEventListener('click', handleOutsideClick);
	});

	return (
		<DropDownContext.Provider value={ctxValue}>
			<div
				id={dropdownId}
				class={'relative w-fit dropdown-component'}
			>
				{props.children}
			</div>
		</DropDownContext.Provider>
	);
};

const Trigger = (props: {
	children: JSX.Element;
}) => {
	const ctx = useDropDown();

	return (
		<div
			class={'w-fit dropdown-trigger'}
			onClick={() => ctx.setOpen(!ctx.open())}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					ctx.setOpen(!ctx.open());
				}
			}}
		>
			{props.children}
		</div>
	);
};

const Menu = (props: {
	children: JSX.Element;
}) => {
	const ctx = useDropDown();
	const controlVisibility = () => (ctx.open() ? 'block' : 'hidden');

	return (
		<div
			class={`absolute z-10 w-48 mt-2 py-2 bg-white rounded-md shadow-md ${controlVisibility()} dropdown-menu`}
		>
			<ul class='py-2 text-sm text-gray-700 dropdown-menu-list'>{props.children}</ul>
		</div>
	);
};

const Item = (props: {
	content: string;
}) => {
	return (
		<li
			class='block px-4 py-2 hover:bg-gray-100 font-medium dropdown-item'
			tabIndex={0}
		>
			{props.content}
		</li>
	);
};

const Group = (props: {
	children: JSX.Element;
}) => {
	return <ul class='py-2 text-sm text-gray-700 dropdown-group'>{props.children}</ul>;
};

export const Dropdown = {
	Component,
	Trigger,
	Menu,
	Item,
	Group,
};
