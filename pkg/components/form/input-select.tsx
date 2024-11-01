import { splitProps } from 'solid-js';
import { Field } from '../../forms/field';
import { InputGroup } from '../input/group';
import { Label } from '../input/label';
import { InputFeedback } from '../input/feedback';
import { InputSelect, type InputSelectProps } from '../input/input-select';

type FormInputSelectProps<T> = InputSelectProps<T> & {
	name: keyof T;
	label: string;
	mask?: (e: InputEvent) => void;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const FormInputSelect = <T,>(props: FormInputSelectProps<T>) => {
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
					<InputSelect<T>
						id={name}
						onSelected={(option) => {
							field.setValue(option.value);
							field.setError('');
						}}
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

export { FormInputSelect, type FormInputSelectProps };
