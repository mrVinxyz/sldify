import { type ButtonProps, ResetBtn, SubmitBtn } from '../button';
import { useForm } from './form';
import { splitProps } from 'solid-js';

export function FormSubmitButton(props: ButtonProps) {
	const [onPress, others] = splitProps(props, ['onPress']);
	const formCtx = useForm();
	return <SubmitBtn {...others} />;
}

export function FormResetButton(props: ButtonProps) {
	const [prop, others] = splitProps(props, ['onPress']);
	const formCtx = useForm();

	const handleOnPress = (e: Event) => {
		if (prop.onPress && typeof prop.onPress === 'function') prop.onPress(e);
		formCtx.cleanStorage();
	};

	return (
		<ResetBtn
			onPress={handleOnPress}
			{...others}
		/>
	);
}
