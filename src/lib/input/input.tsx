import { For, type JSX, splitProps } from 'solid-js';

type GroupProps = {
	children: JSX.Element;
	class?: string;
};

const Group = (props: GroupProps) => {
	return (
		<div class={`relative block w-full col-span-12 ${props.class || ''}`}>
			{props.children}
		</div>
	);
};

type LabelProps = {
	for: string;
	label: string;
	class?: string;
};

const Label = (props: LabelProps) => {
	return (
		<label
			for={props.for}
			class={`mb-2 text-sm lg:text-base font-medium text-gray-800 flex items-center ${props.class || ''}`}>
			{props.label}
		</label>
	);
};

type MessageProps = {
	msg: string;
	class?: string;
};

const Message = (props: MessageProps) => {
	return (
		<p
			class={`mt-2 text-sm lg:text-base font-medium text-gray-800 ${props.class || ''}`}>
			{props.msg}
		</p>
	);
};

type InputProps = {
	name: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	[key: string]: unknown;
};

const InputEl = (props: InputProps) => {
	const [prop, others] = splitProps(props, [
		'name',
		'placeholder',
		'required',
		'disabled',
		'readonly',
		'class',
	]);

	return (
		<input
			id={prop.name + 'Input'}
			name={prop.name}
			type='text'
			class={`block w-full rounded-md p-2 bg-gray-50 border border-gray-300 text-gray-800 font-medium focus:ring-blue-600 focus:border-blue-600 text-sm lg:text-base ${props.disabled && 'cursor-not-allowed'} ${prop.class || ''}`}
			placeholder={prop.placeholder}
			disabled={prop?.disabled}
			{...others}
		/>
	);
};

type TextAreaProps = {
	name: string;
	placeholder?: string;
	rows?: number;
	disabled?: boolean;
	class?: string;
	[key: string]: unknown;
};

const TextArea = (props: TextAreaProps) => {
	const [prop, others] = splitProps(props, [
		'name',
		'class',
		'placeholder',
		'disabled',
	]);

	return (
		<textarea
			id={prop.name + 'Input'}
			name={prop.name}
			class={`block w-full rounded-md text-sm p-2 bg-gray-50 border border-gray-300 text-gray-800 font-medium focus:ring-blue-600 focus:border-blue-600 ${props.disabled && 'cursor-not-allowed'} ${prop.class || ''}`}
			disabled={prop.disabled}
			placeholder={props.placeholder}
			rows={props.rows || 2}
			{...others}
		/>
	);
};

type SelectProps = {
	name: string;
	options: { name: string; value: string }[];
	default?: { name: string; value: string };
	value?: string | number;
	onChange?: (e: Event) => void;
	disabled?: boolean;
	class?: string;
	[key: string]: unknown;
};

const Select = (props: SelectProps) => {
	return (
		<select
			id={props.name}
			name={props.name}
			class={`w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm lg:text-base font-medium rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 ${props.disabled && 'cursor-not-allowed'} ${props.class || ''}`}
			onChange={props.onChange}>
			<option value={props?.default?.value || ''} selected>
				{props?.default?.name || ''}
			</option>
			<For each={props.options}>
				{(option) => (
					<option
						value={option.value}
						selected={props?.value === option.value}>
						{option.name}
					</option>
				)}
			</For>
		</select>
	);
};

export const Input = {
	Group,
	Label,
	Message,
	Input: InputEl,
	TextArea,
	Select,
};
