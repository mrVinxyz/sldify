import {
	createContext,
	createEffect,
	createMemo,
	createSignal,
	For,
	onCleanup,
	useContext,
} from 'solid-js';
import { randomHash } from '../utils';
import { Input, type InputProps } from './input';
import { InputGroup, type InputGroupProps, type InputGroupSizeVariant } from './group';
import { Label } from './label';
import { cva, type VariantProps } from 'class-variance-authority';
import type { PropAttr, View } from '../types';

export type SelectValue<V> = Record<string, V>;

export type SelectContextProps<V> = {
	value: () => SelectValue<V>;
	setValue: (value: SelectValue<V>) => void;
	open: () => boolean;
	setOpen: (open: boolean) => void;
	id: Readonly<string>;
};

const SelectContext = createContext<SelectContextProps<unknown>>();

export function createSelect<T>(id: string = randomHash()): SelectContextProps<T> {
	const [value, setValue] = createSignal<SelectValue<T>>({} as SelectValue<T>);
	const [open, setOpen] = createSignal<boolean>(false);

	return {
		value,
		setValue,
		open,
		setOpen,
		id,
	};
}

export function useSelect<V>(): SelectContextProps<V> {
	const ctx = useContext(SelectContext);
	if (!ctx) {
		throw new Error('useSelect must be used within a Selection component');
	}
	return ctx as SelectContextProps<V>;
}

export const SelectGroup = <V,>(props: InputGroupProps): View => {
	const [open, setOpen] = createSignal<boolean>(false);

	const ctx = createSelect();

	const handleOutsideClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const element = document.getElementById('select-component'.concat(ctx.id));
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
		<SelectContext.Provider value={ctx}>
			<InputGroup
				id={'select-component'.concat(ctx.id)}
				size={props.size}
				className={props.className}
			>
				{props.children}
			</InputGroup>
		</SelectContext.Provider>
	);
};

const SelectInputContext = createContext<SelectContextProps<unknown>>();

export const SelectInput = <T,>(props: InputProps<T>): View => {
	const ctx = useSelect();

	const handleKeyNavigation = (e: KeyboardEvent) => {
		switch (e.key) {
			case ' ':
			case 'Enter':
				ctx.setOpen(!ctx.open());
				break;
			case 'Escape':
				ctx.setOpen(false);
				break;
		}
	};

	return (
		<SelectInputContext.Provider value={ctx}>
			<Input
				id={'select-input' + ctx.id}
				onClick={() => ctx.setOpen(!ctx.open())}
				onKeyDown={handleKeyNavigation}
				value={ctx.value()?.name}
				readonly={true}
				{...props}
			/>
		</SelectInputContext.Provider>
	);
};

const optionMapStyles = cva('absolute z-1 w-full py-2 rounded-md border mt-1 bg-white', {
	variants: {
		active: {
			true: 'block',
			false: 'hidden',
		},
		position: {
			top: 'left-0',
			bottom: 'bottom-0 -mt-1',
			'': '',
		},
	},
});

export const SelectOptionMap = (
	props: { children: View } & VariantProps<typeof optionMapStyles>,
): View => {
	const ctx = useSelect();
	const [element, setElement] = createSignal();

	let gotPosition = false;
	type ComponentPosition = 'top' | 'bottom' | '';
	let storedPosition: ComponentPosition = '';

	const calculatePosition = (): ComponentPosition => {
		const el = createMemo(() => element() as HTMLElement);

		if (!gotPosition && el()) {
			gotPosition = true;

			// Acquire spacing values
			const contentRect = el().getBoundingClientRect();
			const spaceOnTop = contentRect.top;
			const spaceOnBottom = window.innerHeight - contentRect.bottom;

			if (spaceOnTop <= 0) {
				storedPosition = 'top';
			} else if (spaceOnBottom <= 0) {
				storedPosition = 'bottom';
			}
			return storedPosition;
		}

		return storedPosition;
	};

	createEffect(() => console.log(calculatePosition()));

	return (
		<div
			ref={setElement}
			id={'select-options' + ctx.id}
			class={optionMapStyles({ active: ctx.open(), position: calculatePosition() })}
		>
			<ul class='block px-1 space-y-1 text-sm text-gray-700'>{props.children}</ul>
		</div>
	);
};

export type SelectOptionProps<V> = {
	name: string;
	value: V;
	selected?: boolean;
};

export const SelectOption = <V,>(props: SelectOptionProps<V>): View => {
	const ctx = useSelect();

	if (props.selected) ctx.setValue(props);

	return (
		<li class='block rounded-lg hover:bg-gray-100 font-medium cursor-pointer focus:outline-none focus:bg-gray-100'>
			<button
				type='button'
				onClick={() => {
					ctx.setOpen(false);
					ctx.setValue({ name: props.name, value: props.value });
				}}
				class={
					'p-2 relative w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-600'
				}
			>
				{props.name}
			</button>
		</li>
	);
};

export type SelectableProps<V> = InputProps<V> &
	PropAttr & {
		label?: string;
		options: SelectOptionProps<V>[];
		default?: SelectOptionProps<V>;
		value?: string | number;
		size?: InputGroupSizeVariant;
	};

export function Selectable<V>(props: SelectableProps<V>): View {
	return (
		<SelectGroup size={props.size}>
			{props.label && (
				<Label
					for={props.name}
					label={props.label}
				/>
			)}
			<SelectInput
				value={props.value}
				disabled={props.disabled}
				placeholder={props.placeholder}
				{...props}
			/>
			<SelectOptionMap>
				<For each={props.options}>
					{(opt) => (
						<SelectOption
							value={opt.value}
							name={opt.name}
							//selected={opt === ctx.value()}
						/>
					)}
				</For>
			</SelectOptionMap>
		</SelectGroup>
	);
}
