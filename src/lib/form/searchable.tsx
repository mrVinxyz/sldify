import {
	createContext,
	createEffect,
	createResource,
	createSignal,
	For,
	type JSX,
	onCleanup,
	Show,
	useContext,
} from 'solid-js';
import { gridColsSpanSize } from '../utils';
import type { FormInputSize } from './input';

/**
 * Type representing search parameters as a record of key-value pairs.
 */
export type SearchParam = Record<string, string>;

/**
 * Type representing a function that fetches searchable data based on search parameters.
 *
 * @template T - The type of the data being fetched.
 * @param {SearchParam} searchParam - The search parameters.
 * @returns {Promise<T[]>} - A promise that resolves to an array of fetched data.
 */
export type SearchableFetchFn<T> = (searchParam: SearchParam) => Promise<T[]>;

/**
 * Type representing the fallback action for the searchable component.
 * It can be a string, a function returning a JSX element, or a JSX element.
 */
export type FallbackAction = string | (() => JSX.Element) | JSX.Element;

/**
 * Props for the Searchable component.
 *
 * @template T - The type of the data being searched.
 */
export type SearchableProps<T> = {
	/** The name of the searchable field. */
	name: string;
	/** The label for the searchable field. */
	label: string;
	/** The placeholder text for the searchable field. */
	placeholder?: string;
	/** The key to display from the fetched data. */
	displayKey: keyof T;
	/** The key to search by in the fetched data. */
	searchKey: keyof T | string;
	/** The function to fetch searchable data. */
	resource: SearchableFetchFn<T>;
	/** The size of the list to display. */
	listSize?: 5 | 10;
	/** The fallback action if no data is found. */
	fallback?: FallbackAction;
	/** The action option to render. */
	actionOption?: JSX.Element;
	/** The time to wait before triggering the search. */
	awaitTime?: number;
	/** The input field size.
	 * @default w-full
	 */
	size?: FormInputSize;
};

/**
 * Type representing the context properties for the searchable component.
 */
export type SearchableContextProps = {};

/**
 * Context to provide searchable state and handling.
 */
const InputSelectSearchContext = createContext<SearchableContextProps>();

/**
 * Custom hook to use the searchable context.
 *
 * @returns {SearchableContextProps} - The context properties for the searchable component.
 * @throws Will throw an error if used outside a InputSelectSearchable component.
 */
export function useSearchable(): SearchableContextProps {
	const ctx = useContext(InputSelectSearchContext);
	if (!ctx)
		throw new Error('useSearchable must be used within a InputSelectSearchable component');
	return ctx;
}

/**
 * FormSearchable component to render a searchable input field with a list of results.
 *
 * @template T - The type of the data being searched.
 * @param {SearchableProps<T>} props - The properties for the FormSearchable component.
 * @returns {JSX.Element} - The rendered FormSearchable component.
 */
export function FormSearchable<T>(props: SearchableProps<T>): JSX.Element {
	const [searchParam, setSearchParam] = createSignal<SearchParam>();
	const [resourceValues, { mutate }] = createResource(searchParam, props.resource);
	const [showList, setShowList] = createSignal(false);
	const [selectedValue, setSelectedValue] = createSignal<T>();

	const resourceSize = () => resourceValues()?.length ?? 0;
	const [isWaiting, setIsWaiting] = createSignal(false);

	const awaitTime = props.awaitTime || 100;
	const handleOnInput = (e: InputEvent) => {
		const value = (e.target as HTMLInputElement).value;
		setShowList(false);
		mutate();
		setIsWaiting(true);
		setTimeout(() => {
			setSearchParam({ [props.searchKey]: value });
			window.addEventListener('click', handleOutsideClick);
			window.addEventListener('keydown', handleKeyNavigation);
		}, awaitTime);
	};

	const handleSelectOnClick = (obj: T) => {
		setSelectedValue(obj as Exclude<T, Function>);
		setShowList(false);
	};

	const handleSelectedValue = (): string => {
		setSearchParam(undefined);
		const value = selectedValue();
		return value ? (value[props.displayKey] as string) ?? '' : '';
	};

	const parseListSize = () => {
		if (resourceSize() <= 5) return 'h-fit';

		const sizeClassMap = {
			5: 'h-48',
			10: 'h-96',
		};

		return sizeClassMap[props.listSize || 5];
	};

	const parseFallback = () => {
		const fallback = props.fallback;
		if (!fallback) return;

		switch (typeof fallback) {
			case 'string':
				return <p class={'p-2 text-gray-900'}>{fallback}</p>;
			case 'function':
				return fallback();
			case 'object':
				return fallback;
		}
	};

	const handleOutsideClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const listEl = document.getElementById(props.name + 'List');
		if (!listEl) return;

		const isList = listEl.contains(target);
		const isInput = target.id === props.name + 'Input';
		if (!isList && !isInput) setShowList(false);
	};

	const handleKeyNavigation = (e: KeyboardEvent) => {
		e.key === 'Escape' && setShowList(false);
	};

	createEffect(() => {
		resourceValues() && setShowList(true);
		setIsWaiting(false);
	});

	onCleanup(() => {
		window.removeEventListener('click', handleOutsideClick);
		window.removeEventListener('keydown', handleKeyNavigation);
	});

	return (
		<InputSelectSearchContext.Provider value={{}}>
			<div class={`relative col-span-12 md:${gridColsSpanSize(props.size || '')}`}>
				<div class={'relative'}>
					<label
						for={props.name + 'Input'}
						class={
							'mb-2 text-sm lg:text-base font-medium text-gray-900 flex items-center'
						}
					>
						{props.label}
					</label>

					<input
						id={props.name + 'Input'}
						name={props.name}
						class={
							'block w-full font-medium p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 text-sm lg:text-base focus:ring-blue-500 focus:border-blue-500'
						}
						placeholder={props.placeholder}
						onInput={handleOnInput}
						value={handleSelectedValue()}
					/>
				</div>

				<Show when={isWaiting()}>
					<div
						class={
							'absolute z-10 mt-1 px-5 py-3 bg-gray-100 shadow divide-y divide-gray-100 rounded-md w-full overflow-y-auto border-gray-100'
						}
					>
						<div role='status'>
							<svg
								aria-hidden='true'
								class='w-4 h-4 text-gray-200 animate-spin fill-blue-600'
								viewBox='0 0 100 101'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
									fill='currentColor'
								/>
								<path
									d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
									fill='currentFill'
								/>
							</svg>
							<span class='sr-only'>Loading...</span>
						</div>
					</div>
				</Show>

				<Show when={showList()}>
					<div
						id={props.name + 'List'}
						class={`absolute z-10 mt-1 bg-white divide-y divide-gray-100 rounded-md w-full overflow-y-auto border border-gray-200 ${parseListSize()}`}
					>
						<ul class='p-2 text-sm text-gray-700 font-medium'>
							<For
								each={resourceValues()}
								fallback={parseFallback()}
							>
								{(v) => (
									<li>
										<button
											type='button'
											class='block p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg focus:outline-none'
											onClick={() => handleSelectOnClick(v)}
										>
											{v[props.displayKey] as string}
										</button>
									</li>
								)}
							</For>
							{props.actionOption && (
								<>
									<span class='block border-b border-gray-200 my-2' />
									<li>
										<button
											type='button'
											class='block p-2 hover:bg-gray-100 rounded-md'
										>
											{props.actionOption}
										</button>
									</li>
								</>
							)}
						</ul>
					</div>
				</Show>
			</div>
		</InputSelectSearchContext.Provider>
	);
}
