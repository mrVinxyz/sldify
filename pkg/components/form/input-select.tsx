import { splitProps } from 'solid-js';
import { Field } from '../../forms/field';
import { InputGroup } from '../input/group';
import { Label } from '../input/label';
import { InputFeedback } from '../input/feedback';
import { InputSelect, type InputSelectProps } from '../input/input-select';

type FormInputSelectProps<T extends string | number | object> = InputSelectProps<T> & {
	name: string;
	label: string;
	mask?: (e: InputEvent) => void;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	key: keyof T;
};

const FormInputSelect = <T extends string | number | object>(props: FormInputSelectProps<T>) => {
	const [local, rest] = splitProps(props, [
		'id',
		'name',
		'label',
		'mask',
		'size',
		'required',
		'key',
		'onChange',
	]);

	const name = local.name as string;
	return (
		<Field<T> name={name}>
			{(field) => {
				const value = field.value();

				let parsedValue: unknown;
				if (typeof value === 'object' && local.key) {
					parsedValue = value[local.key];
				} else {
					parsedValue = value;
				}

				return (
					<InputGroup size={local.size}>
						<Label
							for={name}
							textContent={local.label}
							required={local.required}
						/>
						<InputSelect<T>
							id={name}
							onSelected={(option) => {
								let selectedValue: T | unknown;

								if (
									local.key &&
									typeof option.value === 'object' &&
									option.value !== null
								) {
									selectedValue = option.value[local.key];
								} else {
									selectedValue = option.value;
								}

								field.setValue(selectedValue as T);
								field.setError('');
							}}
							variant={field.error() ? 'error' : 'default'}
							required={local.required}
							initialOption={{
								label: String(parsedValue || ''),
								value: value,
							}}
							name={name}
							{...rest}
						/>
						<InputFeedback
							variant='error'
							msg={field.error()}
						/>
					</InputGroup>
				);
			}}
		</Field>
	);
};

export { FormInputSelect, type FormInputSelectProps };
