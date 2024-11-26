import IntroDoc from '../../components/intro-doc';
import { Anatomy } from '../../components/anatomy';
import { ApiReference } from '../../components/api-reference';
import { Examples } from '../../components/example';
import { Radio } from 'pkg/components/input/radio';

const anatomy = `<Radio 
  variant="" 
  size=""
  class=""
/>`;

const apiRef = {
	components: [
		{
			name: 'Radio',
			description: 'Radio button input component',
			props: [
				{
					name: 'variant',
					type: '"default" | "success" | "error"',
					default: 'default',
					description: 'Visual style',
				},
				{
					name: 'size',
					type: '"sm" | "md" | "lg"',
					default: 'md',
					description: 'Radio size',
				},
				{ name: 'class', type: 'string', description: 'Additional classes' },
			],
		},
	],
};

const examples = [
	{
		title: 'Basic',
		description: { text: 'Default radio' },
		preview: () => <Radio value='basic' name="basic" />,
	},
	{
		title: 'Variants',
		description: { text: 'Style variations', highlight: ['default', 'success', 'error'] },
		preview: () => (
			<div class='flex justify-center items-center gap-2'>
				<Radio
					value='default'
					variant='default'
					name="variants"
				/>
				<Radio
					value='success'
					variant='success'
					name="variants"
				/>
				<Radio
					value='error'
					variant='error'
					name="variants"
				/>
			</div>
		),
	},
	{
		title: 'Sizes',
		description: { text: 'Size variations', highlight: ['sm', 'md', 'lg'] },
		preview: () => (
			<div class='flex justify-center items-center gap-2'>
				<Radio
					value='small'
					size='sm'
					name="sizes"
				/>
				<Radio
					value='medium'
					size='md'
					name="sizes"
				/>
				<Radio
					value='large'
					size='lg'
					name="sizes"
				/>
			</div>
		),
	},
	{
		title: 'Disabled',
		description: { text: 'Disabled state' },
		preview: () => (
			<Radio
				value='disabled'
				disabled
				name="disabled"
			/>
		),
	},
];

const RadioDoc = () => {
	return (
		<>
			<IntroDoc
				component='Radio'
				description='A radio component for single choice selections.'
			/>
			<Anatomy>{anatomy}</Anatomy>
			<ApiReference components={apiRef.components} />
			<Examples examples={examples} />
		</>
	);
};

export default RadioDoc;
