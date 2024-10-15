import type { FormErr, FormProps, FormsData, FormStatus } from './form';
import { createContext, createSignal, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

/**
 * A type representing a setter function for updating state.
 *
 * @template T - The type of the state.
 * @param {Partial<T> | ((prevState: T) => Partial<T>)} partialState - The partial state or a function returning the partial state.
 */
export type UpdateStoreFn<T> = (partialState: Partial<T> | ((prevState: T) => Partial<T>)) => void;

/**
 * The context properties for a form.
 */
export type FormContext = {
	state: FormsData;
	setState: UpdateStoreFn<FormsData>;
	errors: FormErr;
	setErrors: UpdateStoreFn<FormErr>;
	status: () => FormStatus;
	setStatus: (status: FormStatus) => void;
};

/** Creates a context for the form. */
export const formContext = createContext<FormContext>();

/** A hook to use the form context. */
export function useForm(): FormContext {
	const ctx = useContext(formContext);
	if (!ctx) throw new Error('useForm must be used within a Form component');
	return ctx;
}

/**
 * Creates a form context with the given properties.
 *
 * @template T - The type of the form data.
 * @param {FormProps<T>} props - The properties for the form.
 * @returns {FormContext} The created form context.
 */
export function createForm<T extends object, R>(props: FormProps<T, R>): FormContext {
	const [state, setState] = createStore<FormsData>(props.initialState || {}),
		[errors, setErrors] = createStore<FormErr>(),
		[status, setStatus] = createSignal<FormStatus>('initial');

	return {
		state,
		setState,
		errors,
		setErrors,
		status,
		setStatus,
		...props,
	};
}
