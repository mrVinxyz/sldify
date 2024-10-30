import { For } from 'solid-js';
import { Input, type InputProps } from './input';
import { Collapsible } from '../collapsible/collapsible';
import { CollapsibleControl } from '../collapsible/control';
import { CollapsibleContent } from '../collapsible/content';

type InputSelectOption<T> = {
	label: string;
	value: T;
};

type InputSelectProps<T> = InputProps & {
	options: InputSelectOption<T>[];
	value?: T;
	onSelected?: (option: InputSelectOption<T>) => void;
};

function InputSelect<T>(props: InputSelectProps<T>) {
	const Option = (optionProp: InputSelectOption<T>) => (
		<a
			href='#'
			class='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
			onClick={(e) => {
				e.preventDefault();
				props.onSelected?.(optionProp);
			}}
		>
			{optionProp.label}
		</a>
	);

	const OptionsMap = () => (
		<div class='z-10 absolute w-full mt-1 bg-white divide-y divide-gray-100 rounded-lg dark:bg-gray-700'>
			<ul
				class='py-2 text-sm text-gray-700 dark:text-gray-200'
				aria-labelledby='dropdownDefaultButton'
			>
				<For each={props.options}>
					{(option) => (
						<li>
							<Option {...option} />
						</li>
					)}
				</For>
			</ul>
		</div>
	);

	const getCurrentLabel = () => {
		if (!props.value) return '';
		const selectedOption = props.options.find((opt) => opt.value === props.value);
		return selectedOption?.label || '';
	};

	const ThisInput = (props: InputProps) => (
		<Input
			placeholder={'does this works?'}
			value={getCurrentLabel()}
			{...props}
		/>
	);

	return (
		<Collapsible>
			<CollapsibleControl asChild={ThisInput} />
			<CollapsibleContent>
				<OptionsMap />
			</CollapsibleContent>
		</Collapsible>
	);
}

export { InputSelect, type InputSelectOption, type InputSelectProps };
