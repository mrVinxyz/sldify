import { createContext, createEffect, createMemo, createSignal, type JSXElement } from 'solid-js';
import { type FormsData, useForm } from './form';

export type FieldValue = string | number;
export type FieldErr = string;

export type FieldContextProps = {
	value: () => FieldValue;
	setValue: (value: FieldValue) => void;
	errors: () => FieldErr;
	setErrors: (errors: FieldErr) => void;
};

const FieldContext = createContext<FieldContextProps>();

export function useField(name: string): FieldContextProps {
	const [value, setValue] = createSignal<FieldValue>('');
	const [errors, setErrors] = createSignal<FieldErr>('');
	let wasModified = false;

	const formCtx = useForm();

	const updateFormData = () => {
		const val = createMemo(() => value());
		if (val() === '' && !wasModified) return;

		formCtx?.setData((prevData: FormsData) => ({
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
		const val = formCtx.data[name];
		if (val) {
			wasModified = true;
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

export type FieldProps = {
	name: string;
	children: (ctx: FieldContextProps) => JSXElement;
};

export function Field(props: FieldProps) {
	const ctx = useField(props.name);

	return <FieldContext.Provider value={ctx}>{props.children(ctx)}</FieldContext.Provider>;
}
