import {
	createContext,
	createEffect,
	createSignal,
	type JSX,
	type JSXElement,
	onMount,
	type Setter,
	useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { Field } from './field';
import { Input } from '../index';

export type FormsData = Record<string, string | number>;
export type FormErr = Record<string, string>;

type SetterFn<T> = (partialState: Partial<T> | ((prevState: T) => Partial<T>)) => void;

export type FormContextProps = {
	data: FormsData;
	setData: SetterFn<FormsData>;
	errors: FormErr;
	setErrors: SetterFn<FormErr>;
	isValid: () => boolean;
	setIsValid: Setter<boolean>;
};

export type FormProps<T> = {
	name: string;
	initialState?: FormsData;
	submitAction?: (data: FormsData) => Promise<Response>;
	submitResult?: (result: unknown) => void;
	validate?: (values: FormsData | T) => FormErr;
	storage?: 'session' | 'local';
};

const formContext = createContext<FormContextProps>();

export function useForm(): FormContextProps {
	const ctx = useContext(formContext);
	if (!ctx) throw new Error('useForm must be used within a Form component');
	return ctx;
}

export function createForm<T>(props: FormProps<T>): FormContextProps {
	const [data, setData] = createStore<FormsData>(props.initialState || {});
	const [errors, setErrors] = createStore<FormErr>();
	const [isValid, setIsValid] = createSignal<boolean>(true);

	return {
		data,
		setData,
		errors,
		setErrors,
		isValid,
		setIsValid,
		...props,
	};
}

export function Form<T>(props: {
	form: FormContextProps | FormProps<T>;
	children: JSXElement;
}): JSX.Element {
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

		const errors = formEl?.validate?.(ctx.data);
		if (errors && Object.keys(errors).length > 0) {
			ctx.setIsValid(false);
			ctx.setErrors(errors);
			return;
		}

		try {
			const handleResponse = async (res: Response) => {
				if (res.ok) {
					formEl?.submitResult?.(await res.json());
					return;
				}
				if (res.status >= 400) ctx.setErrors({ submit: await res.json() });
			};

			formEl?.submitAction?.(ctx.data).then(async (res) => handleResponse(res));
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
			acc[field] = ctx.data[field];
			return acc;
		}, {} as FormsData);

		storage?.setItem(formEl.name, JSON.stringify(dataToStore));
	};

	const getStoredFormData = () => {
		const storedData = storage?.getItem(formEl.name);
		const val = JSON.parse(storedData || '{}');
		console.log(val);
		if (storedData) ctx.setData(JSON.parse(storedData));
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

export type FormInputProps = {
	name: string;
	placeholder?: string;
	label: string;
	mask?: (e: InputEvent) => void;
};

export function FormInput(props: FormInputProps) {
	return (
		<Field name={props.name}>
			{(field) => (
				<Input.Group>
					<Input.Label
						for={props.name}
						label={props.label}
					/>
					<Input.Input
						name={props.name}
						placeholder={props.placeholder}
						value={field.value()}
						onInput={(e: InputEvent) => props.mask?.(e)}
						onChange={(e: Event) => {
							field.setValue((e.target as HTMLInputElement).value);

							field.setErrors('');
						}}
						class={
							field.errors()
								? 'border-red-600 focus:ring-red-600 focus:border-red-600'
								: ''
						}
					/>
					<Input.Feedback
						msg={field.errors()}
						class={field.errors() ? 'text-red-600' : ''}
					/>
				</Input.Group>
			)}
		</Field>
	);
}

export type FormTextAreaProps = {
	name: string;
	placeholder?: string;
	label: string;
};

export function FormTextArea(props: FormTextAreaProps) {
	return (
		<Field name={props.name}>
			{(field) => (
				<Input.Group>
					<Input.Label
						for={props.name}
						label={props.label}
					/>
					<Input.TextArea
						name={props.name}
						placeholder={props.placeholder}
						value={field.value()}
						onChange={(e: Event) =>
							field.setValue((e.target as HTMLTextAreaElement).value)
						}
						class={field.errors() ? 'border-red-600' : ''}
					/>
					<Input.Feedback msg={field.errors()} />
				</Input.Group>
			)}
		</Field>
	);
}

export type FormSelectProps = {
	name: string;
	label: string;
	options: { name: string; value: string }[];
	default?: { name: string; value: string };
};

export function FormSelect(props: FormSelectProps) {
	return (
		<Field name={props.name}>
			{(field) => (
				<Input.Group>
					<Input.Label
						for={props.name}
						label={props.label}
					/>
					<Input.Select
						name={props.name}
						options={props.options}
						default={props.default}
						value={field.value()}
						onChange={(e: Event) =>
							field.setValue((e.target as HTMLSelectElement).value)
						}
						class={field.errors() ? 'border-red-600' : ''}
					/>
					<Input.Feedback msg={field.errors()} />
				</Input.Group>
			)}
		</Field>
	);
}
