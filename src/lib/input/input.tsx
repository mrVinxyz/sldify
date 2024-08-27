import { For, type JSX, splitProps } from 'solid-js';
import { gridColsSpanSize } from '../utils';

/** The input field size.
 * @values xs=2; sm=4; md=6; lg=8; xl=10; full=12;
 * @usage `grid-cols-span-${size}`
 */
export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Props for the Group component.
 */
type GroupProps = {
	/** The child elements to be rendered inside the group. */
	children: JSX.Element;
	/** Optional additional class names for the group container. */
	class?: string;
	/** The input field size.
	 * @default w-full
	 */
	size?: InputSize;
};

/**
 * Group component to wrap child elements with additional styling.
 *
 * @param {GroupProps} props - The properties for the Group component.
 * @returns {JSX.Element} - The rendered Group component.
 */
const Group = (props: GroupProps): JSX.Element => {
	return (
		<div
			class={`relative block w-full col-span-12 ${props.class || ''} ${gridColsSpanSize(props.size || '')}`}
		>
			{props.children}
		</div>
	);
};

/**
 * Props for the Label component.
 */
type LabelProps = {
	/** The id of the input element this label is associated with. */
	for: string;
	/** The text content of the label. */
	label: string;
	/** Optional additional class names for the label. */
	class?: string;
};

/**
 * Label component to render a label for an input element.
 *
 * @param {LabelProps} props - The properties for the Label component.
 * @returns {JSX.Element} - The rendered Label component.
 */
const Label = (props: LabelProps): JSX.Element => {
	return (
		<label
			for={props.for}
			class={`mb-2 text-sm lg:text-base font-medium text-gray-800 flex items-center ${props.class || ''}`}
		>
			{props.label}
		</label>
	);
};

/**
 * Props for the Feedback component.
 */
type FeedbackProps = {
	/** The feedback message to be displayed. */
	msg: string;
	/** Optional additional class names for the feedback message. */
	class?: string;
};

/**
 * Feedback component to render feedback messages.
 *
 * @param {FeedbackProps} props - The properties for the Feedback component.
 * @returns {JSX.Element} - The rendered Feedback component.
 */
const Feedback = (props: FeedbackProps): JSX.Element => {
	return (
		<p class={`mt-2 text-sm lg:text-base font-medium text-gray-800 ${props.class || ''}`}>
			{props.msg}
		</p>
	);
};

/**
 * Props for the InputEl component.
 */
type InputProps = {
	/** The name of the input field. */
	name: string;
	/** The placeholder text for the input field. */
	placeholder?: string;
	/** Whether the input field is required. */
	required?: boolean;
	/** Whether the input field is disabled. */
	disabled?: boolean;
	/** Whether the input field is read-only. */
	readonly?: boolean;
	/** Optional additional class names for the input field. */
	class?: string;
	/** Additional properties for the input element. */
	[key: string]: unknown;
};

/**
 * InputEl component to render a text input field.
 *
 * @param {InputProps} props - The properties for the InputEl component.
 * @returns {JSX.Element} - The rendered InputEl component.
 */
const InputEl = (props: InputProps): JSX.Element => {
	const [prop, others] = splitProps(props, [
		'name',
		'placeholder',
		'required',
		'disabled',
		'readonly',
		'class',
	]);

	const dynamicClasses = () => {
		let style = '';
		if (props.disabled) style += 'cursor-not-allowed';
		if (prop.class) style += prop.class;
		return style;
	};

	return (
		<input
			id={prop.name + 'Input'}
			name={prop.name}
			type='text'
			class={`block w-full rounded-md p-2 bg-gray-50 border border-gray-200 text-gray-800 font-medium focus:ring-blue-600 focus:border-blue-600 text-sm lg:text-base ${dynamicClasses()}`}
			placeholder={prop.placeholder}
			disabled={prop?.disabled}
			readonly={prop?.readonly}
			{...others}
		/>
	);
};

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
	/** Optional additional class names for the textarea field. */
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
const TextArea = (props: TextAreaProps): JSX.Element => {
	const [prop, others] = splitProps(props, ['name', 'class', 'placeholder', 'disabled']);

	return (
		<textarea
			id={prop.name + 'Input'}
			name={prop.name}
			class={`block w-full rounded-md text-sm p-2 bg-gray-50 border border-gray-200 text-gray-800 font-medium focus:ring-blue-600 focus:border-blue-600 ${props.disabled && 'cursor-not-allowed'} ${prop.class || ''}`}
			disabled={prop.disabled}
			placeholder={props.placeholder}
			rows={props.rows || 2}
			{...others}
		/>
	);
};

/**
 * Props for the Select component.
 */
type SelectProps = {
	/** The name of the select field. */
	name: string;
	/** The options for the select field. */
	options: { name: string; value: string }[];
	/** The default option for the select field. */
	default?: { name: string; value: string };
	/** The selected value for the select field. */
	value?: string | number;
	/** The change event handler for the select field. */
	onChange?: (e: Event) => void;
	/** Whether the select field is disabled. */
	disabled?: boolean;
	/** Optional additional class names for the select field. */
	class?: string;
	/** Additional properties for the select element. */
	[key: string]: unknown;
};

/**
 * Select component to render a select field.
 *
 * @param {SelectProps} props - The properties for the Select component.
 * @returns {JSX.Element} - The rendered Select component.
 */
const Select = (props: SelectProps): JSX.Element => {
	return (
		<select
			id={props.name}
			name={props.name}
			class={`w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm lg:text-base font-medium rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 ${props.disabled && 'cursor-not-allowed'} ${props.class || ''}`}
			onChange={props.onChange}
		>
			<option
				value={props?.default?.value || ''}
				selected
			>
				{props?.default?.name || ''}
			</option>
			<For each={props.options}>
				{(option) => (
					<option
						value={option.value}
						selected={props?.value === option.value}
					>
						{option.name}
					</option>
				)}
			</For>
		</select>
	);
};

/**
 * Input components collection.
 */
export const Input = {
	Group,
	Label,
	Feedback,
	Input: InputEl,
	TextArea,
	Select,
};
