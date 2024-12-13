import { type Component, type JSX, Match, Show, splitProps, Switch } from 'solid-js';
import type { BaseInputProps } from './base';
import cn from '../../utils/cn';
import type { View } from '../../utils/types';
import { CheckIcon, ExclamationIcon } from './icons';
import { FieldGroup, type FieldGroupProps } from './field';

const INPUT_STYLES = [
	'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full',
	'focus:ring-blue-500 focus:border-blue-500',
	'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white',
	'dark:focus:ring-blue-500 dark:focus:border-blue-500',
	'disabled:cursor-not-allowed disabled:opacity-60',

	'data-[state=success]:bg-green-50 data-[state=success]:border-green-500 data-[state=success]:text-green-900',
	'data-[state=success]:placeholder-green-700 data-[state=success]:dark:text-green-400',
	'data-[state=success]:dark:placeholder-green-500 data-[state=success]:dark:bg-gray-700',
	'data-[state=success]:dark:border-green-500',
	'data-[state=success]:focus:ring-green-500 data-[state=success]:focus:border-green-500',
	'data-[state=success]:dark:focus:ring-green-500 data-[state=success]:dark:focus:border-green-500',

	'data-[state=error]:bg-red-50 data-[state=error]:border-red-500 data-[state=error]:text-red-900',
	'data-[state=error]:placeholder-red-700 data-[state=error]:dark:text-red-400',
	'data-[state=error]:dark:placeholder-red-500 data-[state=error]:dark:bg-gray-700',
	'data-[state=error]:dark:border-red-500',
	'data-[state=error]:focus:ring-red-500 data-[state=error]:focus:border-red-500',
	'data-[state=error]:dark:focus:ring-red-500 data-[state=error]:dark:focus:border-red-500',

	'data-[size=sm]:p-2 data-[size=sm]:text-xs',
	'data-[size=md]:p-2.5 data-[size=md]:text-sm',
	'data-[size=lg]:p-3 data-[size=lg]:text-base',
].join(' ');

type InputProps = {
	leading?: View;
	trailing?: View;
} & BaseInputProps &
	Omit<JSX.IntrinsicElements['input'], 'size'>;

const Input: Component<InputProps> = (props) => {
	const [local, rest] = splitProps(props, ['leading', 'trailing', 'class', 'variant', 'size']);

	const hasLeading = local.leading;
	const hasTrailing = local.trailing;
	return (
		<div class={'relative'}>
			<Show when={hasLeading}>
				{(leading) => (
					<div class='absolute inset-y-0 left-0 flex items-center ps-1 pointer-events-none'>
						{leading()}
					</div>
				)}
			</Show>

			<input
				class={cn(INPUT_STYLES, local.class)}
				data-state={local.variant !== 'default' ? local.variant : undefined}
				data-size={local.size || 'md'}
				{...rest}
			/>

			<div class='flex items-center absolute inset-y-0 right-0 pe-1 gap-2'>
				<Switch>
					<Match when={props.variant === 'success'}>
						<CheckIcon class='w-4 h-4 me-1 text-green-900 dark:text-green-500' />
					</Match>
					<Match when={props.variant === 'error'}>
						<ExclamationIcon class='w-4 h-4 me-1 text-red-900 dark:text-red-500' />
					</Match>
				</Switch>

				<Show when={hasTrailing}>
					{(trailing) => (
						<div class='flex items-center absolute inset-y-0 right-0 pe-1'>
							{trailing()}
						</div>
					)}
				</Show>
			</div>
		</div>
	);
};

type InputFieldProps = InputProps & Omit<FieldGroupProps, 'child' | 'variant'>;

const InputField: Component<InputFieldProps> = (props) => {
	const [fieldProps, inputProps] = splitProps(props, [
		'name',
		'label',
		'containerClass',
		'labelClass',
		'labelSrOnly',
		'help',
		'error',
		'required',
	]);

	return (
		<FieldGroup
			{...fieldProps}
			variant={inputProps.variant}
			child={(childProps) => (
				<Input
					{...childProps}
					{...inputProps}
				/>
			)}
		/>
	);
};

export { type InputFieldProps, InputField };
