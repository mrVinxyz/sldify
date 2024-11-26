import {type Component, type JSX, Match, Show, splitProps, Switch} from 'solid-js';
import type {BaseInputProps, InputSize, InputVariant} from './base';
import cn from '../../utils/cn';
import type {View} from "../../utils/types";
import type {VariantProps} from "class-variance-authority";
import generateId from "../../utils/id";
import {Label} from "./label";
import {CheckIcon, ExclamationIcon} from "../field/icons";

type InputProps = BaseInputProps & Omit<JSX.IntrinsicElements['input'], 'size'>;

const INPUT_STYLES = [
	'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full',
	'focus:ring-blue-500 focus:border-blue-500',
	'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white',
	'dark:focus:ring-blue-500 dark:focus:border-blue-500',

	'data-[state=success]:bg-green-50 data-[state=success]:border-green-500 data-[state=success]:text-green-900',
	'data-[state=success]:focus:ring-green-500 data-[state=success]:focus:border-green-500',
	'data-[state=error]:bg-red-50 data-[state=error]:border-red-500 data-[state=error]:text-red-900',
	'data-[state=error]:focus:ring-red-500 data-[state=error]:focus:border-red-500',

	'data-[size=sm]:p-2 data-[size=sm]:text-xs',
	'data-[size=md]:p-2.5 data-[size=md]:text-sm',
	'data-[size=lg]:p-3 data-[size=lg]:text-base',
].join(' ');

const Input: Component<InputProps> = (props) => {
	const [local, rest] = splitProps(props, ['variant', 'size', 'class']);
	return (
		<input
			class={cn(INPUT_STYLES, local.class)}
			data-state={local.variant !== 'default' ? local.variant : undefined}
			data-size={local.size || 'md'}
			{...rest}
		/>
	);
};

type InputFieldProps = {
	name: string;
	label: string;
	required?: boolean;
	help?: string;
	error?: string;
	containerClass?: string;
	labelClass?: string;
	labelSrOnly?: boolean;
	leading?: View | (() => View);
	trailing?: View | (() => View);
	disableIcon?: boolean;
} & BaseInputProps & Omit<JSX.IntrinsicElements['input'], 'size'>;

const InputField: Component<InputFieldProps> = (props) => {
	const [local, rest] = splitProps(props, [
		'label',
		'class',
		'containerClass',
		'labelClass',
		'labelSrOnly',
		'required',
		'help',
		'error',
		'name',
		'leading',
		'trailing',
		'disableIcon',
		'variant',
	]);

	const inputId = props.id || generateId('input-'.concat(local.name));
	const helpId = local.help ? inputId.concat('-help') : undefined;
	const errorId = local.error ? inputId.concat('-error') : undefined;
	const describedByIds = [helpId, errorId].filter(Boolean).join(' ');

	return (
		<div class={'space-y-1 '.concat(local.containerClass || '')}>
			<Label
				for={inputId}
				required={local.required}
				srOnly={local.labelSrOnly}
				class={local.labelClass}
			>
				{local.label}
			</Label>

			<div class={'relative'}>
				<Show when={props.leading}>
					{(leading) => {
						const view = leading();
						return (
							<div class='absolute inset-y-0 left-0 flex items-center ps-1 pointer-events-none'>
								{typeof view === 'function' ? view() : view}
							</div>
						);
					}}
				</Show>

				<Input
					id={inputId}
					name={local.name}
					variant={local.variant}
					size={local.size}
					class={local.class}
					aria-describedby={describedByIds || undefined}
					aria-invalid={local.variant === 'error' ? true : undefined}
					aria-required={local.required}
					required={local.required}
					autocomplete={'false'}
					{...rest}
				/>

				<div class="absolute inset-y-0 right-0 pe-1 flex items-center gap-1">
					<Show when={!props.disableIcon}>
						<div class='flex items-center'>
							<Switch>
								<Match when={local.variant === 'success'}>
									<CheckIcon class='w-4 h-4 me-1 text-green-900 dark:text-green-500'/>
								</Match>
								<Match when={local.variant === 'error'}>
									<ExclamationIcon class='w-4 h-4 me-1 text-red-900 dark:text-red-500'/>
								</Match>
							</Switch>
						</div>
					</Show>
					<Show when={props.trailing}>
						{(trailing) => {
							const view = trailing();
							return (
								<div class='flex items-center'>
									{typeof view === 'function' ? view() : view}
								</div>
							);
						}}
					</Show>
				</div>
			</div>

			{local.help && (
				<p
					id={helpId}
					class='mt-1 text-sm text-neutral-600 dark:text-neutral-400'
				>
					{local.help}
				</p>
			)}

			{local.error && (
				<p
					id={errorId}
					class='mt-1 text-sm text-red-600 dark:text-red-400'
				>
					{local.error}
				</p>
			)}
		</div>
	);
};

export { type InputProps, Input };
