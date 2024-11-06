import { Button } from 'pkg';
import DocumentTmpl from '../doc-template';

function ButtonDoc() {
	return (
		<DocumentTmpl
			title='Button'
			description='A versatile and accessible button component with support for multiple variants, sizes, and states.'
			importCode={`import { Button } from '@';`}
			features={[
				'Native HTMLButton behavior',
				'Multiple style variants',
				'Eight color schemes with dark mode support',
				'Five border radius options',
				'Ten size options (5 rectangular, 5 square)',
				'Loading state with spinner',
				'Support for leading and trailing icons',
				'Full ARIA accessibility support',
				'Dark mode compatible',
				'Customizable via Tailwind classes',
			]}
			apiReference={[
				{
					prop: 'variant',
					type: 'solid | ghost | outline | dotted',
					defaultValue: 'ghost',
					description: 'The variant style of the button',
				},
				{
					prop: 'color',
					type: 'blue | gray | black | white | green | red | yellow | orange',
					defaultValue: 'white',
					description: 'The color scheme of the button',
				},
				{
					prop: 'size',
					type: 'rec-xs | rec-sm | rec-md | rec-lg | rec-xl | sqr-xs | sqr-sm | sqr-md | sqr-lg | sqr-xl',
					defaultValue: 'rec-md',
					description: 'The size of the button',
				},
				{
					prop: 'rounded',
					type: 'none | sm | md | lg | full',
					defaultValue: 'md',
					description: 'The border radius of the button',
				},
				{
					prop: 'leading',
					type: 'View',
					defaultValue: 'undefined',
					description: 'Element to display before the button content',
				},
				{
					prop: 'trailing',
					type: 'View',
					defaultValue: 'undefined',
					description: 'Element to display after the button content',
				},
				{
					prop: 'loading',
					type: 'left | right',
					defaultValue: 'undefined',
					description: 'Shows a loading spinner and disables the button',
				},
			]}
			examples={[
				{
					title: 'Variant',
					description: 'Choose from solid, outline, or dotted variants.',
					component: () => (
						<div class='flex gap-4'>
							<Button
								variant='solid'
								color='blue'
							>
								Solid
							</Button>
							<Button
								variant='ghost'
								color='blue'
							>
								Ghost
							</Button>
							<Button
								variant='outline'
								color='blue'
							>
								outline
							</Button>
							<Button
								variant='dotted'
								color='blue'
							>
								Dotted
							</Button>
						</div>
					),
				},
				{
					title: 'Color Variants',
					description: 'Eight different color schemes available with dark mode support.',
					component: () => (
						<div class='flex gap-4'>
							<Button
								color='blue'
								variant='solid'
							>
								Blue
							</Button>
							<Button
								color='gray'
								variant='solid'
							>
								Gray
							</Button>
							<Button
								color='black'
								variant='solid'
							>
								Dark
							</Button>
							<Button
								color='white'
								variant='solid'
							>
								Light
							</Button>
							<Button
								color='green'
								variant='solid'
							>
								Green
							</Button>
							<Button
								color='red'
								variant='solid'
							>
								Red
							</Button>
							<Button
								color='yellow'
								variant='solid'
							>
								Yellow
							</Button>
							<Button
								color='orange'
								variant='solid'
							>
								Orange
							</Button>
						</div>
					),
				},
				{
					title: 'Button Sizes',
					description: 'Available in both rectangular and square variants.',
					component: () => (
						<>
							<div class='flex items-center flex-wrap flex-shrink gap-4'>
								<Button
									size='rec-xs'
									color='blue'
									variant='solid'
								>
									rec-xs
								</Button>
								<Button
									size='rec-sm'
									color='blue'
									variant='solid'
								>
									rec-sm
								</Button>
								<Button
									size='rec-md'
									color='blue'
									variant='solid'
								>
									rec-md
								</Button>
								<Button
									size='rec-lg'
									color='blue'
									variant='solid'
								>
									rec-lg
								</Button>
								<Button
									size='rec-xl'
									color='blue'
									variant='solid'
								>
									rec-xl
								</Button>
							</div>

							<div class='flex items-center flex-wrap flex-shrink gap-4'>
								<Button
									size='sqr-xs'
									color='blue'
									variant='solid'
								>
									sqr-xs
								</Button>
								<Button
									size='sqr-sm'
									color='blue'
									variant='solid'
								>
									sqr-sm
								</Button>
								<Button
									size='sqr-md'
									color='blue'
									variant='solid'
								>
									sqr-md
								</Button>
								<Button
									size='sqr-lg'
									color='blue'
									variant='solid'
								>
									sqr-lg
								</Button>
								<Button
									size='sqr-xl'
									color='blue'
									variant='solid'
								>
									sqr-xl
								</Button>
							</div>
						</>
					),
				},
				{
					title: 'Loading State',
					description: 'Built-in loading state with spinner and disabled functionality',
					component: () => (
						<>
							<Button
								variant='outline'
								color='black'
								loading={'left'}
							>
								Loading Left
							</Button>
							<Button
								variant='outline'
								color='black'
								loading={'right'}
							>
								Loading Right
							</Button>
						</>
					),
				},
				{
					title: 'Border Radius',
					description: 'Configurable border radius.',
					component: () => (
						<div class='flex gap-4'>
							<Button
								color='blue'
								variant='solid'
								rounded='none'
							>
								None
							</Button>
							<Button
								color='blue'
								variant='solid'
								rounded='sm'
							>
								Small
							</Button>
							<Button
								color='blue'
								variant='solid'
								rounded='md'
							>
								Medium
							</Button>
							<Button
								color='blue'
								variant='solid'
								rounded='lg'
							>
								Large
							</Button>
							<Button
								color='blue'
								variant='solid'
								rounded='full'
							>
								Full
							</Button>
						</div>
					),
				},
				{
					title: 'Icon Buttons',
					description:
						'Add icons or children to button leading or trailing the text label.',
					component: () => (
						<div class='flex gap-4'>
							<Button
								color='white'
								variant='solid'
								leading={
									<svg
										class='w-6 h-6 text-gray-800 dark:text-white'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										fill='none'
										viewBox='0 0 24 24'
									>
										<path
											stroke='currentColor'
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M5 11.917 9.724 16.5 19 7.5'
										/>
									</svg>
								}
							>
								Trailing Icon
							</Button>
							<Button
								color='white'
								variant='solid'
								trailing={
									<svg
										class='w-6 h-6 text-gray-800 dark:text-white'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										fill='none'
										viewBox='0 0 24 24'
									>
										<path
											stroke='currentColor'
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M5 11.917 9.724 16.5 19 7.5'
										/>
									</svg>
								}
							>
								Trailing Icon
							</Button>
						</div>
					),
				},
			]}
			keyboard={[
				{
					key: 'Space',
					description: "Triggers the button's action",
				},
				{
					key: 'Enter',
					description: "Triggers the button's action",
				},
				{
					key: 'Tab',
					description: 'Moves focus to the next focusable element',
				},
				{
					key: 'Shift + Tab',
					description: 'Moves focus to the previous focusable element',
				},
			]}
			accessibility={[
				'Automatic ARIA labels for icon-only buttons',
				'Loading state announcement with aria-busy',
				'Proper focus management with visible focus rings',
				'Support for aria-controls and aria-expanded',
				'Disabled state handling',
			]}
		/>
	);
}

export default ButtonDoc;
