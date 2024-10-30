import type { ValueOf, View } from '../utils/types';
import { createStore, type SetStoreFunction, type Store } from 'solid-js/store';
import { type Accessor, createContext, createSignal, type Setter, useContext } from 'solid-js';

type FormsData<T> = Record<string, ValueOf<T>>;
type FormStatus = 'initial' | 'validating' | 'error' | 'submitting' | 'success' | 'failure';
type FormErr = Record<string, string>;

type FormContext<T> = {
	name: Readonly<string>;
	state: Store<FormsData<T>>;
	setState: SetStoreFunction<FormsData<T>>;
	errors: Store<FormErr>;
	setErrors: SetStoreFunction<FormErr>;
	status: Accessor<FormStatus>;
	setStatus: Setter<FormStatus>;
	validate: () => void;
	submit: () => void;
	reset: () => void;
	isValid: () => boolean;
};

const formContext = createContext<FormContext<unknown>>();

function useForm<T>(): FormContext<T> {
	const ctx = useContext(formContext);
	if (!ctx) throw new Error('useForm must be used within a Form');
	return ctx as FormContext<T>;
}

type FormConfig<T> = {
	onSubmit?: (values: FormsData<T>) => Promise<unknown> | unknown;
	onValidate?: (values: FormsData<T>) => FormErr;
	onReset?: () => void;
};

type FormProps<T> = {
	name: string;
	initialState?: FormsData<T>;
	config?: FormConfig<T>;
	storage?: 'session' | 'local';
};

const storage = {
	getItem<T>(key: string): FormsData<T> | null {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : null;
		} catch (error) {
			console.error('Error reading from localStorage:', error);
			return null;
		}
	},

	setItem<T>(key: string, value: FormsData<T>): void {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error('Error writing to localStorage:', error);
		}
	},

	removeItem(key: string): void {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.error('Error removing from localStorage:', error);
		}
	},
};

function createForm<T>(props: FormProps<T>): FormContext<T> {
	const storageKey = 'form'.concat('-', props.name);
	const isStorageEnabled = props.storage !== undefined;
	const storedState = isStorageEnabled ? storage.getItem<T>(storageKey) : null;

	const [state, setState] = createStore<FormsData<T>>(storedState || props.initialState || {});
	const [status, setStatus] = createSignal<FormStatus>('initial');
	const [errors, setErrors] = createStore<FormErr>({});
	const [isValid, setIsValid] = createSignal(false);

	const validate = (): boolean => {
		console.log('calling validate')
		try {
			setStatus('validating');

			if (!props.config?.onValidate) {
				setErrors({});
				return true;
			}

			const validationErrors = props.config.onValidate(state);
			setErrors(validationErrors);

			const hasErrors = Object.keys(validationErrors).length > 0;
			setStatus(hasErrors ? 'error' : 'initial');
			setIsValid(!hasErrors);
			console.log("hasErrors", hasErrors)

			return !hasErrors;
		} catch (error) {
			setStatus('error');
			return false;
		}
	};

	const submit = async () => {
		if (status() === 'submitting' || status() === 'validating') {
			return;
		}
		console.log(isValid());
		if(!isValid()) {
			return;
		}

		try {
			setStatus('submitting');

			if (props.config?.onSubmit) {
				await props.config.onSubmit(state);
			}

			setStatus('success');
		} catch (error) {
			setStatus('failure');
		}
	};

	const reset = () => {
		setState(props.initialState || {});
		setErrors({});
		setStatus('initial');
		setIsValid(false);
		props.config?.onReset?.();
	};

	return {
		name: props.name,
		state,
		setState,
		status,
		setStatus,
		errors,
		setErrors,
		validate,
		submit,
		reset,
		isValid,
	};
}

function Form<T>(props: { form: FormContext<T>; children: View }): View {
	return (
		<formContext.Provider value={props.form as FormContext<unknown>}>
			<form
				id={props.form.name}
				name={props.form.name}
				onSubmit={(e) => {
					e.preventDefault();
					props.form.validate();
					props.form.submit();
				}}
				autocomplete={'off'}
				noValidate={true}
			>
				{props.children}
			</form>
		</formContext.Provider>
	);
}

function Forms<T>(props: {
	form: FormProps<T>;
	children: (ctx: FormContext<T>) => View;
}): View {
	const formCtx = createForm(props.form);
	return <Form form={formCtx}>{props.children(formCtx)}</Form>;
}

export {
	type FormsData,
	type FormStatus,
	type FormErr,
	type FormContext,
	useForm,
	type FormConfig,
	type FormProps,
	createForm,
	Form,
	Forms,
};
