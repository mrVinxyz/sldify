import type { View } from '../types';
import {Show} from "solid-js";

/**
 * Properties of an InputFeedback.
 * @param msg The properties for the InputFeedback component.
 * @param type The type of feedback message.
 */
export type InputHelperProps = {
	msg?: string;
	type: 'success' | 'error' | 'warning' | 'info' | 'default';
};

/**
 * InputFeedback component to render feedback messages.
 *
 * @param {InputHelper} props - The properties for the InputFeedback component.
 * @returns {View} - The rendered InputFeedback component.
 */
export const InputHelper = (props: InputHelperProps): View => {
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

export const InputFeedback = (props: InputHelperProps): View => {
	return (
		<Show when={props.msg}>
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
		</Show>
	);
};
