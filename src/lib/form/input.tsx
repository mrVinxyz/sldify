import { Field } from './field';
import { Input } from '../input/input';
import type { JSX } from 'solid-js';
import { gridColsSpanSize } from '../utils';

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
	/** The input field size.
	 * @default w-full
	 */
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
				<Input.Group size={props.size}>
					<Input.Label
						for={props.name}
						label={props.label}
					/>
					<Input.Input
						name={props.name}
						placeholder={props.placeholder}
						value={field.value()}
						onInput={(e: InputEvent) => props.mask?.(e)}
						onChange={(e: Event) => {
							field.setValue((e.target as HTMLInputElement).value);
							field.setErrors('');
						}}
						class={`${field.errors() ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : ''}`}
					/>
					<Input.Feedback
						msg={field.errors()}
						class={field.errors() ? 'text-red-600' : ''}
					/>
				</Input.Group>
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
				<Input.Group size={props.size}>
					<Input.Label
						for={props.name}
						label={props.label || ''}
					/>
					<Input.TextArea
						name={props.name}
						placeholder={props.placeholder}
						value={field.value()}
						onChange={(e: Event) =>
							field.setValue((e.target as HTMLTextAreaElement).value)
						}
						class={`${field.errors() ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : ''}`}
					/>
					<Input.Feedback msg={field.errors()} />
				</Input.Group>
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
 *    label="Select a color"
 *    options={[
 *    	{ name: 'Red', value: '#ff0000' },
 *    	{ name: 'Green', value: '#00ff00' },
 *    ]}
 *    default={{ name: 'Select a color', value: '' }}
 *    />
 *    ```
 */
export function FormSelect(props: FormSelectProps): JSX.Element {
	return (
		<Field name={props.name}>
			{(field) => (
				<Input.Group class={`md:${gridColsSpanSize(props.size || '')}`}>
					<Input.Label
						for={props.name}
						label={props.label}
					/>
					<Input.Select
						name={props.name}
						options={props.options}
						default={props.default}
						value={field.value()}
						onChange={(e: Event) =>
							field.setValue((e.target as HTMLSelectElement).value)
						}
						class={`${field.errors() ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : ''}`}
					/>
					<Input.Feedback msg={field.errors()} />
				</Input.Group>
			)}
		</Field>
	);
}
