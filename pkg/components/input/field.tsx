import { Input, type InputProps } from './input';
import { Label } from './label';
import { InputGroup, type InputGroupProps } from './group';
import { type Component, splitProps } from 'solid-js';
import { InputFeedback, type InputFeedbackProps } from './feedback';

type InputFieldProps = InputGroupProps & {
	id?: string;
	label: string;
	name: string;
	input: Omit<InputProps, 'id' | 'name'>;
	feedback: InputFeedbackProps;
	required?: boolean;
};

const InputField: Component<InputFieldProps> = (props) => {
	const [local, rest] = splitProps(props, ['id', 'name', 'input', 'feedback','label', 'required']);
	const fieldId = props.id || props.name;
	console.log(local.input)
	return (
		<InputGroup {...rest}>
			<Label
				id={fieldId}
				for={local.name}
				textContent={local.label}
				required={local.required}
			/>
			<Input
				id={fieldId}
				name={local.name}
				{...local.input}
			/>
			<InputFeedback {...local.feedback} />
		</InputGroup>
	);
};

export { InputField, type InputFieldProps };
