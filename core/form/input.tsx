import { Field, type FieldContextProps } from './field';
import {
	InputFeedback,
	type InputGroupSizeVariant,
	Label,
	type SelectProps,
	type TextAreaProps,
} from '../input';
import { InputGroup } from '../input';
import { Input } from '../input';
import { TextArea } from '../input';
import { Select } from '../input';
import { InputWith } from '../input';
import { Checkbox, type CheckboxProps } from '../input/checkbox';
import type { View } from '../types';
import { cva } from 'class-variance-authority';
import { createEffect } from 'solid-js';

export type FormInputSizeVariant = InputGroupSizeVariant;

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
		size: 'md',
	},
});

export type FormInputProps = {
	name: string;
	placeholder?: string;
	label: string;
	mask?: (e: InputEvent) => void;
	size?: FormInputSizeVariant;
};

export function FormInput<T>(props: FormInputProps & { type?: 'text' | 'number' }): View {
	return (
		<Field name={props.name}>
			{(field: FieldContextProps<T>) => (
				<InputGroup size={props.size}>
					<Label
						for={props.name}
						label={props.label}
					/>
					<Input
						type={props.type}
						name={props.name}
						placeholder={props.placeholder}
						value={field.value()}
						onInput={(e: InputEvent) => {
							props.mask?.(e);

							const value = (e.target as HTMLInputElement).value;
							const coercedValue = coerceValue<T>(value, props.type);
							field.setValue(coercedValue);
						}}
						onChange={() => field.setErrors('')}
						color={field.errors() ? 'error' : 'plain'}
						sync={field.value}
					/>
					<InputFeedback
						color='error'
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
							color: field.errors() ? 'error' : 'plain',
						}}
					/>
					<InputFeedback
						color='error'
						msg={field.errors()}
					/>
				</InputGroup>
			)}
		</Field>
	);
}

export type FormTextAreaProps = FormInputProps & TextAreaProps;

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
						{...props}
						name={props.name}
						placeholder={props.placeholder}
						value={field.value()}
						onChange={(e: Event) => {
							field.setValue((e.target as HTMLTextAreaElement).value);
							field.setErrors('');
						}}
						color={field.errors() ? 'error' : 'plain'}
					/>
					<InputFeedback
						color='error'
						msg={field.errors()}
					/>
				</InputGroup>
			)}
		</Field>
	);
}

export type FormSelectProps<T> = FormInputProps & SelectProps<T>;

export function FormSelect<T>(props: FormSelectProps<T>): View {
	return (
		<Field name={props.name}>
			{(field) => {
				createEffect(() => console.log(field.value()));
				return (
					<InputGroup size={props.size}>
						<Label
							for={props.name}
							label={props.label}
						/>
						<Select
							name={props.name}
							options={props.options}
							sync={field.value}
							//selected={field.value}
							onSelect={(v) => {
								field.setValue(v);
								field.setErrors('');
							}}
							color={field.errors() ? 'error' : 'plain'}
						/>
						<InputFeedback
							color='error'
							msg={field.errors()}
						/>
					</InputGroup>
				);
			}}
		</Field>
	);
}

type FormCheckboxProps = FormInputProps & CheckboxProps;

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
						onCheck={(v) => field.setValue(v.isChecked())}
					/>
				</InputGroup>
			)}
		</Field>
	);
}

function coerceValue<T>(value: string, type?: string): T {
	if (type === 'number') return Number.parseFloat(value) as T;
	return value as T;
}