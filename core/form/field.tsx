import {
	createContext,
	createEffect,
	createMemo,
	createSignal,
	type JSX,
	useContext,
} from 'solid-js';
import { useForm } from './context';
import type { FormsData } from './form';

/**
 * Represents the value of a field.
 *
 * @template T - The type of the field value.
 */
export type FieldValue<T> = T;

/**
 * Represents the error message associated with a field.
 */
export type FieldErr = string;

/**
 * Provides the context properties for managing field state and errors.
 *
 * @template T - The type of the field value.
 *
 * @property value - A function that returns the current field value.
 * @property setValue - A function to update the field value.
 * @property errors - A function that returns the current error message.
 * @property setErrors - A function to update the field error message.
 */
export type FieldContextProps<T> = {
	value: () => FieldValue<T>;
	setValue: (value: FieldValue<T>) => void;
	errors: () => FieldErr;
	setErrors: (errors: FieldErr) => void;
};

/** Context to provide field state and error handling. */
const FieldContext = createContext<FieldContextProps<unknown>>();

/**
 * Custom hook to get the current field context.
 * This hook does not take any arguments.
 *
 * @template T - The type of the field value.
 * @returns {FieldContextProps<T>} - The current field context.
 */
export function useField<T>(): FieldContextProps<T> {
	const ctx = useContext(FieldContext);
	if (!ctx) throw new Error('useField must be used within a Field component');
	return ctx as FieldContextProps<T>;
}

/**
 * Custom hook to manage field state and errors.
 *
 * @template T - The type of the field value.
 * @param {string} name - The name of the field.
 * @returns {FieldContextProps<T>} - The context properties for the field.
 */
export function createField<T>(name: string): FieldContextProps<T> {
	const [value, setValue] = createSignal<FieldValue<T>>(undefined as T);
	const [errors, setErrors] = createSignal<FieldErr>('');
	let wasModified = false;

	const formCtx = useForm();

	/** Updates the form data with the current field value. */
	const updateFormData = () => {
		const val = createMemo(() => value());
		if ((val() === undefined || val() === '') && !wasModified) return;

		formCtx?.setState((prevData: FormsData) => ({
			...prevData,
			[name]: val(),
		}));
	};

	/** Updates the form errors with the current field errors. */
	const updateFormErr = () => {
		formCtx?.setErrors((prev: Record<string, string>) => ({
			...prev,
			[name]: errors(),
		}));
	};

	/** Updates the field value from the form context state. */
	const updateFieldVal = () => {
		const val = formCtx.state[name];
		if (val) {
			wasModified = true;
			// @ts-ignore
			setValue(val);
		}
	};

	/** Updates the field errors from the form context errors. */
	const updateFieldErr = () => {
		const err = formCtx.errors[name];
		if (err) {
			setErrors(err);
		}
	};

	/**
	 * Bind side effects to automatically update form data, errors, field value, and field errors.
	 * These effects ensure that changes to the field state or errors are synchronized with the form context.
	 */
	createEffect(() => updateFormData());
	createEffect(() => updateFormErr());
	createEffect(() => updateFieldVal());
	createEffect(() => updateFieldErr());

	return {
		value,
		setValue,
		errors,
		setErrors,
	};
}

/**
 * Props for the Field component.
 *
 * @template T - The type of the field value.
 * @property {string} name - The name of the field.
 * @property {(ctx: FieldContextProps<T>) => JSX.Element} children - A render function receiving the field context.
 */
export type FieldProps<T> = {
	name: string;
	children: (ctx: FieldContextProps<T>) => JSX.Element;
};

/**
 * Field component to provide context for field state and errors.
 *
 * @template T - The type of the field value.
 * @param {FieldProps<T>} props - The properties for the Field component.
 * @returns {JSX.Element} - The rendered Field component.
 */
export function Field<T>(props: FieldProps<T>): JSX.Element {
	const ctx = createField(props.name);

	return (
		<FieldContext.Provider value={ctx}>
			{props.children(ctx as FieldContextProps<T>)}
		</FieldContext.Provider>
	);
}
