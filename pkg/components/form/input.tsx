import { Field } from '../../forms/field';
import { InputField } from '../input/field';
import coerceValue from '../../utils/coerce-value';

type FormInputProps = {
	id?: string;
	name: string;
	label: string;
	type?: string;
	placeholder?: string;
	mask?: (e: InputEvent) => void;
	required?: boolean;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const FormInput = <T,>(props: FormInputProps) => (
	<Field<T> name={props.name}>
		{(field) => (
			<InputField
				id={props.id || props.name}
				name={props.name}
				label={props.label}
				input={{
					placeholder: props.placeholder,
					onInput: (e) => {
						props.mask?.(e);

						const value = (e.target as HTMLInputElement).value;
						const coercedValue = coerceValue<T>(value, props.type);
						field.setValue(coercedValue);
					},
					onChange: () => field.setError(''),
					variant: field.error() !== '' ? 'error' : 'default',
					value: String(field.value() || ''),
				}}
				feedback={{
					variant: 'error',
					msg: field.error(),
				}}
				size={props.size}
				required={props.required}
			/>
		)}
	</Field>
);

export { FormInput, type FormInputProps };
