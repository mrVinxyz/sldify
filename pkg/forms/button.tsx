import { type ButtonProps, SubmitBtn } from '../components/button/button';
import { type Component, splitProps } from 'solid-js';
import { useForm } from './forms';

const FormSubmitBtn: Component<ButtonProps> = (props) => {
	const [local, rest] = splitProps(props, ['onClick']);
	const form = useForm();
	return (
		<SubmitBtn
			onClick={(e) => {
				if (typeof local.onClick === 'function') local.onClick(e);
				// form.validate();
			}}
			{...rest}
		/>
	);
};

export { FormSubmitBtn };