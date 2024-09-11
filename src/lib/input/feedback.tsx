import type { Element } from '../types';

export type InputFeedbackProps = {
	/** The properties for the InputFeedback component. */
	msg: string;
	/** The type of feedback message. */
	type: 'success' | 'error' | 'warning' | 'info' | 'default';
};

/**
 * InputFeedback component to render feedback messages.
 *
 * @param {string} props.msg - The properties for the InputFeedback component.
 * @returns {JSX.Element} - The rendered InputFeedback component.
 */
export const InputFeedback = (props: InputFeedbackProps): Element => {
	return (
		<p
			classList={{
				'mt-2 text-sm font-medium text-gray-800': true,
				'text-green-600': props.type === 'success',
				'text-red-600': props.type === 'error',
				'text-yellow-600': props.type === 'warning',
				'text-blue-600': props.type === 'info',
				'text-gray-600': props.type === 'default',
			}}
		>
			{props.msg}
		</p>
	);
};
