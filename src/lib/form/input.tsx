import { Field } from './field';
import type { JSX } from 'solid-js';
import { Label } from '../input/label';
import { InputGroup } from '../input/group';
import { InputEl } from '../input/input';
import { InputFeedback } from '../input/feedback';
import { TextArea } from '../input/text-area';
import { InputSelect } from '../input/select';

/** The input field size.
 * @values xs=2; sm=4; md=6; lg=8; xl=10; full=12;
 * @usage `grid-cols-span-${size}`
 */
export type FormInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Props for the FormInput component.
 */
export type FormInputProps = {
	/** The name of the input field. */
	name: string;
	/** The placeholder text for the input field. */
	placeholder?: string;
	/** The label text for the input field. */
	label: string;
	/** Optional mask function to apply on input event. */
	mask?: (e: InputEvent) => void;
	/** The input field size. Default `full`.*/
	size?: FormInputSize;
};

/**
 * FormInput component to render an input field with label and feedback.
 *
 * @param {FormInputProps} props - The properties for the FormInput component.
 * @returns {JSX.Element} - The rendered FormInput component.
 */
export function FormInput(props: FormInputProps): JSX.Element {
	return (
		<Field name={props.name}>
			{(field) => (
				<InputGroup size={props.size}>
					<Label
						for={props.name}
						label={props.label}
					/>
					<InputEl
						name={props.name}
						placeholder={props.placeholder}
						value={field.value()}
						onInput={(e: InputEvent) => props.mask?.(e)}
						onChange={(e: Event) => {
							field.setValue((e.target as HTMLInputElement).value);
							field.setErrors('');
						}}
					/>
					<InputFeedback
						type='error'
						msg={field.errors()}
					/>
				</InputGroup>
			)}
		</Field>
	);
}

/**
 * Props for the FormTextArea component.
 */
export type FormTextAreaProps = {
	/** The name of the textarea field. */
	name: string;
	/** The label text for the textarea field. */
	label?: string;
	/** The placeholder text for the textarea field. */
	placeholder?: string;
	/** The input field size.
	 * @default w-full
	 */
	size?: FormInputSize;
};

/**
 * FormTextArea component to render a textarea field with label and feedback.
 *
 * @param {FormTextAreaProps} props - The properties for the FormTextArea component.
 * @returns {JSX.Element} - The rendered FormTextArea component.
 * @example
 * ```tsx
 * <FormTextArea
 *   name="message"
 *   label="Message"
 *   placeholder="Enter your message here..."
 *   />
 * ```
 */
export function FormTextArea(props: FormTextAreaProps): JSX.Element {
	return (
		<Field name={props.name}>
			{(field) => (
				<InputGroup size={props.size}>
					<Label
						for={props.name}
						label={props.label || ''}
					/>
					<TextArea
						name={props.name}
						placeholder={props.placeholder}
						value={field.value()}
						onChange={(e: Event) =>
							field.setValue((e.target as HTMLTextAreaElement).value)
						}
						class={`${field.errors() ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : ''}`}
					/>
					<InputFeedback
						type='error'
						msg={field.errors()}
					/>
				</InputGroup>
			)}
		</Field>
	);
}

/**
 * Props for the FormSelect component.
 */
export type FormSelectProps = {
	/** The name of the select field. */
	name: string;
	/** The label text for the select field. */
	label: string;
	/** The options for the select field. */
	options: { name: string; value: string }[];
	/** The default option for the select field. */
	default?: { name: string; value: string };
	/** The input field size.
	 * @default w-full
	 */
	size?: FormInputSize;
};

/**
 * FormSelect component to render a select field with label and feedback.
 *
 * @param {FormSelectProps} props - The properties for the FormSelect component.
 * @returns {JSX.Element} - The rendered FormSelect component.
 * @example
 * ```tsx
 * <FormSelect
 *    name="color"
 *    label="Selectable a color"
 *    options={[
 *    	{ name: 'Red', value: '#ff0000' },
 *    	{ name: 'Green', value: '#00ff00' },
 *    ]}
 *    default={{ name: 'Selectable a color', value: '' }}
 *    />
 *    ```
 */
export function FormSelect(props: FormSelectProps): JSX.Element {
	return (
		<Field name={props.name}>
			{(field) => (
				<InputGroup size={props.size}>
					<Label
						for={props.name}
						label={props.label}
					/>
					<InputSelect
						name={props.name}
						options={props.options}
						default={props.default}
						value={field.value()}
						onChange={(e: Event) =>
							field.setValue((e.target as HTMLSelectElement).value)
						}
						class={`${field.errors() ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : ''}`}
					/>
					<InputFeedback
						type='error'
						msg={field.errors()}
					/>
				</InputGroup>
			)}
		</Field>
	);
}
