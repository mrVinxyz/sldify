import { createContext, createEffect, createSignal, onMount, useContext } from 'solid-js';
import type { View } from '../types';
import { SetStoreFunction, createStore } from 'solid-js/store';

export type FormsData = Record<string, unknown>;
export type FormStatus = 'initial' | 'validating' | 'error' | 'submitting' | 'success' | 'failure';

export type UpdateStoreFn<T> = (partialState: Partial<T> | ((prevState: T) => Partial<T>)) => void;

export type FormContext<T> = {
	name: Readonly<string>;
	state: T;
	setState: SetStoreFunction<T>;
	errors: FormErr;
	setErrors: UpdateStoreFn<FormErr>;
	status: () => FormStatus;
	setStatus: (status: FormStatus) => void;
	cleanStorage: () => void;
};

export const formContext = createContext<FormContext<unknown>>();

export function useForm<T>(): FormContext<T> {
	const ctx = useContext(formContext);
	if (!ctx) throw new Error('useForm must be used within a Form component');
	return ctx as FormContext<T>;
}

export type FormProps<T extends object, R> = {
	name: string;
	initialState?: T;
	onSubmit?: (data: T) => Promise<R>;
	onSubmitResult?: (data: R) => void;
	validate?: (values: T) => FormErr | undefined;
	storage?: 'session' | 'local';
};

const FormStorage = (storage: 'session' | 'local' | undefined): Storage | null =>
	storage === 'session' ? sessionStorage : storage === 'local' ? localStorage : null;

export function createForm<T extends object, R>(props: FormProps<T, R>): FormContext<T> {
	const [state, setState] = createStore<T>(props.initialState || ({} as T)),
		[errors, setErrors] = createStore<FormErr>(),
		[status, setStatus] = createSignal<FormStatus>('initial');

	return {
		state,
		setState,
		errors,
		setErrors,
		status,
		setStatus,
		cleanStorage: () => {
			const storage = FormStorage(props.storage);
			return storage?.removeItem(props.name);
		},
		...props,
	};
}

export type BaseFormProps<T extends object, R> = {
	form: FormContext<T> | FormProps<T, R>;
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

		const validationErrors = formEl?.validate?.(ctx.state as T);
		if (validationErrors && Object.keys(validationErrors).length > 0) {
			ctx.setErrors(validationErrors);
			return;
		}

		try {
			formEl?.onSubmit?.(ctx.state as T).then(async (res: R) => {
				formEl.onSubmitResult?.(res);
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
			acc[field] = ctx.state[field as keyof (FormsData | T)];
			return acc;
		}, {} as FormsData);

		storage?.setItem(formEl.name, JSON.stringify(dataToStore));
	};

	const storedFormData = () => {
		const storedData = storage?.getItem(formEl.name);
		if (storedData) ctx.setState(JSON.parse(storedData));
	};

	onMount(() => {
		allInputFields = fieldNames();
		validateInputNames(allInputFields);
		storedFormData();
	});

	createEffect(() => storeFormData());

	return (
		<formContext.Provider value={ctx as unknown as FormContext<unknown>}>
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

export function formErr<T>(obj: Partial<Record<keyof T, string[] | undefined>>): FormErr {
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
