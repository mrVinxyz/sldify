import { createContext, createEffect, createMemo, createSignal, useContext } from 'solid-js';
import { type FormsData, useForm } from './form';
import type { View } from '../types';

export type FieldValue<T> = T;

export type FieldErr = string;

export type FieldContextProps<T> = {
	value: () => FieldValue<T>;
	setValue: (value: FieldValue<T>) => void;
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
	const [value, setValue] = createSignal<FieldValue<T>>(undefined as T);
	const [errors, setErrors] = createSignal<FieldErr>('');
	let wasModified = false;

	const formCtx = useForm();

	const updateFormData = () => {
		const val = createMemo(() => value());
		if ((val() === undefined || val() === '') && !wasModified) return;

		formCtx?.setState((prevData: FormsData) => ({
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
		const val = formCtx.state[name];
		if (val) {
			wasModified = true;
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
