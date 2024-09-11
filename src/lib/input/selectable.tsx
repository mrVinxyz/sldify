import {
	createContext,
	useContext,
	createSignal,
	createEffect,
	onCleanup,
	For,
	type JSX,
} from 'solid-js';
import { randomHash } from '../utils';
import { InputEl, type InputProps } from './input';
import { InputGroup } from './group';
import { Label } from './label';

/** Represent the type of selected value. */
type SelectValue<V> = Record<string, V>;

/**
 * Represents the props for the SelectContext component.
 *
 * @template T The type of the value.
 */
export type SelectContextProps<V> = {
	/** The value of the select input. */
	value: () => SelectValue<V>;
	/** Set the value of the select input. */
	setValue: (value: SelectValue<V>) => void;
	/** Check if the select input is open. */
	open: () => boolean;
	/** Set the open state of the select input. */
	setOpen: (open: boolean) => void;
	/** The id of the select input. */
	id: string;
};

/**
 * Create a context for the Selection component with the specified props.
 *
 * @template T - The type of value stored in the context.
 * @returns {Context<SelectContextProps<unknown>>} The created context object.
 */
const SelectContext = createContext<SelectContextProps<unknown>>();

/**
 * Hook to obtain the select context props from the nearest Selection component.
 *
 * @template T - The type of the select context.
 *
 * @returns {SelectContextProps<T>} - The select context props.
 *
 * @throws {Error} - If useSelect is not used within a Selection component.
 */
export function useSelect<V>(): SelectContextProps<V> {
	const ctx = useContext(SelectContext);
	if (!ctx) {
		throw new Error('useSelect must be used within a Selection component');
	}
	return ctx as SelectContextProps<V>;
}

/**
 * Represents a group component used to wrap a group of elements.
 *
 * @template T - The type of value in the group.
 * @param {Object} props - The properties for the group component.
 * @param {string} [props.id] - The optional ID for the group component.
 * @param {JSX.Element} props.children - The child elements to be wrapped by the group component.
 *
 * @returns {JSX.Element} - The JSX element representing the group component.
 */
export const SelectGroup = <V,>(props: { id?: string; children: JSX.Element }): JSX.Element => {
	const [value, setValue] = createSignal<SelectValue<V>>({} as SelectValue<V>);
	const [open, setOpen] = createSignal<boolean>(false);
	const id = props.id || randomHash();

	const ctxValue = {
		value: value,
		setValue,
		open,
		setOpen,
		id,
	};

	const handleOutsideClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const element = document.getElementById(`select-component${id}`);
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
		<SelectContext.Provider value={ctxValue}>
			<InputGroup id={'select-component' + id}>{props.children}</InputGroup>
		</SelectContext.Provider>
	);
};

/**
 * Represents an input component used in a select element.
 * @param {InputProps} props - The input props.
 * @returns {JSX.Element} - The rendered input component.
 */
export const SelectInput = (props: InputProps): JSX.Element => {
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
		<InputEl
			{...props}
			id={'select-input' + ctx.id}
			onClick={() => ctx.setOpen(!ctx.open())}
			onKeyDown={handleKeyNavigation}
			name={props.name}
			value={ctx.value()?.name}
			readonly={true}
		/>
	);
};

/**
 * OptionMap is a functional component that renders a dropdown menu of options.
 *
 * @param {Object} props - The properties for the OptionMap component.
 * @param {JSX.Element} props.children - The elements to be rendered as options in the dropdown menu.
 *
 * @returns {JSX.Element} The rendered OptionMap component.
 */
export const SelectOptionMap = (props: { children: JSX.Element }): JSX.Element => {
	const ctx = useSelect();

	return (
		<div
			id={'select-options' + ctx.id}
			classList={{
				'absolute z-50 py-2 w-full rounded-md border top-full mt-1 bg-white': true,
				block: ctx.open(),
				hidden: !ctx.open(),
			}}
		>
			<ul class='block px-2 space-y-2 text-sm text-gray-700'>{props.children}</ul>
		</div>
	);
};

/** Represents the properties for the Option component. */
export type SelectOptionProps<V> = {
	/** The display name for the option. */
	name: string;
	/** The value for the option. */
	value: V;
};

/**
 * Option represents a single option in a select dropdown.
 *
 * @param {Object} props - The properties of the option.
 * @param {string} props.label - The label of the option.
 * @param {string} props.value - The value of the option.
 * @param {JSX.Element} props.children - Any child components to be rendered within the option.
 * @returns {JSX.Element} The rendered option component.
 */
export const SelectOption = <V,>(props: SelectOptionProps<V>): JSX.Element => {
	const ctx = useSelect();
	return (
		<li
			class={
				'block rounded-lg hover:bg-gray-100 font-medium cursor-pointer focus:outline-none focus:bg-gray-100'
			}
		>
			<button
				type='button'
				onClick={() => {
					ctx.setOpen(false);
					ctx.setValue({ name: props.name, value: props.value });
				}}
				class={'p-2 relative w-full text-left'}
			>
				{props.name}
			</button>
		</li>
	);
};

/**
 * The `SelectionProps` interface represents the props that can be passed to a selectable component.
 */
export type SelectableProps<V> = {
	/** The name of the selectable component. */
	name: string;
	/** The label for the selectable component. */
	label: string;
	/** The placeholder text for the selectable component. */
	placeholder?: string;
	/** The options for the selectable component. */
	options: SelectOptionProps<V>[];
	/** The default option for the selectable component. */
	default?: SelectOptionProps<V>;
	/** The selected value for the selectable component. */
	value?: string | number;
	/** The change event handler for the selectable component. */
	onChange?: (e: Event) => void;
	/** Whether the selectable component is disabled. */
	disabled?: boolean;
	/** Additional properties for the selectable component. */
	[key: string]: unknown;
};

/**
 * Renders a selectable component with options.
 *
 * @return {JSX.Element} The rendered selectable component.
 */
export function Selectable<V>(props: SelectableProps<V>): JSX.Element {
	return (
		<SelectGroup>
			<Label
				for={props.name}
				label={props.label}
			/>
			<SelectInput
				value={props.value}
				disabled={props.disabled}
				placeholder={props.placeholder}
				{...props}
			/>
			<SelectOptionMap>
				{props.default && (
					<SelectOption
						value={props.default.value}
						name={props.default.name}
					/>
				)}
				<For each={props.options}>
					{(opt) => (
						<SelectOption
							value={opt.value}
							name={opt.name}
						/>
					)}
				</For>
			</SelectOptionMap>
		</SelectGroup>
	);
}
