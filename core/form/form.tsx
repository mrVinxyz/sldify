import { createEffect, onMount } from 'solid-js';
import type { View } from '../types';
import { createForm, formContext, type FormContext } from './context';

/** The form data is a record of key-value pairs.
 */
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
	// TODO impl this feature
	onSubmitError?: () => void;
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
	// TODO deprecated, use onSubmit instead.
	submit?: (data: FormsData | T) => Promise<R>;
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
	const storage =
		formEl.storage === 'session'
			? sessionStorage
			: formEl.storage === 'local'
				? localStorage
				: null;

	console.log(formEl.initialState);

	if (formEl.initialState) ctx.setState(formEl.initialState);

	let thisForm: HTMLFormElement;
	let allFields: Array<string> = [];

	const handleSubmit = (e: Event) => {
		console.log("did it even trigger?")
		e.preventDefault();

		const errors = formEl?.validate?.(ctx.state);
		console.log(errors)
		if (errors && Object.keys(errors).length > 0) {
			ctx.setErrors(errors);
			return;
		}

		try {
			formEl?.submit?.(ctx.state).then(async (res: R) => formEl.onSubmitResponse?.(res));
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

		if (storedData) console.log(JSON.parse(storedData));
		if (storedData) ctx.setState(JSON.parse(storedData));
	};

	onMount(() => {
		thisForm = document.getElementById(`${formEl.name}Form`) as HTMLFormElement;
		allFields = fieldNames();
		validateInputNames(allFields);

		getStoredFormData();
	});

	createEffect(() => storeFormData());

	createEffect(() => {
		console.log(ctx.state);
	});

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
