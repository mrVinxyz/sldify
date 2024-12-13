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
	labelKey?: keyof T;
	valueKey?: keyof T;
};

const FormInputSelect = <T extends string | number | object>(props: FormInputSelectProps<T>) => {
	const [local, rest] = splitProps(props, [
		'id',
		'name',
		'label',
		'mask',
		'size',
		'required',
		'labelKey',
		'valueKey',
		'onChange',
		'type',
	]);

	const name = local.name as string;

	const parseValue = (value: T | undefined): T | undefined => {
		if (typeof value === 'object' && value !== null && local.valueKey) {
			return (value as Record<string, T>)[local.valueKey as string];
		}

		return value;
	};

	return (
		<Field<T, string> name={name}>
			{(field) => {
				const getDisplayValue = () => {
					const value = field.value();
					if (value === undefined) return '';

					if (typeof value === 'object' && value !== null && local.labelKey) {
						const propertyValue = value[local.labelKey];
						return propertyValue != null ? String(propertyValue) : '';
					}

					return field.meta() || String(value || '');
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
									const parsedValue = parseValue(option.value);

									field.setMeta(option.label || '');
									field.setValue(parsedValue);
									field.setError('');
								});
							}}
							variant={field.error() ? 'error' : 'default'}
							required={local.required}
							defaultOption={{
								label: getDisplayValue(),
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
