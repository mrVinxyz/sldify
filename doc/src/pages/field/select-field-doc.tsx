import { Examples } from '../../components/example';
import { ApiReference } from '../../components/api-reference';
import { Anatomy } from '../../components/anatomy';
import IntroDoc from '../../components/intro-doc';
import { SelectField } from '../../../../pkg/components/field/select-field';

const anatomy = `<SelectField
  // Field attributes
  name=""
  label=""
  help=""
  error=""
  required={}
  
  // SelectField attributes
  options={[{ label: "", value: "" }]}
  placeholder=""
  value=""
  defaultValue=""
  onSelected={}
  size=""
  variant=""
  class=""
  // ... any other select HTML attributes
/>`;

const apiRef = {
	components: [
		{
			name: 'SelectField',
			description:
				'A comprehensive form field component that combines label, select dropdown, and supporting elements into a cohesive interface',
			props: [
				// Field-specific props stay the same...
				{
					name: 'name',
					type: 'string',
					required: true,
					description: 'Field identifier for labels and aria attributes',
				},
				{
					name: 'label',
					type: 'string',
					required: true,
					description: 'Label text for the field',
				},
				{
					name: 'help',
					type: 'string',
					description: 'Helper text displayed below the select',
				},
				{
					name: 'error',
					type: 'string',
					description: 'Error message displayed when validation fails',
				},
				{
					name: 'containerClass',
					type: 'string',
					description: 'Additional classes for the field container',
				},
				{
					name: 'labelClass',
					type: 'string',
					description: 'Additional classes for the label',
				},
				{
					name: 'labelSrOnly',
					type: 'boolean',
					description: 'Whether to visually hide the label',
				},
				{
					name: 'required',
					type: 'boolean',
					description: 'Whether the field is required',
				},
				// SelectField-specific props updated to match new implementation
				{
					name: 'options',
					type: 'Array<{ label: string; value: T }>',
					required: true,
					description: 'Array of options to display in the select dropdown',
				},
				{
					name: 'value',
					type: 'T',
					description: 'Controlled value of the select',
				},
				{
					name: 'defaultValue',
					type: 'T',
					description: 'Default value for uncontrolled select',
				},
				{
					name: 'onSelected={} ',
					type: '(value: T) => void',
					description: 'Callback fired when selection changes',
				},
				{
					name: 'placeholder',
					type: 'string',
					description: 'Placeholder text shown when no option is selected',
				},
				{
					name: 'variant',
					type: '"default" | "success" | "error"',
					default: 'default',
					description: 'Visual style variant that affects the select appearance',
				},
				{
					name: 'size',
					type: '"sm" | "md" | "lg"',
					default: 'md',
					description: 'Controls the size of the select element',
				},
				{
					name: 'class',
					type: 'string',
					description: 'Additional CSS classes for the select element',
				},
			],
		},
	],
};

const examples = [
	{
		title: 'Basic Usage',
		description: {
			text: 'Standard form field with label and select dropdown',
		},
		preview: () => {
			const options = [
				{ label: 'Option 1', value: 1 },
				{ label: 'Option 2', value: 2 },
				{ label: 'Option 3', value: 3 },
			];

			return (
				<div class='w-full max-w-sm'>
					<SelectField
						name='basic'
						label='Select Option'
						options={options}
						placeholder='Choose an option'
					/>
				</div>
			);
		},
	},
	{
		title: 'Field States',
		description: {
			text: 'Form fields with different states and supporting text',
			highlight: ['variant', 'error', 'help'],
		},
		preview: () => {
			const options = [
				{ label: 'Available', value: 'available' },
				{ label: 'In Progress', value: 'in-progress' },
				{ label: 'Completed', value: 'completed' },
			];

			return (
				<div class='space-y-4 w-full max-w-sm'>
					<SelectField
						name='status'
						label='Status'
						help='Current status of the item'
						options={options}
						placeholder='Select status'
					/>
					<SelectField
						name='success'
						label='Category'
						variant='success'
						options={options}
						placeholder='Select category'
					/>
					<SelectField
						name='error'
						label='Priority'
						variant='error'
						error='Please select a priority level'
						options={options}
						placeholder='Select priority'
					/>
				</div>
			);
		},
	},
	{
		title: 'Size Variations',
		description: {
			text: 'Different select sizes with consistent field layout',
			highlight: ['size'],
		},
		preview: () => {
			const options = [
				{ label: 'Small Option', value: 'small' },
				{ label: 'Medium Option', value: 'medium' },
				{ label: 'Large Option', value: 'large' },
			];

			return (
				<div class='space-y-4 w-full max-w-sm'>
					<SelectField
						name='small'
						label='Small SelectField'
						size='sm'
						options={options}
						placeholder='Small size'
					/>
					<SelectField
						name='medium'
						label='Medium SelectField'
						size='md'
						options={options}
						placeholder='Medium size'
					/>
					<SelectField
						name='large'
						label='Large SelectField'
						size='lg'
						options={options}
						placeholder='Large size'
					/>
				</div>
			);
		},
	},
	{
		title: 'Disabled State',
		description: {
			text: 'Disabled state with visual indicators',
			highlight: ['disabled'],
		},
		preview: () => {
			const options = [
				{ label: 'Option 1', value: 1 },
				{ label: 'Option 2', value: 2 },
			];

			return (
				<div class='space-y-2 w-full max-w-sm'>
					<SelectField
						name='disabled'
						label='Disabled SelectField'
						disabled
						options={options}
						placeholder='This select is disabled'
					/>
				</div>
			);
		},
	},
	{
		title: 'Handle multiple types',
		description: {
			text: 'Demonstration of handling number, string, and object values with proper type preservation',
			highlight: ['onSelected={} ', 'value', 'options'],
		},
		preview: () => {
			const numberOptions = [
				{ label: 'One', value: 1 },
				{ label: 'Two', value: 2 },
				{ label: 'Three', value: 3 },
			];

			const stringOptions = [
				{ label: 'Draft', value: 'draft' },
				{ label: 'Published', value: 'published' },
				{ label: 'Archived', value: 'archived' },
			];

			const objectOptions = [
				{
					label: 'Admin User',
					value: {
						id: 1,
						role: 'admin',
						permissions: ['read', 'write', 'delete'],
					},
				},
				{
					label: 'Editor User',
					value: {
						id: 2,
						role: 'editor',
						permissions: ['read', 'write'],
					},
				},
				{
					label: 'Viewer User',
					value: {
						id: 3,
						role: 'viewer',
						permissions: ['read'],
					},
				},
			];

			const arrayOptions = [
				{
					label: 'Basic Access',
					value: ['read']
				},
				{
					label: 'Developer Access',
					value: ['read', 'write', 'deploy']
				},
				{
					label: 'Full Access',
					value: ['read', 'write', 'deploy', 'admin', 'delete']
				}
			];

			const logValue = (label: string, value: unknown) => {
				console.log(`${label}:`, {
					value,
					typeOf: typeof value,
					isArray: Array.isArray(value),
					type: Array.isArray(value) ? 'array' : typeof value,
				});
			};

			return (
				<div class='space-y-4 w-full max-w-sm'>
					<SelectField<number>
						name='number'
						label='Number Values'
						options={numberOptions}
						placeholder='Select a number'
						onSelected={(value: number) => logValue('Number selection', value)}
						help='Values are preserved as numbers'
					/>

					<SelectField
						name='string'
						label='String Values'
						options={stringOptions}
						placeholder='Select a string'
						onSelected={(value) => logValue('String selection', value)}
						help='Values are preserved as strings'
					/>

					<SelectField<string[]>
						name='array'
						label='Array Values'
						options={arrayOptions}
						placeholder='Select permissions'
						onSelected={(value) => logValue('Array selection', value)}
						help='Arrays are preserved with their elements'
					/>

					<SelectField
						name='object'
						label='Object Values'
						options={objectOptions}
						placeholder='Select an object'
						onSelected={(value) => logValue('Object selection', value)}
						help='Complex objects are preserved with their structure'
					/>

					<div class='p-4 bg-gray-100 dark:bg-gray-800 rounded-lg'>
						<ol class='list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1'>
							<li>Open your browser's console</li>
							<li>Select different options from each dropdown</li>
							<li>Observe how each value maintains its original type</li>
						</ol>
					</div>
				</div>
			);
		},
	},
];

const SelectFieldDoc = () => {
	return (
		<>
			<IntroDoc
				component='SelectField'
				description='A comprehensive form field component that combines label, select dropdown, and supporting elements into a unified interface. Supports various states, sizes, and handles both simple and complex values with proper type safety.'
			/>
			<Anatomy>{anatomy}</Anatomy>
			<ApiReference components={apiRef.components} />
			<Examples examples={examples} />
		</>
	);
};

export default SelectFieldDoc;
