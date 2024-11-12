import type { ChildProp, ObjectPartial, View } from '../utils/types';
import { createStore, type SetStoreFunction, type Store } from 'solid-js/store';
import {
	type Accessor,
	createContext,
	createEffect,
	createSignal,
	onMount,
	type Setter,
	useContext,
} from 'solid-js';

type FormDataPartial<T> = ObjectPartial<T>;
type FormsData<T> = FormDataPartial<T>;
type FormErr = Record<string, string>;
type FormStatus = 'initial' | 'validating' | 'error' | 'submitting' | 'success' | 'failure';

type FormContext<T> = {
	name: () => string;
	state: Store<FormsData<T>>;
	setState: SetStoreFunction<FormsData<T>>;
	errors: Store<FormErr>;
	setErrors: SetStoreFunction<FormErr>;
	status: Accessor<FormStatus>;
	setStatus: Setter<FormStatus>;
	validate: () => boolean;
	submit: () => void;
	reset: () => void;
	isValid: () => boolean;
	props: () => FormProps<T>;
};

type FormProps<T> = {
	name: string;
	initialState?: FormsData<T>;
	actions?: FormActions<T>;
	storage?: StorageType;
};

type StorageType = 'session' | 'local' | undefined;

interface FormActions<T> {
	onSubmit?: (values: FormsData<T>) => Promise<unknown> | unknown;
	onValidate?: (values: FormsData<T>) => FormErr | [FormsData<T>, FormErr];
	onReset?: () => void;
}

interface FormStorage<T> {
	read: (key: string) => FormsData<T> | null;
	write: (key: string, value: FormsData<T>) => void;
	erase: (key: string) => void;
}

const formContext = createContext<FormContext<unknown>>();

function useForm<T>(): FormContext<T> {
	const ctx = useContext(formContext);
	if (!ctx) throw new Error('useForm must be used within a Form');
	return ctx as FormContext<T>;
}

function createStorage<T>(storage: StorageType): FormStorage<T> | null {
	const store =
		storage === 'session' ? sessionStorage : storage === 'local' ? localStorage : null;

	const read = (key: string): FormsData<T> | null => {
		const item = store?.getItem(key);
		return item ? JSON.parse(item) : null;
	};

	const write = (key: string, value: FormsData<T>): void => {
		store?.setItem(key, JSON.stringify(value));
	};

	const erase = (key: string): void => {
		store?.removeItem(key);
	};

	return {
		read,
		write,
		erase,
	};
}

function setupStorage<T>(
	name: string,
	storageType: StorageType,
	formCtx: FormContext<T>,
	thisForm: HTMLFormElement | undefined,
) {
	const storage = createStorage<T>(storageType);
	const storageKey = 'form'.concat('-', name);

	let inputNames: string[] = [];
	let pendingUpdate: ReturnType<typeof setTimeout> | null = null;
	const debounceDelay = 1000;

	onMount(() => {
		const inputs = thisForm?.querySelectorAll('input, select, textarea');

		if (!inputs) return;
		inputNames = Array.from(inputs)
			.map((input) => input.getAttribute('name'))
			.filter((name): name is string => name !== null);
	});

	createEffect(() => {
		const currentState = {} as FormsData<T>;

		for (const name of inputNames) {
			if (name in formCtx.state) {
				currentState[name as keyof T] = formCtx.state[name as keyof T];
			}
		}

		if (pendingUpdate) clearTimeout(pendingUpdate);
		pendingUpdate = setTimeout(() => {
			storage?.write(storageKey, currentState);
		}, debounceDelay);
	});
}

function createForm<T>(props: FormProps<T>): FormContext<T> {
	const storageKey = 'form'.concat('-', props.name);
	const storage = createStorage<T>(props.storage);
	const storedState = storage?.read(storageKey);

	const [state, setState] = createStore<FormsData<T>>(
		storedState || props.initialState || ({} as FormsData<T>),
	);
	const [status, setStatus] = createSignal<FormStatus>('initial');
	const [errors, setErrors] = createStore<FormErr>({});
	const [isValid, setIsValid] = createSignal(false);

	let parsedState: FormsData<T> | null = null;

	const validate = (): boolean => {
		try {
			setStatus('validating');

			if (!props.actions?.onValidate) {
				setErrors({});
				return true;
			}

			const validated = props.actions.onValidate(state);
			const hasErrors = (errors: FormErr): boolean => {
				setErrors(errors);

				const hasError = Object.keys(errors).length > 0;
				setStatus(hasError ? 'error' : 'initial');
				setIsValid(!hasError);

				return hasError;
			};

			if (Array.isArray(validated)) {
				const formValid = !hasErrors(validated[1]);
				if (formValid) parsedState = validated[0];
				return formValid;
			}

			return !hasErrors(validated);
		} catch (error) {
			setStatus('error');
			return false;
		}
	};

	const submit = async () => {
		if (status() === 'submitting' || status() === 'validating') {
			return;
		}

		if (!isValid()) return;

		try {
			setStatus('submitting');

			if (props.actions?.onSubmit) {
				await props.actions.onSubmit(parsedState || state);
			}

			setStatus('success');
		} catch (error) {
			setStatus('failure');
		}
	};

	const reset = () => {
		setState(props.initialState || ({} as FormsData<T>));
		parsedState = null;
		setErrors({});
		setStatus('initial');
		setIsValid(false);
		props.actions?.onReset?.();
	};

	return {
		name: () => props.name,
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
		props: () => props,
	};
}

type FormElementProps<T> = ChildProp &
	({ ctx: FormContext<T>; params?: never } | { ctx?: never; params: FormProps<T> });

function Form<T>(props: FormElementProps<T>): View {
	const [thisForm, setThisForm] = createSignal<HTMLFormElement>();
	const form = props.ctx ?? createForm<T>(props.params);

	onMount(() => {
		const params = props.params ?? props.ctx?.props();
		setupStorage<T>(form.name(), params?.storage, form, thisForm());
	});

	return (
		<formContext.Provider value={form as FormContext<unknown>}>
			<form
				ref={setThisForm}
				id={form.name()}
				name={form.name()}
				onSubmit={(e) => {
					e.preventDefault();
					form.validate();
					form.submit();
				}}
				autocomplete={'off'}
				noValidate={true}
			>
				{props.children}
			</form>
		</formContext.Provider>
	);
}

export {
	type FormsData,
	type FormStatus,
	type FormErr,
	type FormContext,
	useForm,
	type FormActions,
	type FormProps,
	createForm,
	Form,
};
