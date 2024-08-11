import {
	createContext,
	createEffect,
	createSignal,
	type JSXElement,
} from 'solid-js';
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

	const formCtx = useForm();

	const updateFormData = () => {
		formCtx?.setData((prevData: FormsData) => ({
			...prevData,
			[name]: value(),
		}));
	};

	const updateFormErr = () => {
		formCtx?.setErrors((prev: Record<string, string>) => ({
			...prev,
			[name]: errors(),
		}));
	};

	const updateFieldErr = () => {
		const err = formCtx.errors[name];
		if (err) {
			setErrors(err);
		}
	};

	createEffect(() => updateFormData());
	createEffect(() => updateFormErr());
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

	return (
		<FieldContext.Provider value={ctx}>
			{props.children(ctx)}
		</FieldContext.Provider>
	);
}
