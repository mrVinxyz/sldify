import { createContext, createEffect, createMemo, createSignal, useContext } from 'solid-js';
import { useForm } from './forms';
import type { View } from '../utils/types';

type FieldState<T> = {
	value: T | undefined;
	error: string;
	touched: boolean;
	dirty: boolean;
};

type FieldContextProps<T> = {
	value: () => T | undefined;
	setValue: (value: T | undefined) => void;
	error: () => string;
	setError: (error: string) => void;
	touched: () => boolean;
	dirty: () => boolean;
	reset: () => void;
};

const fieldContext = createContext<FieldContextProps<unknown>>();

function useField<T>(): FieldContextProps<T> {
	const ctx = useContext(fieldContext);
	if (!ctx) throw new Error('useField must be used within a Field');
	return ctx as FieldContextProps<T>;
}

function createField<T>(name: string): FieldContextProps<T> {
	const formCtx = useForm<Record<string, T>>();

	// Local state
	const [initialValue] = createSignal(formCtx.state[name] as T | undefined);
	const [value, setValue] = createSignal<T | undefined>(formCtx.state[name] as T | undefined);
	const [error, setError] = createSignal<string>('');
	const [touched, setTouched] = createSignal(false);

	const dirty = createMemo(() => {
		const currentValue = value();
		const initial = initialValue();
		return touched() && currentValue !== initial;
	});

	const updateFormData = () => {
		const currentValue = value();
		if (!touched() && (currentValue === undefined || currentValue === '')) {
			return;
		}

		formCtx.setState((prev) => ({
			...prev,
			[name]: currentValue,
		}));
	};

	const updateFormError = () => {
		formCtx?.setErrors((prev: Record<string, string>) => ({
			...prev,
			[name]: error(),
		}));
	};

	const updateFieldValue = () => {
		const formValue = formCtx.state[name] as T | undefined;
		if (formValue !== undefined && formValue !== value()) {
			setValue(() => formValue as Exclude<T, Function>);
			setTouched(true);
		}
	};

	const updateFieldError = () => {
		const formError = formCtx.errors[name];
		if (formError) setError(formError);
	};

	const reset = () => {
		setValue(initialValue() as Exclude<T, Function>);
		setError('');
		setTouched(false);
	};

	const handleSetValue = (newValue: T | undefined) => {
		setValue(newValue as Exclude<T, Function>);
		setTouched(true);
	};

	createEffect(() => updateFormData());
	createEffect(() => updateFormError());
	createEffect(() => updateFieldValue());
	createEffect(() => updateFieldError());

	return {
		value,
		setValue: handleSetValue,
		error,
		setError,
		touched,
		dirty,
		reset,
	};
}

type FieldProps<T> = {
	name: string;
	children: (ctx: FieldContextProps<T>) => View;
};

function Field<T>(props: FieldProps<T>): View {
	const ctx = createField(props.name);

	return (
		<fieldContext.Provider value={ctx}>
			{props.children(ctx as FieldContextProps<T>)}
		</fieldContext.Provider>
	);
}

export { type FieldState, type FieldContextProps, useField, createField, type FieldProps, Field };
