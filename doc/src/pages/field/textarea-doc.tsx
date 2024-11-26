import IntroDoc from '../../components/intro-doc';
import { Anatomy } from '../../components/anatomy';
import { ApiReference } from '../../components/api-reference';
import { Examples } from '../../components/example';
import { TextArea } from 'pkg/components/input/text-area';

const anatomy = `<TextArea 
    variant="" 
    size=""
    class=""
/>`;

const apiRef = {
	components: [
		{
			name: 'TextArea',
			description: 'Multi-line text input component',
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
					description: 'TextArea size',
				},
				{ name: 'class', type: 'string', description: 'Additional classes' },
			],
		},
	],
};

const examples = [
	{
		title: 'Basic',
		description: { text: 'Default textarea' },
		preview: () => <TextArea placeholder='Type here...' />,
	},
	{
		title: 'Variants',
		description: { text: 'Style variations', highlight: ['default', 'success', 'error'] },
		preview: () => (
			<div class='space-y-2'>
				<TextArea
					variant='default'
					placeholder='Default variant'
				/>
				<TextArea
					variant='success'
					placeholder='Success variant'
				/>
				<TextArea
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
				<TextArea
					size='sm'
					placeholder='Small size'
				/>
				<TextArea
					size='md'
					placeholder='Medium size'
				/>
				<TextArea
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
			<TextArea
				disabled
				placeholder='Disabled textarea'
				rows={2}
			/>
		),
	},
];

const TextAreaDoc = () => {
	return (
		<>
			<IntroDoc
				component='Form Components'
				description='TextArea component for multi-line text input.'
			/>
			<Anatomy>{anatomy}</Anatomy>
			<ApiReference components={apiRef.components} />
			<Examples examples={examples} />
		</>
	);
};

export default TextAreaDoc;
