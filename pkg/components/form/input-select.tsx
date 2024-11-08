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
	key?: keyof T;
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
		<Field<T, string> name={name}>
			{(field) => {
				const getDisplayValue = () => {
					const value = field.value();
					if (value === undefined) return '';

					if (typeof value === 'object' && value !== null && local.key) {
						const propertyValue = value[local.key];
						return propertyValue != null ? String(propertyValue) : '';
					}

					return String(value || '');
				};

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
								queueMicrotask(() => {
									field.setMeta(option.label || '');
									field.setValue(option.value);
									field.setError('');
								});
							}}
							variant={field.error() ? 'error' : 'default'}
							required={local.required}
							defaultOption={{
								label: field.meta() || getDisplayValue(),
								value: field.value(),
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
