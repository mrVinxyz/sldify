import { Field } from '../../forms/field';
import coerceValue from '../../utils/coerce-value';
import { Input, type InputProps } from '../input/input';
import { splitProps } from 'solid-js';
import { InputGroup } from '../input/group';
import { Label } from '../input/label';
import { InputFeedback } from '../input/feedback';

type FormInputProps<T> = Omit<InputProps, 'name'> & {
	name: keyof T;
	label: string;
	mask?: (e: InputEvent) => void;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const FormInput = <T,>(props: FormInputProps<T>) => {
	const [local, rest] = splitProps(props, [
		'id',
		'name',
		'label',
		'mask',
		'size',
		'required',
		'onInput',
	]);

	const name = local.name as string;

	return (
		<Field<T> name={name}>
			{(field) => (
				<InputGroup size={local.size}>
					<Label
						for={name}
						textContent={local.label}
						required={local.required}
					/>
					<Input
						id={name}
						onInput={(e) => {
							props.mask?.(e);

							const value = (e.target as HTMLInputElement).value;
							const coercedValue = coerceValue<T>(value, props.type);
							field.setValue(coercedValue);
							if (typeof local.onInput === 'function') local.onInput?.(e);
						}}
						onChange={() => field.setError('')}
						variant={field.error() !== '' ? 'error' : 'default'}
						value={field.value() as string | number | string[] | undefined}
						required={local.required}
						{...rest}
					/>
					<InputFeedback
						variant='error'
						msg={field.error()}
					/>
				</InputGroup>
			)}
		</Field>
	);
};

export { FormInput, type FormInputProps };
