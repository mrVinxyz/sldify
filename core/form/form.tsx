import { createEffect, createSignal, onMount } from 'solid-js';
import type { View } from '../types';
import { createForm, formContext, type FormContext } from './context';

/** The form data is a record of key-value pairs. */
export type FormsData = Record<string, unknown>;

/**
 * @param initial Form initial load.
 * @param error Failed form validation.
 * @param success Successful form submission.
 * @param failure Failed form submission.
 */
export type FormStatus = 'initial' | 'error' | 'success' | 'failure';

/**
 * The properties for a form component.
 *
 * @template T - The type of the form data.
 */
export type FormProps<T extends object, R> = {
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
	onSubmit?: (data: FormsData | T) => Promise<R>;
	/***/
	onSubmitResponse?: (data: R) => void;
	onSubmitError?: () => void; // TODO impl this feature
	/**
	 * A function to validate the form data.
	 *
	 * @param {FormsData | {}} values - The form data to be validated.
	 * @returns {FormErr} The validation errors.
	 */
	validate?: (values: FormsData | T) => FormErr;
	/**
	 * Creates a persistent form state, storing the form data in the browser's session or local storage.
	 */
	storage?: 'session' | 'local';
};

/**
 * Props for the `Form` component, defining the structure and behavior of the form.
 *
 * @template T - Represents the form's state type.
 */
export type BaseFormProps<T extends object, R> = {
	/**
	 * Represents either the form context or the initial form props.
	 * - `FormContextProps`: If the form context already exists.
	 * - `FormProps<T>`: If the form is to be created.
	 */
	form: FormContext | FormProps<T, R>;

	/**
	 * Components to be rendered within the form context.
	 */
	children: View;
};

export function Form<T extends object, R>(props: BaseFormProps<T, R>): View {
	const formEl = props.form as FormProps<T, R>;
	const ctx = 'name' in props.form ? createForm(formEl) : props.form;

	const [thisForm, setThisForm] = createSignal<HTMLFormElement>();
	let allInputFields: Array<string> = [];

	if (formEl.initialState) ctx.setState(formEl.initialState);


	const storage =
		formEl.storage === 'session'
			? sessionStorage
			: formEl.storage === 'local'
				? localStorage
				: null;

	const handleSubmit = (e: Event) => {
		e.preventDefault();

		const button = thisForm()?.querySelector('button[type="submit"]');
		button ? button.setAttribute('disabled', 'true') : null;

		const errors = formEl?.validate?.(ctx.state);
		if (errors && Object.keys(errors).length > 0) {
			ctx.setErrors(errors);
			return;
		}

		try {
			formEl?.onSubmit?.(ctx.state).then(async (res: R) => {
				formEl.onSubmitResponse?.(res);
				button ? button.removeAttribute('disabled') : null;
			});
		} catch (e) {
			throw new Error(`Error submitting form: ${e}`);
		}
	};

	const fieldNames = (): string[] => {
		const inputs = thisForm()?.querySelectorAll('input, textarea, select') || [];
		return Array.from(inputs)
			.map((input) => input.getAttribute('name'))
			.filter((name): name is string => name !== null);
	};

	const validateInputNames = (fields: string[]) => {
		const duplicates = fields.filter((name, index) => fields.indexOf(name) !== index);
		if (duplicates.length > 0) throw new Error(`Duplicate input names: ${duplicates}`);
	};

	const storeFormData = () => {
		const dataToStore = allInputFields.reduce((acc, field) => {
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
		allInputFields = fieldNames();
		validateInputNames(allInputFields);
		getStoredFormData();
	});

	createEffect(() => storeFormData());

	return (
		<formContext.Provider value={ctx}>
			<form
				ref={setThisForm}
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

export type FormErr = Record<string, string>;

export function toFormErr<T>(obj: Partial<Record<keyof T, string[] | undefined>>): FormErr {
	const formErr: FormErr = {};

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const labelElement = document.getElementById(`${key}Label`);
			const label = labelElement ? labelElement.textContent || labelElement.innerText : '';

			const err = obj[key];
			if (err) {
				formErr[key] = label ? `${label} ${err.join(', ')}` : err.join(', ');
			}
		}
	}

	return formErr;
}
