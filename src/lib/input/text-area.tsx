import { type JSX, splitProps } from 'solid-js';

/**
 * Props for the TextArea component.
 */
type TextAreaProps = {
	/** The name of the textarea field. */
	name: string;
	/** The placeholder text for the textarea field. */
	placeholder?: string;
	/** The number of rows for the textarea field. */
	rows?: number;
	/** Whether the textarea field is disabled. */
	disabled?: boolean;
	/** Optional additional class names for the input field. */
	class?: string;
	/** Additional properties for the textarea element. */
	[key: string]: unknown;
};

/**
 * TextArea component to render a textarea field.
 *
 * @param {TextAreaProps} props - The properties for the TextArea component.
 * @returns {JSX.Element} - The rendered TextArea component.
 */
export const TextArea = (props: TextAreaProps): JSX.Element => {
	const [prop, others] = splitProps(props, ['name', 'placeholder', 'disabled', 'rows', 'class']);

	return (
		<textarea
			id={prop.name + 'Input'}
			name={prop.name}
			classList={{
				'block w-full rounded-sm text-sm p-2.5 bg-gray-50 border border-gray-200 text-gray-800 font-medium focus:ring-blue-600 focus:border-blue-600 focus:outline-none': true,
				'cursor-not-allowed': prop.disabled,
				[prop.class || '']: !!prop.class
			}}
			disabled={prop.disabled}
			placeholder={props.placeholder}
			rows={prop.rows || 2}
			{...others}
		/>
	);
};
