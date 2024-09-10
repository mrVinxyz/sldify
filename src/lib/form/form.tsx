import {
	createContext,
	createEffect,
	createSignal,
	type JSX,
	onMount,
	type Setter,
	useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import type { Element } from '../types';

/**
 * A type representing form data as a record of key-value pairs.
 */
export type FormsData = Record<string, string>;

/**
 * A type representing form errors as a record of key-value pairs.
 */
export type FormErr = Record<string, string>;

/**
 * A type representing a setter function for updating state.
 *
 * @template T - The type of the state.
 * @param {Partial<T> | ((prevState: T) => Partial<T>)} partialState - The partial state or a function returning the partial state.
 */
type SetterFn<T> = (partialState: Partial<T> | ((prevState: T) => Partial<T>)) => void;

/**
 * The context properties for a form.
 */
export type FormContextProps = {
	/**
	 * The form current state.
	 */
	state: FormsData;
	/**
	 * A function to update the form state.
	 */
	setState: SetterFn<FormsData>;
	/**
	 * The form errors state.
	 */
	errors: FormErr;
	/**
	 * A function to update the form errors.
	 */
	setErrors: SetterFn<FormErr>;
	/**
	 * A signal to indicate if the form is valid.
	 */
	isValid: () => boolean;
	/**
	 * A function to update the form validity state.
	 */
	setIsValid: Setter<boolean>;
};

/**
 * The properties for a form component.
 *
 * @template T - The type of the form data.
 */
export type FormProps<T extends object> = {
	/**
	 * The name of the form.
	 */
	name: string;
	/**
	 * The initial state of the form
	 *
	 * @example
	 * const formData = {
	 *    name: "John Doe",
	 *    username: "johndoe"
	 * }
	 */
	initialState?: FormsData;
	/**
	 * The action to be performed on form submission.
	 *
	 * @param {FormsData} data - The form data to be submitted.
	 * @returns {Promise<Response>} A promise that resolves to the response of the submission.
	 *
	 * @example
	 * const submitAction = async (data: FormsData) => {
	 *     return fetch("/api/form", {}).then((res) => res.json());
	 * }
	 */
	submitAction?: (data: FormsData) => Promise<Response>;
	/**
	 * A function to handle the submission result.
	 *
	 * @param {R{}} result - The result of the form submission
	 * @returns {void}
	 *
	 * @example
	 * const submitResult = (result: unknown) => {
	 *    console.log('Form submitted:', result);
	 *    // Handle the form submission result
	 *    // e.g. show a success message
	 *    // or redirect to another page
	 *    // or update the UI
	 *    // etc.
	 *    return;
	 *}
	 */
	submitResult?: <R>(result: R | Record<string, string> | unknown) => void;
	/**
	 * A function to transform/pipeline the form data before submission.
	 *
	 * @param {FormsData | T{}} data - The form data to be transformed.
	 * @returns {FormsData | T{}} The transformed form data.
	 */
	transform?: (data: FormsData | T) => FormsData | T;
	/**
	 * A function to validate the form data.
	 *
	 * @param {FormsData | T{}} values - The form data to be validated.
	 * @returns {FormErr} The validation errors.
	 */
	validate?: (values: FormsData | T) => FormErr;
	/**
	 * The storage type for the form data.
	 * Creates a persistent form state, storing the form data in the browser's session or local storage.
	 */
	storage?: 'session' | 'local';
};

/** Creates a context for the form. */
const formContext = createContext<FormContextProps>();

/**
 * A hook to use the form context.
 *
 * @returns {FormContextProps} The form context properties.
 */
export function useForm(): FormContextProps {
	const ctx = useContext(formContext);
	if (!ctx) throw new Error('useForm must be used within a Form component');
	return ctx;
}

/**
 * Creates a form context with the given properties.
 *
 * @template T - The type of the form data.
 * @param {FormProps<T>} props - The properties for the form.
 * @returns {FormContextProps} The created form context.
 */
export function createForm<T extends object>(props: FormProps<T>): FormContextProps {
	const [state, setState] = createStore<FormsData>(props.initialState || {});
	const [errors, setErrors] = createStore<FormErr>();
	const [isValid, setIsValid] = createSignal<boolean>(true);

	return {
		state,
		setState,
		errors,
		setErrors,
		isValid,
		setIsValid,
		...props,
	};
}

/**
 * Props for the `Form` component, defining the structure and behavior of the form.
 *
 * @template T - Represents the form's state type.
 */
type BaseFormProps<T extends object> = {
	/**
	 * Represents either the form context or the initial form props.
	 * - `FormContextProps`: If the form context already exists.
	 * - `FormProps<T>`: If the form is to be created.
	 */
	form: FormContextProps | FormProps<T>;

	/**
	 * Components to be rendered within the form context.
	 */
	children: Element;
};

/**
 * The `Form` component for handling form submissions, validations, and state persistence.
 *
 * @template T - A generic type extending an object, representing the state of the form.
 *
 * @param {BaseFormProps<T>} props - Props object containing form context or form props and child components.
 * @returns {Element} The JSX element representing the form.
 *
 * The form manages:
 * - Validation on submit.
 * - Data persistence in session or local storage.
 * - Dynamic state management via a form context.
 *
 * The form includes the following key functionality:
 * - Validation of input field names.
 * - State transformation before submission.
 * - Persistent storage of form data.
 * - Handling form submission results and errors.
 */
export function Form<T extends object>(props: BaseFormProps<T>): Element {
	const formEl = props.form as FormProps<T>;
	const ctx = 'name' in props.form ? createForm(formEl) : props.form;
	// biome-ignore format:
	const storage =
		formEl.storage === 'session' ? sessionStorage :
			formEl.storage === 'local' ? localStorage :
				null;

	let thisForm: HTMLFormElement;
	let allFields: Array<string> = [];

	const handleSubmit = (e: Event) => {
		e.preventDefault();

		const errors = formEl?.validate?.(ctx.state);
		if (errors && Object.keys(errors).length > 0) {
			ctx.setIsValid(false);
			ctx.setErrors(errors);
			return;
		}

		formEl.transform?.(ctx.state);

		try {
			formEl?.submitAction?.(ctx.state).then(async (res) => {
				if (res.ok) {
					formEl?.submitResult?.(await res.json());
					return;
				}
				if (res.status >= 400) ctx.setErrors({ submit: await res.json() });
			});
		} catch (e) {
			throw new Error(`Error submitting form: ${e}`);
		}
	};

	const fieldNames = (): string[] => {
		const inputs = thisForm.querySelectorAll('input, textarea, select');
		return Array.from(inputs)
			.map((input) => input.getAttribute('name'))
			.filter((name): name is string => name !== null);
	};

	const validateInputNames = (fields: string[]) => {
		const duplicates = fields.filter((name, index) => fields.indexOf(name) !== index);

		if (duplicates.length > 0) throw new Error(`Duplicate input names: ${duplicates}`);
	};

	const storeFormData = () => {
		const dataToStore = allFields.reduce((acc, field) => {
			acc[field] = ctx.state[field];
			return acc;
		}, {} as FormsData);

		storage?.setItem(formEl.name, JSON.stringify(dataToStore));
	};

	const getStoredFormData = () => {
		const storedData = storage?.getItem(formEl.name);
		if (storedData) ctx.setState(JSON.parse(storedData));
	};

	onMount(() => {
		thisForm = document.getElementById(`${formEl.name}Form`) as HTMLFormElement;
		allFields = fieldNames();
		validateInputNames(allFields);

		getStoredFormData();
	});

	createEffect(() => storeFormData());

	return (
		<formContext.Provider value={ctx}>
			<form
				id={`${formEl.name}Form`}
				name={formEl.name}
				onSubmit={handleSubmit}
				autocomplete={'off'}
				noValidate={true}
			>
				{props.children}
			</form>
		</formContext.Provider>
	);
}
