import { Input } from 'pkg/components/input/input';
import IntroDoc from '../../components/intro-doc';
import { Anatomy } from '../../components/anatomy';
import { ApiReference } from '../../components/api-reference';
import { Examples } from '../../components/example';
import {INPUT_STYLES} from "pkg/style/input";

const anatomy = `<Input 
	variant="" 
	size =""
	class=""
/>`;

const apiRef = {
	components: [
		{
			name: 'Input',
			description: 'Base text input component',
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
					description: 'Input size',
				},
				{ name: 'class', type: 'string', description: 'Additional classes' },
			],
		},
	],
};

const examples = [
	{
		title: 'Basic',
		description: { text: 'Default input' },
		preview: () => <Input placeholder='Type here...' />,
	},
	{
		title: 'Variants',
		description: { text: 'Style variations', highlight: ['default', 'success', 'error'] },
		preview: () => (
			<div class='space-y-2'>
				<Input
					variant='default'
					placeholder='Default variant'
				/>
				<Input
					variant='success'
					placeholder='Success variant'
				/>
				<Input
					variant='error'
					placeholder='Error variant'
				/>
			</div>
		),
	},
	{
		title: 'Sizes',
		description: { text: 'Size variations', highlight: ['sm', 'md', 'lg'] },
		preview: () => (
			<div class='space-y-2'>
				<Input
					size='sm'
					placeholder='Small size'
				/>
				<Input
					size='md'
					placeholder='Medium size'
				/>
				<Input
					size='lg'
					placeholder='Large size'
				/>
			</div>
		),
	},
	{
		title: 'Disabled',
		description: { text: 'Disabled state' },
		preview: () => (
			<Input
				disabled
				placeholder='Disabled input'
			/>
		),
	},
];

const InputDoc = () => {
	return (
		<>
			<IntroDoc
				component='Form Components'
				description='A collection of form components built with SolidJS and TailwindCSS.'
			/>
			<Anatomy>{anatomy}</Anatomy>
			<ApiReference components={apiRef.components} />
			<Examples examples={examples} />
		</>
	);
};

export default InputDoc;
