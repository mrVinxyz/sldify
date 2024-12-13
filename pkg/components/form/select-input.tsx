import { Input, InputProps } from '../input/input';
import { createEffect, splitProps } from 'solid-js';
import { createField, Field } from '../../forms/field';
import { InputGroup } from '../input/group';
import { Label } from '../input/label';
import coerceValue from '../../utils/coerce-value';
import { InputFeedback } from '../input/feedback';
import { SelectInput, type SelectInputProps } from '../input/select-input';

type FormSelectInputProps<T> = SelectInputProps<T> & {
	name: string;
	label: string;
	mask?: (e: InputEvent) => void;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	required?: boolean;
	type?: string;
};

const FormSelectInput = <T,>(props: FormSelectInputProps<T>) => {
	const [local, rest] = splitProps(props, [
		'id',
		'name',
		'label',
		'mask',
		'size',
		'required',
		'onInput',
		'input',
		'select',
	]);

	const inputField = createField(local.input.name || '');
	const selectField = createField<T>(local.select.name || '');

	return (
		<InputGroup size={local.size}>
			<Label
				for={local.name}
				textContent={local.label}
				required={local.required}
			/>
			<SelectInput
				select={{
					...local.select,
					value: selectField.value(),
					onChange: (value) => {
						local.select?.onChange?.(value);

						selectField.setValue(value);
						selectField.setError('');
					},
					variant: selectField.error() ? 'error' : 'default',
					required: local.required,
				}}
				input={{
					id: local.name,
					name: local.name,
					onInput: (e) => {
						props.mask?.(e);

						const value = (e.target as HTMLInputElement).value;
						const coercedValue = coerceValue<T>(value, props.type);
						inputField.setValue(coercedValue);
						if (typeof local.onInput === 'function') local.onInput?.(e);
					},
					onChange: () => inputField.setError(''),
					variant: inputField.error() !== '' ? 'error' : 'default',
					value: inputField.value() as string | number | string[] | undefined,
					required: local.required,
					...local.input,
				}}
			/>
			<InputFeedback
				variant='error'
				msg={selectField.error() || inputField.error()}
			/>
		</InputGroup>
	);
};

export { type FormSelectInputProps, FormSelectInput };
