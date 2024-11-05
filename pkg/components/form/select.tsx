import { splitProps } from 'solid-js';
import { Field } from '../../forms/field';
import { InputGroup } from '../input/group';
import { Label } from '../input/label';
import { InputFeedback } from '../input/feedback';
import { Select, type SelectProps } from '../input/select';

type FormSelectProps<T> = Omit<SelectProps<T>, 'name'> & {
	name: string;
	label: string;
	mask?: (e: InputEvent) => void;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const FormSelect = <T,>(props: FormSelectProps<T>) => {
	const [local, rest] = splitProps(props, [
		'id',
		'name',
		'label',
		'mask',
		'size',
		'required',
		'value',
		'onChange',
	]);

	return (
		<Field<T> name={local.name}>
			{(field) => (
				<InputGroup size={local.size}>
					<Label
						for={local.name}
						textContent={local.label}
						required={local.required}
					/>
					<Select<T>
						id={local.name}
						onChange={(value) => {
							field.setValue(value);
							field.setError('');
						}}
						value={field.value()}
						variant={field.error() ? 'error' : 'default'}
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

export { FormSelect, type FormSelectProps };
