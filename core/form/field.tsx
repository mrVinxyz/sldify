import { createContext, createEffect, createMemo, createSignal, useContext } from 'solid-js';
import { type FormContext, useForm } from './form';
import type { View } from '../types';

export type FieldErr = string;

export type FieldContextProps<T> = {
	value: () => T | undefined;
	setValue: (value: T | undefined) => void;
	errors: () => FieldErr;
	setErrors: (errors: FieldErr) => void;
};

const FieldContext = createContext<FieldContextProps<unknown>>();

export function useField<T>(): FieldContextProps<T> {
	const ctx = useContext(FieldContext);
	if (!ctx) throw new Error('useField must be used within a Field');
	return ctx as FieldContextProps<T>;
}

export function createField<T>(name: string): FieldContextProps<T> {
	const [value, setValue] = createSignal<T | undefined>();
	const [errors, setErrors] = createSignal<FieldErr>('');
	let wasModified = false;

	const formCtx = useForm<Record<string, T>>();

	const updateFormData = () => {
		const val = createMemo(() => value());
		if ((val() === undefined || val() === '') && !wasModified) return;

		formCtx?.setState((prevData: Record<string, T>) => ({
			...prevData,
			[name]: val(),
		}));
	};

	const updateFormErr = () => {
		formCtx?.setErrors((prev: Record<string, string>) => ({
			...prev,
			[name]: errors(),
		}));
	};

	const updateFieldVal = () => {
		const val: T | undefined = formCtx.state[name] as T | undefined;
		if (val !== undefined) {
			wasModified = true;
			// TODO figure out how to fix type
			// @ts-ignore
			setValue(val);
		}
	};

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

export type FieldProps<T> = {
	name: string;
	children: (ctx: FieldContextProps<T>) => View;
};

export function Field<T>(props: FieldProps<T>): View {
	const ctx = createField(props.name);

	return (
		<FieldContext.Provider value={ctx}>
			{props.children(ctx as FieldContextProps<T>)}
		</FieldContext.Provider>
	);
}
