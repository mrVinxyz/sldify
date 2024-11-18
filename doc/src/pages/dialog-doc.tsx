import { Button } from 'pkg';
import { ApiReference, type ApiReferenceProps } from '../components/api-reference';
import { Anatomy } from '../components/anatomy';
import { type Example, Examples } from '../components/example';
import IntroDoc from '../components/intro-doc';
import { Dialog } from 'pkg/components/dialog/dialog';
import { DialogControl } from 'pkg/components/dialog/dialog-control';
import { DialogContent } from 'pkg/components/dialog/dialog-content';
import { DialogTitle } from 'pkg/components/dialog/dialog-title';
import { AccessibilityDoc, type AccessibilityDocProps } from '../components/accessibility';
import { Usage, type UsageExample } from '../components/usage';
import { DialogDescription } from 'pkg/components/dialog/dialog-description';

const anatomy = `<Dialog>
  <DialogControl asChild={Component} />
  <DialogContent>
    <DialogTitle asChild={Component} />
    <DialogDescription asChild={Component} />
  </DialogContent>
</Dialog>`;

const apiReference: ApiReferenceProps = {
	components: [
		{
			name: 'Dialog',
			description: 'Root component that manages the dialog state and provides context.',
			props: [
				{
					name: 'id',
					type: 'string',
					default: 'random',
					description: 'Custom ID for the dialog component.',
				},
				{
					name: 'onActive',
					type: '() => void',
					description: 'Callback function when dialog becomes active',
				},
				{
					name: 'onToggle',
					type: '(isActive: boolean) => void',
					description: 'Callback function when visibility is toggled, receives new state',
				},
				{
					name: 'closeOnOutsideClick',
					type: 'boolean',
					description: 'Close the dialog when clicking outside its area',
					default: 'false',
				},
				{
					name: 'defaultOpen',
					type: 'boolean',
					description: 'Whether the dialog starts in an open state',
					default: 'false',
				},
				{
					name: 'class',
					type: 'string',
					description: 'Additional CSS classes to customize the root element',
				},
				{
					name: 'ctx',
					type: 'DialogContext',
					description: 'Optional context override for custom implementations',
				},
			],
		},
		{
			name: 'DialogContent',
			description: 'The container component that renders the actual dialog element.',
			props: [
				{
					name: 'autoMount',
					type: 'boolean',
					description:
						'Whether to mount content in DOM immediately while keeping it hidden. By default, content is only mounted when first opened.',
					default: 'false',
				},
				{
					name: 'backdrop',
					type: 'DialogBackdropProps',
					description: {
						title: 'Controls the backdrop appearance and animation',
						list: [
							'variant: "default" | "light" | "blur" | "solid" | "none"',
							'animation: "fade" | "scale" | "none"',
						],
					},
					default: '{ variant: "default", animation: "fade" }',
				},
				{
					name: 'class',
					type: 'string',
					description: 'Additional CSS classes to customize the dialog element',
				},
			],
		},
		{
			name: 'DialogControl',
			description: 'The trigger element that controls the dialog state.',
			props: [
				{
					name: 'asChild',
					type: 'ValidComponent',
					description: 'Component to be used as the control trigger',
				},
				{
					name: 'action',
					type: '"open" | "close" | "toggle"',
					description: 'Specifies the control behavior',
					default: '"toggle"',
				},
			],
		},
		{
			name: 'DialogTitle',
			description: 'Accessible title component for the dialog.',
			props: [
				{
					name: 'asChild',
					type: 'ValidComponent',
					description: 'Component to render as the title',
				},
				{
					name: 'srOnly',
					type: 'boolean',
					description: 'Whether title should be screen-reader only',
					default: 'false',
				},
				{
					name: 'class',
					type: 'string',
					description: 'Additional CSS classes to customize the title element',
				},
			],
		},
		{
			name: 'DialogDescription',
			description: 'Accessible description component for the dialog content.',
			props: [
				{
					name: 'asChild',
					type: 'ValidComponent',
					description: 'Component to render as the description',
				},
				{
					name: 'srOnly',
					type: 'boolean',
					description: 'Whether description should be screen-reader only',
					default: 'false',
				},
				{
					name: 'class',
					type: 'string',
					description: 'Additional CSS classes to customize the description element',
				},
				{
					name: 'children',
					type: 'View',
					description: 'Content to be rendered within the description',
				},
			],
		},
	],
};

const accessibility: AccessibilityDocProps = {
	pattern: {
		name: 'Dialog (Modal)',
		url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
	},
	keyboard: [
		{ key: 'Esc', description: 'Closes the dialog' },
		{ key: 'Tab', description: 'Moves focus to the next focusable element' },
		{ key: 'Shift + Tab', description: 'Moves focus to the previous focusable element' },
		{ key: 'Space/Enter', description: 'When focus is on the trigger, opens the dialog' },
	],
};

const examples: Example[] = [
	{
		title: 'Modal Dialog',
		description: {
			text: 'A modal dialog with backdrop, focus management, and explicit open/close controls.',
			highlight: 'p-6 max-w-2xl',
		},
		preview: () => {
			return (
				<Dialog>
					<DialogControl
						asChild={(props) => (
							<Button
								variant='outline'
								{...props}
							>
								Open Modal
							</Button>
						)}
					/>
					<DialogContent class='p-6 max-w-2xl w-full bg-white dark:bg-neutral-800 shadow rounded'>
						<div class='space-y-4'>
							<DialogTitle
								asChild='h3'
								class='text-lg font-medium text-gray-900 dark:text-gray-100'
							>
								Modal Dialog
							</DialogTitle>
							<p class='text-gray-500 dark:text-gray-400'>
								This is a modal dialog with a backdrop. Press ESC or use the close
								button.
							</p>
							<div class='flex justify-end'>
								<DialogControl
									action='close'
									asChild={(props) => (
										<Button
											variant='outline'
											{...props}
										>
											Close Dialog
										</Button>
									)}
								/>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			);
		},
	},
	{
		title: 'Outside Click Behavior',
		description: {
			text: 'Dialog that closes when clicking outside its content area',
			highlight: 'closeOnOutsideClick',
		},
		preview: () => {
			return (
				<Dialog closeOnOutsideClick>
					<DialogControl
						asChild={(props) => (
							<Button
								variant='outline'
								{...props}
							>
								Click Outside Demo
							</Button>
						)}
					/>
					<DialogContent class='p-6 max-w-2xl w-full bg-white dark:bg-neutral-800 shadow rounded'>
						<div class='space-y-4'>
							<DialogTitle
								asChild='h3'
								class='text-lg font-medium text-gray-900 dark:text-gray-100'
							>
								Click Outside Demo
							</DialogTitle>
							<p class='text-gray-500 dark:text-gray-400'>
								Click anywhere outside this dialog to close it. This behavior is
								controlled by the closeOnOutsideClick prop.
							</p>
						</div>
					</DialogContent>
				</Dialog>
			);
		},
	},
	{
		title: 'Event Handlers',
		description: {
			text: 'Dialog with active and toggle event handlers',
			highlight: ['onActive', 'onToggle'],
		},
		preview: () => {
			return (
				<Dialog
					onActive={() => console.log('Dialog became active')}
					onToggle={(isActive) => console.log('Dialog toggled:', isActive)}
				>
					<DialogControl
						asChild={(props) => (
							<Button
								variant='outline'
								{...props}
							>
								Event Demo
							</Button>
						)}
					/>
					<DialogContent class='p-6 max-w-2xl w-full bg-white dark:bg-neutral-800 shadow rounded'>
						<div class='space-y-4'>
							<DialogTitle
								asChild='h3'
								class='text-lg font-medium text-gray-900 dark:text-gray-100'
							>
								Event Handlers Demo
							</DialogTitle>
							<p class='text-gray-500 dark:text-gray-400'>
								Open your browser console to see the events being logged. Events
								fire when the dialog opens, closes, or toggles state.
							</p>
							<div class='flex justify-end'>
								<DialogControl
									action='close'
									asChild={(props) => (
										<Button
											variant='outline'
											{...props}
										>
											Close
										</Button>
									)}
								/>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			);
		},
	},
	{
		title: 'Different Sizes',
		description: {
			text: 'Dialogs can be configured with different sizes using classes',
			highlight: ['max-w-4xl', 'max-w-xl'],
		},
		preview: () => {
			return (
				<div class={'space-x-4'}>
					<Dialog>
						<DialogControl
							asChild={(props) => (
								<Button
									variant='outline'
									{...props}
								>
									Large Dialog
								</Button>
							)}
						/>
						<DialogContent class='p-6 max-w-4xl w-full bg-white dark:bg-neutral-800 shadow rounded'>
							<div class='space-y-4'>
								<DialogTitle
									asChild='h3'
									class='text-lg font-medium text-gray-900 dark:text-gray-100'
								>
									Large Dialog
								</DialogTitle>
								<p class='text-gray-500 dark:text-gray-400'>
									This dialog uses a larger max-width for displaying more complex
									content or data tables. The explicit max-w-4xl class controls
									the width.
								</p>
								<div class='flex justify-end'>
									<DialogControl
										action='close'
										asChild={(props) => (
											<Button
												variant='outline'
												{...props}
											>
												Close
											</Button>
										)}
									/>
								</div>
							</div>
						</DialogContent>
					</Dialog>

					<Dialog>
						<DialogControl
							asChild={(props) => (
								<Button
									variant='outline'
									{...props}
								>
									Small Dialog
								</Button>
							)}
						/>
						<DialogContent class='p-6 max-w-xl w-full bg-white dark:bg-neutral-800 shadow rounded'>
							<div class='space-y-4'>
								<DialogTitle
									asChild='h3'
									class='text-lg font-medium text-gray-900 dark:text-gray-100'
								>
									Small Dialog
								</DialogTitle>
								<p class='text-gray-500 dark:text-gray-400'>
									This dialog uses a smaller max-width, suitable for simple forms
									or confirmations. The explicit max-w-xl class controls the
									width.
								</p>
								<div class='flex justify-end'>
									<DialogControl
										action='close'
										asChild={(props) => (
											<Button
												variant='outline'
												{...props}
											>
												Close
											</Button>
										)}
									/>
								</div>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			);
		},
	},
	{
		title: 'Custom Backdrop',
		description: {
			text: 'Dialog with different backdrop styles',
			highlight: ['backdrop={{ variant: "blur" }}', `backdrop={'none'}`],
		},
		preview: () => {
			return (
				<div class='space-x-4'>
					<Dialog backdrop={{ variant: 'blur' }}>
						<DialogControl
							asChild={(props) => (
								<Button
									variant='outline'
									{...props}
								>
									Blur Backdrop
								</Button>
							)}
						/>
						<DialogContent class='p-6 w-full max-w-2xl bg-white dark:bg-neutral-800 shadow rounded'>
							<div class='space-y-4'>
								<DialogTitle
									asChild='h3'
									class='text-lg font-medium text-gray-900 dark:text-gray-100'
								>
									Blur Backdrop Dialog
								</DialogTitle>
								<p class='text-gray-500 dark:text-gray-400'>
									This dialog uses a blurred backdrop effect. Other variants
									include "default", "light", "solid", and "none".
								</p>
								<div class='flex'>
									<DialogControl
										action='close'
										asChild={(props) => (
											<Button
												variant='outline'
												{...props}
											>
												Close
											</Button>
										)}
									/>
								</div>
							</div>
						</DialogContent>
					</Dialog>

					<Dialog backdrop={'none'}>
						<DialogControl
							asChild={(props) => (
								<Button
									variant='outline'
									{...props}
								>
									No Backdrop
								</Button>
							)}
						/>
						<DialogContent class='p-6 w-full max-w-2xl bg-white dark:bg-neutral-800 shadow rounded'>
							<div class='space-y-4'>
								<DialogTitle
									asChild='h3'
									class='text-lg font-medium text-gray-900 dark:text-gray-100'
								>
									No Backdrop
								</DialogTitle>
								<p class='text-gray-500 dark:text-gray-400'>
									This dialog doesn't have a backdrop.
								</p>
								<div class='flex'>
									<DialogControl
										action='close'
										asChild={(props) => (
											<Button
												variant='outline'
												{...props}
											>
												Close
											</Button>
										)}
									/>
								</div>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			);
		},
	},
	{
		title: 'Lazy Mounting',
		description: {
			text: 'Control when dialog content is mounted to the DOM',
			highlight: 'autoMount={true}',
		},
		preview: () => {
			return (
				<Dialog>
					<DialogControl
						asChild={(props) => (
							<Button
								variant='outline'
								{...props}
							>
								Pre-mounted Dialog
							</Button>
						)}
					/>
					<DialogContent
						autoMount={true}
						class='p-6 max-w-2xl w-full bg-white dark:bg-neutral-800 shadow rounded'
					>
						<div class='space-y-4'>
							<DialogTitle
								asChild='h3'
								class='text-lg font-medium text-gray-900 dark:text-gray-100'
							>
								Pre-mounted Dialog
							</DialogTitle>
							<p class='text-gray-500 dark:text-gray-400'>
								This content is mounted in the DOM immediately but remains hidden.
								Useful when you need to pre-load content or maintain state between
								opens.
							</p>
							<div class='flex justify-end'>
								<DialogControl
									action='close'
									asChild={(props) => (
										<Button
											variant='outline'
											{...props}
										>
											Close
										</Button>
									)}
								/>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			);
		},
	},
];

const dialogUsage: UsageExample[] = [
	{
		title: 'Basic Dialog',
		description: `A basic dialog implementation with a trigger button and content. 
Key points:
- Use DialogControl with a button component to trigger the dialog
- Wrap your content in DialogContent
- Add a title using DialogTitle for accessibility
- Include close actions within the dialog`,
		code: `import { Dialog, DialogContent, DialogControl, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function BasicDialog() {
  return (
    <Dialog>
      <DialogControl
        asChild={(props) => (
          <Button variant="outline" {...props}>
            Open Dialog
          </Button>
        )}
      />
      <DialogContent class="p-6 max-w-md w-full bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
        <DialogTitle asChild="h2" class="text-lg font-bold mb-4">
          Dialog Title
        </DialogTitle>
        <p class="text-neutral-600 dark:text-neutral-400 mb-4">
          Dialog content goes here.
        </p>
        <div class="flex justify-end">
          <DialogControl
            action="close"
            asChild={(props) => (
              <Button variant="outline" {...props}>
                Close
              </Button>
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}`,
		preview: () => (
			<Dialog>
				<DialogControl
					asChild={(props) => (
						<Button
							variant='outline'
							{...props}
						>
							Open Dialog
						</Button>
					)}
				/>
				<DialogContent class='p-6 max-w-md w-full bg-white dark:bg-neutral-800 rounded-lg shadow-lg'>
					<DialogTitle
						asChild='h2'
						class='text-lg font-bold mb-4'
					>
						Dialog Title
					</DialogTitle>
					<p class='text-neutral-600 dark:text-neutral-400 mb-4'>
						Dialog content goes here.
					</p>
					<div class='flex justify-end'>
						<DialogControl
							action='close'
							asChild={(props) => (
								<Button
									variant='outline'
									{...props}
								>
									Close
								</Button>
							)}
						/>
					</div>
				</DialogContent>
			</Dialog>
		),
	},
];

const DialogDoc = () => {
	return (
		<div class='py-12 space-y-8'>
			<IntroDoc
				component='Dialog'
				description='A dialog component that supports both modal and non-modal behaviors using the native dialog element, with built-in accessibility features, backdrop customization, and lazy loading support.'
			/>
			<Anatomy>{anatomy}</Anatomy>
			<AccessibilityDoc {...accessibility} />
			<ApiReference {...apiReference} />
			<Usage examples={dialogUsage} />
			<Examples examples={examples} />
		</div>
	);
};

export default DialogDoc;
