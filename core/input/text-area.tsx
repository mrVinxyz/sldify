import { splitProps } from 'solid-js';
import { type InputProps, inputStyles } from './input';
import type { OmitProp, View } from '../types';

export type TextAreaProps = OmitProp<InputProps, 'onEnter'> & {
	rows?: number;
};

export const TextArea = (props: TextAreaProps): View => {
	const [prop, others] = splitProps(props, [
		'name',
		'placeholder',
		'disabled',
		'rows',
		'className',
	]);

	return (
		<textarea
			id={prop.name + 'Input'}
			name={prop.name}
			class={inputStyles({ disabled: prop.disabled }) + ' '.concat(prop.className || '')}
			disabled={prop.disabled}
			placeholder={props.placeholder}
			rows={prop.rows || 2}
			{...others}
		/>
	);
};
