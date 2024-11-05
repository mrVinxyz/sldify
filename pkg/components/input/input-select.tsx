import { createSignal, For, splitProps } from 'solid-js';
import { Input, type InputProps } from './input';
import { Collapsible, createCollapsible } from '../collapsible/collapsible';
import { CollapsibleControl } from '../collapsible/control';
import { CollapsibleContent } from '../collapsible/content';
import { cva } from 'class-variance-authority';

type InputSelectOption<T> = {
	label?: string;
	value: T | undefined;
};

type InputSelectProps<T> = Omit<InputProps, 'value'> & {
	name: string;
	options: InputSelectOption<T>[];
	initialOption?: InputSelectOption<T>;
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
	const [local, rest] = splitProps(props, ['options', 'initialOption', 'onSelected', 'name']);
	const [value, setValue] = createSignal<InputSelectOption<T>>(
		local.initialOption || {
			label: '',
			value: '' as T,
		},
	);

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

	const ThisInput = (props: { id: string; onClick: (e: MouseEvent) => void }) => {
		const [isFocusTriggered, setIsFocusTriggered] = createSignal(false);

		const handleClick = (
			e: MouseEvent & { currentTarget: HTMLInputElement; target: Element },
		) => {
			if (isFocusTriggered()) {
				setIsFocusTriggered(false);
				return;
			}

			const otherClick = rest.onClick;
			if (otherClick && typeof otherClick === 'function') otherClick(e);
			props.onClick(e);
		};

		return (
			<Input
				{...rest}
				id={props.id}
				name={local.name}
				value={value()?.label as string | number | string[] | undefined}
				onClick={handleClick}
				onFocusIn={() => {
					if (!collapsible.isActive()) {
						setIsFocusTriggered(true);
						collapsible.show();
					}
				}}
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
