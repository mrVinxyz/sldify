import { Field } from './field';
import { Label } from '../input';
import { InputGroup } from '../input';
import { Input } from '../input';
import { InputHelper } from '../input';
import { TextArea } from '../input';
import { InputSelect } from '../input';
import { InputWith } from '../input';
import { Checkbox, type CheckboxProps } from '../input/checkbox';
import type { View } from '../types';
import {cva} from "class-variance-authority";

/** The input field size.
 * @values xs=2; sm=4; md=6; lg=8; xl=10; full=12;
 * @usage `col-span-${size}`
 */
export type FormInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export const formInputSize = cva('', {
	variants: {
		size: {
			xs: 'col-span-12 md:col-span-2',
			sm: 'col-span-12 md:col-span-4',
			md: 'col-span-12 md:col-span-6',
			lg: 'col-span-12 md:col-span-8',
			xl: 'col-span-12 md:col-span-10',
			full: 'col-span-12 md:col-span-12',
		},
	},
	defaultVariants: {
		size: 'md', // Default size if none is specified
	},
});

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
 * @returns {View} - The rendered FormInput component.
 */
export function FormInput(props: FormInputProps): View {
	return (
		<Field name={props.name}>
			{(field) => (
				<InputGroup size={props.size}>
					<Label
						for={props.name}
						label={props.label}
					/>
					<Input
						name={props.name}
						placeholder={props.placeholder}
						value={field.value()}
						onInput={(e: InputEvent) => props.mask?.(e)}
						onChange={(e: Event) => {
							field.setValue((e.target as HTMLInputElement).value);
							field.setErrors('');
						}}
						style={field.errors() ? 'error' : 'plain'}
						className={`${field.errors() ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : ''}`}
					/>
					<InputHelper
						type='error'
						msg={field.errors()}
					/>
				</InputGroup>
			)}
		</Field>
	);
}

type FormInputWithProps = FormInputProps & {
	leading?: View;
	trailing?: View;
};

export function FormInputWith(props: FormInputWithProps): View {
	return (
		<Field name={props.name}>
			{(field) => (
				<InputGroup size={props.size}>
					<Label
						for={props.name}
						label={props.label}
					/>
					<InputWith
						leading={props.leading}
						trailing={props.trailing}
						input={{
							name: props.name,
							placeholder: props.placeholder,
							value: field.value(),
							onInput: (e: InputEvent) => props.mask?.(e),
							onChange: (e: Event) => {
								field.setValue((e.target as HTMLInputElement).value);
								field.setErrors('');
							},
							style: field.errors() ? 'error' : 'plain',
						}}
					/>
					<InputHelper
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
 * @returns {View} - The rendered FormTextArea component.
 * @example
 * ```tsx
 * <FormTextArea
 *   name="message"
 *   label="Message"
 *   placeholder="Enter your message here..."
 *   />
 * ```
 */
export function FormTextArea(props: FormTextAreaProps): View {
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
						className={`${field.errors() ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : ''}`}
					/>
					<InputHelper
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
	/** The input field size. */
	size?: FormInputSize;
};

/**
 * FormSelect component to render a select field with label and feedback.
 *
 * @param {FormSelectProps} props - The properties for the FormSelect component.
 * @returns {View} - The rendered FormSelect component.
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
 * />
 *```
 */
export function FormSelect(props: FormSelectProps): View {
	return (
		<Field<string> name={props.name}>
			{(field) => (
				<InputGroup size={props.size}>
					<Label
						for={props.name}
						label={props.label}
					/>
					<InputSelect
						name={props.name}
						options={props.options}
						defaultIndex={0}
						value={field.value()}
						onSelect={(v) => {
							field.setValue(v.toString());
						}}
						style={field.errors() ? 'error' : 'plain'}
					/>
					<InputHelper
						type='error'
						msg={field.errors()}
					/>
				</InputGroup>
			)}
		</Field>
	);
}

type FormCheckboxProps = CheckboxProps & {
	label: string;
	size?: FormInputSize;
};

export function FormCheckbox(props: FormCheckboxProps) {
	return (
		<Field<boolean> name={props.name}>
			{(field) => (
				<InputGroup size={props.size}>
					<Label
						for={props.name}
						label={props.label}
					/>
					<Checkbox
						name={props.name}
						onCheck={(v) => field.setValue(v)}
					/>
				</InputGroup>
			)}
		</Field>
	);
}
