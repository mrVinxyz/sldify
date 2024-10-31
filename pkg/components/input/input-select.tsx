import { createSignal, For, splitProps } from 'solid-js';
import { Input, type InputProps } from './input';
import { Collapsible, createCollapsible } from '../collapsible/collapsible';
import { CollapsibleControl } from '../collapsible/control';
import { CollapsibleContent } from '../collapsible/content';
import { cva } from 'class-variance-authority';

type InputSelectOption<T> = {
	label: string;
	value: T;
};

type InputSelectProps<T> = InputProps & {
	options: InputSelectOption<T>[];
	value?: T;
	onSelected?: (option: InputSelectOption<T>) => void;
	onOpen?: () => void;
	containerSize?: 'sm' | 'md' | 'lg' | 'xl';
	containerClass?: string;
	optionItemSize?: 'sm' | 'md' | 'lg';
	optionItemClass?: string;
};

const optionsContainerVariants = cva(
	'z-10 absolute w-full mt-1 bg-white border divide-y divide-gray-200 rounded-lg dark:bg-gray-700 dark:divide-gray-600 overflow-y-auto',
	{
		variants: {
			size: {
				sm: 'h-36',
				md: 'h-48',
				lg: 'h-60',
				xl: 'h-80',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
);

const optionItemVariants = cva(
	'font-medium block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white',
	{
		variants: {
			size: {
				sm: 'px-2 py-1',
				md: 'px-4 py-2',
				lg: 'px-6 py-3',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
);

function InputSelect<T>(props: InputSelectProps<T>) {
	const [local, rest] = splitProps(props, ['options', 'value', 'onSelected']);
	const [value, setValue] = createSignal<InputSelectOption<T>>();

	const Option = (optionProp: InputSelectOption<T>) => {
		return (
			<a
				href='#'
				class={optionItemVariants({
					size: props.optionItemSize,
					class: props.optionItemClass,
				})}
				onClick={() => {
					local.onSelected?.(optionProp);
					collapsible.hide();
					setValue(optionProp);
				}}
			>
				{optionProp.label}
			</a>
		);
	};

	const OptionsContainer = () => (
		<div
			class={optionsContainerVariants({
				size: props.containerSize,
				class: props.containerClass,
			})}
		>
			<ul
				class='py-2 text-sm text-gray-700 dark:text-gray-200'
				aria-labelledby='dropdownDefaultButton'
			>
				<For each={local.options}>
					{(option) => (
						<li>
							<Option {...option} />
						</li>
					)}
				</For>
			</ul>
		</div>
	);

	const ThisInput = (props: { onClick: (e: MouseEvent) => void }) => {
		const handleClick = (
			e: MouseEvent & { currentTarget: HTMLInputElement; target: Element },
		) => {
			const otherClick = rest.onClick;
			if (otherClick && typeof otherClick === 'function') otherClick(e);
			props.onClick(e);
		};

		return (
			<Input
				value={value()?.label as string | number | string[] | undefined}
				{...rest}
				onClick={handleClick}
				data-selectedValue={local.value}
			/>
		);
	};

	const collapsible = createCollapsible();

	return (
		<Collapsible ctx={collapsible}>
			<CollapsibleControl asChild={ThisInput} />
			<CollapsibleContent>
				<OptionsContainer />
			</CollapsibleContent>
		</Collapsible>
	);
}

export { InputSelect, type InputSelectOption, type InputSelectProps };
