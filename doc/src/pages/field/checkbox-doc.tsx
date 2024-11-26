import IntroDoc from '../../components/intro-doc';
import { Anatomy } from '../../components/anatomy';
import { ApiReference } from '../../components/api-reference';
import { Examples } from '../../components/example';
import { Checkbox } from 'pkg/components/input/checkbox';

const anatomy = `<Checkbox 
  value="example"
  checked={true}
  onChange={(value) => console.log(value)}
/>`;

const apiRef = {
	components: [
		{
			name: 'Checkbox',
			description: 'Base checkbox input component',
			props: [
				{
					name: 'value',
					type: 'T',
					description: 'Value associated with the checkbox',
				},
				{
					name: 'checked',
					type: 'boolean',
					description: 'Controlled checked state',
				},
				{
					name: 'variant',
					type: '"default" | "success" | "error"',
					default: 'default',
					description: 'Visual style variant',
				},
				{
					name: 'size',
					type: '"sm" | "md" | "lg"',
					default: 'md',
					description: 'Checkbox size',
				},
				{
					name: 'onChange',
					type: '(value: T) => void',
					description: 'Change handler',
				},
			],
		},
	],
};

const examples = [
	{
		title: 'Basic',
		description: { text: 'Default checkbox' },
		preview: () => <Checkbox value='basic' />,
	},
	{
		title: 'Variants',
		description: { text: 'Style variations', highlight: ['default', 'success', 'error'] },
		preview: () => (
			<div class='flex justify-center items-center gap-2'>
				<Checkbox
					value='default'
					variant='default'
				/>
				<Checkbox
					value='success'
					variant='success'
				/>
				<Checkbox
					value='error'
					variant='error'
				/>
			</div>
		),
	},
	{
		title: 'Sizes',
		description: { text: 'Size variations', highlight: ['sm', 'md', 'lg'] },
		preview: () => (
			<div class='flex justify-center items-center gap-2'>
				<Checkbox
					value='small'
					size='sm'
				/>
				<Checkbox
					value='medium'
					size='md'
				/>
				<Checkbox
					value='large'
					size='lg'
				/>
			</div>
		),
	},
	{
		title: 'Disabled',
		description: { text: 'Disabled state' },
		preview: () => (
			<Checkbox
				value='disabled'
				disabled
			/>
		),
	},
];

const CheckboxDoc = () => {
	return (
		<>
			<IntroDoc
				component='Checkbox'
				description='A checkbox component for multiple choice selections.'
			/>
			<Anatomy>{anatomy}</Anatomy>
			<ApiReference components={apiRef.components} />
			<Examples examples={examples} />
		</>
	);
};

export default CheckboxDoc;
