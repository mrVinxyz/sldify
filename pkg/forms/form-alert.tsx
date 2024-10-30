import { useForm } from './forms';
import { type Component, createEffect } from 'solid-js';
import { Alert, type AlertProps, createAlert } from '../components/alert/alert';

const FormAlert: Component<AlertProps> = (props) => {
	const form = useForm();
	const alert = props.ctx ?? createAlert();

	createEffect(() => {
		if (form.status() === 'error') alert.show();
	});

	return (
		<Alert
			ctx={alert}
			class={'col-span-12'}
			{...props}
		/>
	);
};

export { FormAlert };