import IntroDoc from '../../components/intro-doc';
import { Anatomy } from '../../components/anatomy';
import { ApiReference } from '../../components/api-reference';
import { Examples } from '../../components/example';
import { Button } from 'pkg';
import { InputField } from 'pkg/components/field/input-field';

const anatomy = `<InputField
  // Field attributes
  name=""
  label=""
  help=""
  error=""
  required={}
  
  // InputField attributes
  type=""
  placeholder=""
  size=""
  variant=""
  class=""
  
  // Optional elements
  leading={<></>}
  trailing={<></>}
/>`;

const apiRef = {
	components: [
		{
			name: 'InputField',
			description:
				'A comprehensive form field component that combines label, input, and supporting elements into a cohesive interface',
			props: [
				// Field-specific props
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
					description: 'Helper text displayed below the input',
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
				// InputField-specific props
				{
					name: 'leading',
					type: 'View',
					description: 'Content to show before the input',
				},
				{
					name: 'trailing',
					type: 'View',
					description: 'Content to show after the input',
				},
				{
					name: 'variant',
					type: '"default" | "success" | "error"',
					default: 'default',
					description: 'Visual style with matching state indicator',
				},
				{
					name: 'size',
					type: '"sm" | "md" | "lg"',
					default: 'md',
					description: 'Size of the input element',
				},
				{
					name: 'class',
					type: 'string',
					description: 'Additional classes for the input element',
				},
			],
		},
	],
};

const examples = [
	{
		title: 'Basic Usage',
		description: { text: 'Standard form field with label and input' },
		preview: () => (
			<div class='w-full max-w-sm'>
				<InputField
					name='username'
					label='Username'
					placeholder='Enter username'
				/>
			</div>
		),
	},
	{
		title: 'Field States',
		description: { text: 'Form fields with different states and supporting text' },
		preview: () => (
			<div class='space-y-4 w-full max-w-sm'>
				<InputField
					name='email'
					label='Email'
					help="We'll never share your email"
					placeholder='Enter email'
					type='email'
				/>
				<InputField
					name='password'
					label='Password'
					variant='success'
					type='password'
					placeholder='Enter password'
				/>
				<InputField
					name='confirm'
					label='Confirm Password'
					variant='error'
					error='Passwords do not match'
					type='password'
					placeholder='Confirm password'
				/>
			</div>
		),
	},
	{
		title: 'Size Variations',
		description: { text: 'Different input sizes with consistent field layout' },
		preview: () => (
			<div class='space-y-4 w-full max-w-sm'>
				<InputField
					name='small'
					label='Small InputField'
					size='sm'
					placeholder='Small size'
				/>
				<InputField
					name='medium'
					label='Medium InputField'
					size='md'
					placeholder='Medium size'
				/>
				<InputField
					name='large'
					label='Large InputField'
					size='lg'
					placeholder='Large size'
				/>
			</div>
		),
	},
	{
		title: 'With Leading and Trailing Elements',
		description: {
			text: 'InputField field with additional content before and after the input',
			highlight: ['leading', 'trailing'],
		},
		preview: () => {
			const LockIcon = () => (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					stroke-width='2'
					stroke-linecap='round'
					stroke-linejoin='round'
					class='w-4 h-4 text-gray-600 dark:text-gray-400 ms-2'
				>
					<title>lock</title>
					<rect
						width='18'
						height='11'
						x='3'
						y='11'
						rx='2'
						ry='2'
					/>
					<path d='M7 11V7a5 5 0 0 1 10 0v4' />
				</svg>
			);

			return (
				<div class='space-y-2 w-full max-w-sm'>
					<InputField
						name='password'
						label='Password'
						leading={<LockIcon />}
						trailing={
							<Button
								class={'rounded text-xs'}
								variant={'soft'}
								color={'blue'}
								size='rec-sm'
							>
								Verify
							</Button>
						}
						placeholder='Enter password'
						class={'!ps-8 !pe-16'}
					/>
				</div>
			);
		},
	},
	{
		title: 'Disabled State',
		description: { text: 'Disabled state with visual indicators' },
		preview: () => (
			<div class='space-y-2 w-full max-w-sm'>
				<InputField
					name='disabled'
					label='Disabled InputField'
					disabled
					placeholder='This input is disabled'
				/>
			</div>
		),
	},
];

const InputFieldDoc = () => {
	return (
		<>
			<IntroDoc
				component='InputField'
				description='A comprehensive form field component that combines label, input, and supporting elements into a unified interface. Supports various states, sizes, and optional leading/trailing content.'
			/>
			<Anatomy>{anatomy}</Anatomy>
			<ApiReference components={apiRef.components} />
			<Examples examples={examples} />
		</>
	);
};

export default InputFieldDoc;
