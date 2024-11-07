import { splitProps } from 'solid-js';
import { Field } from '../../forms/field';
import type { FormInputProps } from './input';

type FormInputHiddenProps = Omit<FormInputProps, 'label' | 'mask' | 'size'>;

const FormInputHidden = <T,>(props: FormInputHiddenProps) => {
	const [local, rest] = splitProps(props, ['name', 'onInput']);

	return (
		<Field<T> name={local.name}>
			{(field) => (
				<input
					type='hidden'
					name={local.name}
					value={field.value() as string | string[] | number | undefined}
					onInput={(e) => {
						const value = (e.target as HTMLInputElement).value;
						field.setValue(value as T);
						if (typeof local.onInput === 'function') {
							local.onInput(e);
						}
					}}
					{...rest}
				/>
			)}
		</Field>
	);
};

export { type FormInputHiddenProps, FormInputHidden };