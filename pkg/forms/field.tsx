import { createContext, createEffect, createMemo, createSignal, useContext } from 'solid-js';
import { useForm } from './forms';
import type { View } from '../utils/types';

type FieldContextProps<T, Any = unknown> = {
	value: () => T | undefined;
	setValue: (value: T | undefined) => void;
	error: () => string;
	setError: (error: string) => void;
	meta: () => Any | undefined;
	setMeta: (meta: Any) => void;
	touched: () => boolean;
	dirty: () => boolean;
	reset: () => void;
};

const fieldContext = createContext<FieldContextProps<unknown>>();

function useField<T, Any = unknown>(): FieldContextProps<T, Any> {
	const ctx = useContext(fieldContext);
	if (!ctx) throw new Error('useField must be used within a Field');
	return ctx as FieldContextProps<T, Any>;
}

function createField<T, Any = unknown>(name: string): FieldContextProps<T, Any> {
	const formCtx = useForm<Record<string, T>>();

	// Local state
	const initialValue = formCtx.state[name] as T | undefined;
	const [value, setValue] = createSignal<T | undefined>(formCtx.state[name] as T | undefined);
	const [error, setError] = createSignal<string>('');
	const [touched, setTouched] = createSignal(false);
	const [meta, setMeta] = createSignal<Any>();

	const dirty = createMemo(() => {
		const currentValue = value();
		return touched() && currentValue !== initialValue;
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
		if (formValue !== undefined) {
			setValue(() => formValue as Exclude<T, Function>);
			setTouched(true);
		}
	};

	const updateFieldError = () => {
		const formError = formCtx.errors[name];
		if (formError) setError(formError);
	};

	const reset = () => {
		setValue(initialValue as Exclude<T, Function>);
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
		meta,
		setMeta,
		touched,
		dirty,
		reset,
	};
}

type FieldProps<T, Any> = {
	name: string;
	children: (ctx: FieldContextProps<T, Any>) => View;
};

function Field<T, Any = unknown>(props: FieldProps<T, Any>): View {
	const ctx = createField(props.name);

	return (
		<fieldContext.Provider value={ctx}>
			{props.children(ctx as FieldContextProps<T, Any>)}
		</fieldContext.Provider>
	);
}

export type { FieldContextProps, FieldProps };
export { useField, createField, Field };
