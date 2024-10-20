import { cva } from 'class-variance-authority';
import { createContext, createSignal, splitProps, useContext } from 'solid-js';
import type { ClassNames, PropAttr } from '../types';
import { randomHash } from '../utils';
import { InputGroup } from './group';
import type { InputNamedValue } from './input';

export type CheckboxContext = {
	id: Readonly<string>;
	value: () => string;
	namedValue: () => InputNamedValue;
	isChecked: () => boolean;
	setChecked: (value: boolean) => void;
	toggleCheck: () => void;
};

const checkboxContext = createContext<CheckboxContext>();

export const useCheckbox = () => {
	const context = useContext(checkboxContext);
	if (!context) throw new Error('useCheckboxContext must be used within a Checkbox');
	return context;
};

export function createCheckbox(
	name: string,
	value: string,
	id?: string,
	checked = false,
): CheckboxContext {
	const [isChecked, setChecked] = createSignal(checked);
	const toggleCheck = () => setChecked((prev) => !prev);

	return {
		id: id || 'checkbox'.concat(randomHash()),
		value: () => value || '',
		namedValue: () => ({ name: name, value: value }),
		isChecked,
		setChecked,
		toggleCheck,
	};
}

export const checkboxStyles = cva('rounded focus:ring-2 transition cursor-pointer', {
	variants: {
		size: {
			sm: 'w-3 h-3',
			md: 'w-4 h-4',
			lg: 'w-5 h-5',
		},
		color: {
			blue: 'text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">',
			red: 'text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">',
			green: 'text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">',
		},
		disabled: {
			true: 'opacity-50 cursor-not-allowed',
			false: '',
		},
	},
	defaultVariants: {
		size: 'md',
		color: 'blue',
		disabled: false,
	},
});

export type CheckboxProps = ClassNames &
	PropAttr & {
		name: string;
		id?: string;
		size?: 'sm' | 'md' | 'lg';
		color?: 'blue' | 'red' | 'green';
		disabled?: boolean;
		checked?: boolean;
		value?: string;
		onCheck?: (value: CheckboxContext) => void;
	};

export const Checkbox = (props: CheckboxProps) => {
	const [prop, others] = splitProps(props, [
		'name',
		'id',
		'size',
		'color',
		'disabled',
		'checked',
		'onCheck',
		'value',
	]);

	const ctxValue = createCheckbox(prop.name, prop.value || '', prop.id, prop.checked || false);

	return (
		<checkboxContext.Provider value={ctxValue}>
			<input
				{...others}
				id={ctxValue.id}
				name={prop.name}
				type='checkbox'
				checked={ctxValue.isChecked()}
				class={checkboxStyles({
					disabled: prop.disabled,
					size: prop.size,
					color: prop.color,
				})}
				onChange={() => {
					ctxValue.toggleCheck();
					prop.onCheck?.(ctxValue);
				}}
				value={prop.value}
			/>
		</checkboxContext.Provider>
	);
};

export const CheckboxField = (props: CheckboxProps & { label: string; size?: string }) => {
	const [prop, others] = splitProps(props, ['className', 'label', 'id']);
	const id = prop.id || 'checkbox-field'.concat(randomHash());

	return (
		<InputGroup
			id={id.concat('-checkbox-field')}
			size={props.size}
			className={'flex items-center '.concat(prop.className || '')}
		>
			<Checkbox
				id={id}
				{...others}
			/>
			<label
				for={id.concat('-checkbox')}
				class={'ms-2 text-sm font-medium text-gray-800 flex items-center'}
			>
				{prop.label}
			</label>
		</InputGroup>
	);
};
