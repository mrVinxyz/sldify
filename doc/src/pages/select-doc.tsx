import DocumentTmpl from '../doc-template';
import { Select } from 'pkg';

export default function SelectDoc() {
	return (
		<DocumentTmpl
			title='Select'
			description='A customizable select component that supports primitive and object values, with built-in accessibility features and theming options.'
			importCode="import { Select } from '@/components/ui/select';"
			features={[
				'Support for primitive and object values through generics',
				'Rich styling options including variants, sizes and border radius customization',
				'Built-in form states for success and error handling',
				'Built-in accessibility attributes',
			]}
			apiReference={[
				{
					prop: 'options',
					type: 'SelectOption<T>[]',
					defaultValue: '[]',
					description:
						'Array of options to display in the select. Each option must have a label and value.',
				},
				{
					prop: 'value',
					type: 'T',
					defaultValue: 'undefined',
					description: 'The current value of the select. Can be any type T.',
				},
				{
					prop: 'onChange',
					type: '(value: T) => void',
					defaultValue: 'undefined',
					description: 'Callback function called when the selection changes.',
				},
				{
					prop: 'initialOption',
					type: 'SelectOption<T>',
					defaultValue: 'undefined',
					description:
						'Option to display at the top of the list, commonly used for default selections.',
				},
				{
					prop: 'defaultOption',
					type: 'number',
					defaultValue: 'undefined',
					description:
						'Index of the option to be selected by default when no value is provided.',
				},
				{
					prop: 'placeholder',
					type: 'string',
					defaultValue: 'undefined',
					description:
						'Text to display when no option is selected. Renders as a disabled option.',
				},
				{
					prop: 'variant',
					type: "'default' | 'success' | 'error'",
					defaultValue: "'default'",
					description: 'Visual style variant of the select component.',
				},
				{
					prop: 'size',
					type: "'sm' | 'md' | 'lg'",
					defaultValue: "'md'",
					description: 'Size variant of the select component.',
				},
				{
					prop: 'rounded',
					type: "'none' | 'sm' | 'md' | 'lg'",
					defaultValue: "'lg'",
					description: 'Border radius variant of the select component.',
				},
			]}
			examples={[
				{
					title: 'Basic Usage',
					description: 'A simple select with string values.',
					component: () => {
						const options = [
							{ label: 'Apple', value: 'apple' },
							{ label: 'Banana', value: 'banana' },
							{ label: 'Orange', value: 'orange' },
						];

						return (
							<Select
								options={options}
								placeholder='Select a fruit'
							/>
						);
					},
				},
				{
					title: 'With Object Values',
					description: 'Using objects as values with type safety. Check console output. ',
					component: () => {
						const options = [
							{ label: 'John Doe', value: { id: 1, name: 'John Doe' } },
							{ label: 'Jane Smith', value: { id: 2, name: 'Jane Smith' } },
						];

						return (
							<Select
								options={options}
								placeholder='Select a user'
								onChange={(value) => console.log(value)}
							/>
						);
					},
				},
				{
					title: 'Variants',
					description: 'Different visual styles for various states.',
					component: () => {
						const options = [
							{ label: 'Option 1', value: '1' },
							{ label: 'Option 2', value: '2' },
						];

						return (
							<div class='flex flex-col gap-4'>
								<Select
									options={options}
									placeholder='Default variant'
								/>
								<Select
									options={options}
									placeholder='Success variant'
									variant='success'
								/>
								<Select
									options={options}
									placeholder='Error variant'
									variant='error'
								/>
							</div>
						);
					},
				},
				{
					title: 'Sizes',
					description: 'Available size variations.',
					component: () => {
						const options = [
							{ label: 'Option 1', value: '1' },
							{ label: 'Option 2', value: '2' },
						];

						return (
							<>
								<Select
									options={options}
									placeholder='Extra Small size'
									size='xs'
								/>
								<Select
									options={options}
									placeholder='Small size'
									size='sm'
								/>
								<Select
									options={options}
									placeholder='Medium size'
									size='md'
								/>
								<Select
									options={options}
									placeholder='Large size'
									size='lg'
								/>
							</>
						);
					},
				},
			]}
			keyboard={[
				{
					key: 'Space/Enter',
					description: 'Opens the select dropdown',
				},
				{
					key: 'Arrow Up/Down',
					description: 'Navigates through options',
				},
				{
					key: 'Esc',
					description: 'Closes the select dropdown',
				},
			]}
			accessibility={[
				'Uses native select element for optimal screen reader support',
				'Includes aria-describedby linking to form labels',
				'Supports aria-invalid for error states',
				'Implements aria-required for required fields',
				'Properly handles disabled states with aria-disabled',
				'Maintains focus management with proper tab index',
			]}
		/>
	);
}
