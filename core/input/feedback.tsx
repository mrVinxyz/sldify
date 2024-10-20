import { cva } from 'class-variance-authority';
import type { View } from '../types';

export type InputFeedbackProps = {
	msg?: string;
	color?: 'plain' | 'success' | 'error' | 'warning' | 'alert' | 'info';
};

const feedbackStyles = cva('mt-2 text-sm font-medium text-start', {
	variants: {
		color: {
			plain: 'text-gray-600',
			success: 'text-green-600',
			error: 'text-red-600',
			warning: 'text-orange-600',
			alert: 'text-yellow-600',
			info: 'text-blue-600',
		},
	},
	defaultVariants: {
		color: 'plain',
	},
});

export const InputFeedback = (props: InputFeedbackProps): View => {
	return <p class={feedbackStyles({ color: props.color })}>{props.msg}</p>;
};
