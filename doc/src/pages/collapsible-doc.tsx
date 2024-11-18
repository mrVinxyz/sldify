import {
	Button,
	Collapsible,
	CollapsibleContent,
	CollapsibleControl,
} from 'pkg';
import { ApiReference, type ApiReferenceProps } from '../components/api-reference';
import { Anatomy } from '../components/anatomy';
import { type Example, Examples } from '../components/example';
import IntroDoc from '../components/intro-doc';
import type { CollapsibleController } from 'pkg/components/collapsible/collapsible-control';

const anatomy = `<Collapsible>
  <CollapsibleControl asChild={ControllerComponent}/>
  
    <CollapsibleContent>
      Content
    </CollapsibleContent>
  
</Collapsible>`;

const apiReference: ApiReferenceProps = {
	components: [
		{
			name: 'Collapsible',
			description: 'Root component that manages the collapsible state and provides context.',
			props: [
				{
					name: 'id',
					type: 'string',
					description:
						'Optional custom ID for the collapsible component. If not provided, one will be randomly generated.',
				},
				{
					name: 'onActive',
					type: '() => void',
					description: 'Callback function when content becomes active',
				},
				{
					name: 'onToggle',
					type: '(isActive: boolean) => void',
					description: 'Callback function when visibility is toggled, receives new state',
				},
				{
					name: 'closeOnOutsideClick',
					type: 'boolean',
					description: 'Close the collapsible when clicking outside its area',
				},
				{
					name: 'hoverDelay',
					type: 'number',
					description: 'Delay in milliseconds before showing/hiding on hover',
				},
				{
					name: 'defaultOpen',
					type: 'boolean',
					description: 'Whether the collapsible starts in an open state',
				},
				{
					name: 'class',
					type: 'string',
					description: 'Additional CSS classes to customize the root element',
				},
			],
		},
		{
			name: 'CollapsibleControl',
			description: 'The trigger element that controls the collapsible state.',
			props: [
				{
					name: 'asChild',
					type: 'ValidComponent',
					description: 'Component to be used as the control trigger',
				},
				{
					name: 'ctx',
					type: 'CollapsibleContext',
					description: 'Optional context override for flexible compositions',
				},
			],
		},
		{
			name: 'CollapsibleController',
			description: 'Required props that must be propagated to the control element.',
			props: [
				{
					name: 'id',
					type: 'string',
					description: 'Receives the ID of the collapsible control. Do not modify.',
				},
				{
					name: 'onClick',
					type: '(e: MouseEvent) => void',
					description: 'Receives the click event on the control',
				},
			],
		},
		{
			name: 'CollapsiblePortal',
			description: 'Container that manages visibility and mounting of collapsible content.',
			props: [
				{
					name: 'autoMount',
					type: 'boolean',
					description:
						'Mount content in DOM while keeping it hidden, instead of mounting on first activation',
				},
				{
					name: 'class',
					type: 'string',
					description: 'Additional CSS classes to customize the portal element',
				},
			],
		},
		{
			name: 'CollapsibleContent',
			description: 'The content to be shown/hidden within the portal.',
			props: [
				{
					name: 'layout',
					type: "'float' | 'fixed'",
					description: {
						title: 'Determines the positioning behavior of the content',
						list: [
							'float: Uses absolute positioning, creating a detached dropdown-like behavior',
							'fixed: Uses relative positioning, creating an attached accordion-like behavior',
						],
					},
				},
				{
					name: 'class',
					type: 'string',
					description: 'Additional CSS classes to customize the content element',
				},
			],
		},
	],
};

const examples = [
	{
		title: 'Floating',
		description: {
			text: 'Content does not follow the document flow.',
			highlight: `layout={'float'}`,
		},
		preview: () => {
			const Controller = (props: CollapsibleController) => (
				<Button
					textContent={'Click Me'}
					variant={'outline'}
					{...props}
				/>
			);

			return (
				<Collapsible closeOnOutsideClick>
					<CollapsibleControl asChild={Controller} />

					<CollapsibleContent
						layout={'float'}
						class='w-48 mt-2'
					>
						<div class='px-4 py-3 bg-gray-50 dark:bg-neutral-800 rounded'>
							<p class='text-gray-900 dark:text-gray-100'>Content floating</p>
						</div>
					</CollapsibleContent>
				</Collapsible>
			);
		},
	},
	{
		title: 'Fixed',
		description: {
			text: 'Content follows document flow',
			highlight: `layout={'fixed'}`,
		},
		preview: () => {
			const Controller = (props: CollapsibleController) => (
				<Button
					textContent={'Toggle Section'}
					variant={'outline'}
					class='w-full justify-center !rounded-none !rounded-t'
					{...props}
				/>
			);

			return (
				<Collapsible>
					<CollapsibleControl asChild={Controller} />

					<CollapsibleContent
						layout={'fixed'}
						class='w-full'
					>
						<div class='px-4 py-3 border-b border-x dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 rounded-b'>
							<p class='text-gray-900 dark:text-gray-100'>
								Content follows the document flow
							</p>
						</div>
					</CollapsibleContent>
				</Collapsible>
			);
		},
	},
	{
		title: 'Close on outside click',
		description: {
			text: 'Close content on click outside of the collapsible',
			highlight: 'closeOnOutsideClick',
		},
		preview: () => {
			const Controller = (props: CollapsibleController) => (
				<Button
					textContent={'Toggle'}
					variant={'outline'}
					{...props}
				/>
			);

			return (
				<Collapsible closeOnOutsideClick>
					<CollapsibleControl asChild={Controller} />

					<CollapsibleContent
						layout={'float'}
						class='w-48 mt-2'
					>
						<div class='p-4 bg-white dark:bg-neutral-800 rounded shadow border border-gray-200 dark:border-neutral-700'>
							<span class='text-gray-900 dark:text-gray-100'>
								Click outside to close
							</span>
						</div>
					</CollapsibleContent>
				</Collapsible>
			);
		},
	},
	{
		title: 'Hover',
		description: {
			text: 'Trigger content visibility on hover with a delay',
			highlight: 'hoverDelay={200}',
		},
		preview: () => {
			const Controller = (props: CollapsibleController) => (
				<Button
					textContent={'Hover Me'}
					variant={'outline'}
					{...props}
				/>
			);

			return (
				<Collapsible
					hoverDelay={400}
					closeOnOutsideClick
				>
					<CollapsibleControl asChild={Controller} />

					<CollapsibleContent
						layout={'float'}
						class='w-48 mt-2'
					>
						<nav class='bg-white dark:bg-neutral-800 rounded shadow border border-gray-200 dark:border-neutral-700'>
							<ul class='divide-y divide-gray-100 dark:divide-neutral-700'>
								<li class='px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-700 text-gray-900 dark:text-gray-100'>
									Menu Item
								</li>
								<li class='px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-700 text-gray-900 dark:text-gray-100'>
									Menu Item
								</li>
							</ul>
						</nav>
					</CollapsibleContent>
				</Collapsible>
			);
		},
	},
	{
		title: 'Default Open',
		description: {
			text: 'Start with content visible',
			highlight: 'defaultOpen',
		},
		preview: () => {
			const Controller = (props: CollapsibleController) => (
				<Button
					textContent={'Toggle'}
					variant={'outline'}
					{...props}
				/>
			);

			return (
				<Collapsible defaultOpen>
					<CollapsibleControl asChild={Controller} />
					<CollapsibleContent
						layout={'fixed'}
						class='p-4 mt-2 bg-gray-50 dark:bg-neutral-800 rounded'
					>
						<span class='text-gray-900 dark:text-gray-100'>
							Content visible by default
						</span>
					</CollapsibleContent>
				</Collapsible>
			);
		},
	},
];

const CollapsibleDoc = () => {
	return (
		<div class='py-12 space-y-8'>
			<IntroDoc
				component={'Collapsible'}
				description={'A component that can be expanded/collapsed with a trigger element.'}
			/>
			<Anatomy>{anatomy}</Anatomy>
			<ApiReference components={apiReference.components} />
			<Examples examples={examples} />
		</div>
	);
};

export default CollapsibleDoc;
