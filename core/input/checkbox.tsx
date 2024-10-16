import { cva } from 'class-variance-authority';
import { createContext, createSignal, splitProps, useContext } from 'solid-js';
import type { ClassNames, PropAttr } from '../types';
import { randomHash } from '../utils';
import { InputGroup } from './group';

export type CheckboxContext = {
	isChecked: () => boolean;
	setChecked: (value: boolean) => void;
	toggleCheck: () => void;
	id: Readonly<string>;
};

const checkboxContext = createContext<CheckboxContext>();

export const useCheckbox = () => {
	const context = useContext(checkboxContext);
	if (!context) throw new Error('useCheckboxContext must be used within a CheckboxProvider');
	return context;
};

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
		onCheck?: (value: boolean) => void;
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
	]);

	const [isChecked, setChecked] = createSignal(false);
	const toggleCheck = () => setChecked((prev) => !prev);

	const ctxValue = {
		isChecked,
		setChecked,
		toggleCheck,
		id: (prop.id || randomHash()).concat('-input'),
	};

	return (
		<checkboxContext.Provider value={ctxValue}>
			<input
				{...others}
				name={prop.name}
				type='checkbox'
				checked={isChecked()}
				class={checkboxStyles({
					disabled: prop.disabled,
					size: prop.size,
					color: prop.color,
				})}
				onChange={() => {
					toggleCheck();
					prop.onCheck?.(isChecked());
				}}
			/>
		</checkboxContext.Provider>
	);
};

export type CheckboxFieldProps = CheckboxProps & { label: string };

export const CheckboxField = (props: CheckboxFieldProps) => {
	const [prop, others] = splitProps(props, [
		'name',
		'id',
		'size',
		'color',
		'disabled',
		'checked',
		'onCheck',
		'className',
		'label',
	]);

	return (
		<InputGroup
			size={prop.size}
			className={'flex items-center '.concat(prop.className || '')}
		>
			<Checkbox
				name={prop.name}
				checked={prop.checked}
				onCheck={prop.onCheck}
				{...others}
			/>
			<label
				for={prop.name}
				class={'ms-2 text-sm font-medium text-gray-800 flex items-center'}
			>
				{prop.label}
			</label>
		</InputGroup>
	);
};
