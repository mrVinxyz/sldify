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
				'Multiple variants (solid, outlined, dotted)',
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
					type: 'boolean',
					defaultValue: 'false',
					description: 'Shows a loading spinner and disables the button',
				},
			]}
			examples={[
				{
					title: 'Variant',
					description:
						'Choose from solid, outlined, or dotted variants to suit different use cases.',
					component: () => (
						<div class='flex gap-4'>
							<Button
								variant='solid'
								color='primary'
							>
								Solid
							</Button>
							<Button
								variant='outlined'
								color='primary'
							>
								Outlined
							</Button>
							<Button
								variant='dotted'
								color='primary'
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
							<Button color='primary'>Primary</Button>
							<Button color='secondary'>Secondary</Button>
							<Button color='dark'>Dark</Button>
							<Button color='light'>Light</Button>
							<Button color='green'>Green</Button>
							<Button color='red'>Red</Button>
							<Button color='yellow'>Yellow</Button>
							<Button color='orange'>Orange</Button>
						</div>
					),
				},
				{
					title: 'Button Sizes',
					description:
						'Available in both rectangular and square variants to suit different use cases.',
					component: () => (
						<div class='flex gap-4'>
							<Button size='rec-md'>Regular</Button>
							<Button size='sqr-md'>Square</Button>
						</div>
					),
				},
				{
					title: 'Loading State',
					description: 'Built-in loading state with spinner and disabled functionality',
					component: () => <Button loading={true}>Loading Button</Button>,
				},
				{
					title: 'Border Radius',
					description: 'Configurable border radius for different visual styles.',
					component: () => (
						<div class='flex gap-4'>
							<Button rounded='none'>None</Button>
							<Button rounded='sm'>Small</Button>
							<Button rounded='md'>Medium</Button>
							<Button rounded='lg'>Large</Button>
							<Button rounded='full'>Full</Button>
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
								color='light'
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
								color='light'
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
				// ... other examples
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
