import {
	createContext,
	createEffect,
	createMemo,
	createSignal,
	type JSX,
	type JSXElement,
} from 'solid-js';
import { type FormsData, useForm } from './form';

/**
 * Type representing the value of a field.
 */
export type FieldValue = string;

/**
 * Type representing the error message of a field.
 */
export type FieldErr = string;

/**
 * Props for the FieldContext, including value, setValue, errors, and setErrors.
 */
export type FieldContextProps = {
	value: () => FieldValue;
	setValue: (value: FieldValue) => void;
	errors: () => FieldErr;
	setErrors: (errors: FieldErr) => void;
};

/**
 * Context to provide field state and error handling.
 */
const FieldContext = createContext<FieldContextProps>();

/**
 * Custom hook to manage field state and errors.
 *
 * @param {string} name - The name of the field.
 * @returns {FieldContextProps} - The context properties for the field.
 */
export function useField(name: string): FieldContextProps {
	const [value, setValue] = createSignal<FieldValue>('');
	const [errors, setErrors] = createSignal<FieldErr>('');
	let wasModified = false;

	const formCtx = useForm();

	/**
	 * Update the form data with the current field value.
	 */
	const updateFormData = () => {
		const val = createMemo(() => value());
		if (val() === '' && !wasModified) return;

		formCtx?.setState((prevData: FormsData) => ({
			...prevData,
			[name]: val(),
		}));
	};

	/**
	 * Update the form errors with the current field errors.
	 */
	const updateFormErr = () => {
		formCtx?.setErrors((prev: Record<string, string>) => ({
			...prev,
			[name]: errors(),
		}));
	};

	/**
	 * Update the field value from the form context state.
	 */
	const updateFieldVal = () => {
		const val = formCtx.state[name];
		if (val) {
			wasModified = true;
			setValue(val);
		}
	};

	/**
	 * Update the field errors from the form context errors.
	 */
	const updateFieldErr = () => {
		const err = formCtx.errors[name];
		if (err) {
			setErrors(err);
		}
	};

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
 * Props for the Field component, including the field name and children.
 */
export type FieldProps = {
	name: string;
	children: (ctx: FieldContextProps) => JSXElement;
};

/**
 * Field component to provide context for field state and errors.
 *
 * @param {FieldProps} props - The properties for the Field component.
 * @returns {JSX.Element} - The rendered Field component.
 */
export function Field(props: FieldProps): JSX.Element {
	const ctx = useField(props.name);

	return <FieldContext.Provider value={ctx}>{props.children(ctx)}</FieldContext.Provider>;
}
