import { type Component, For } from 'solid-js';

export type KeyboardInteraction = {
	key: string;
	description: string;
};

export type AccessibilityDocProps = {
	pattern: {
		name: string;
		url: string;
	};
	keyboard: KeyboardInteraction[];
};

export const AccessibilityDoc: Component<AccessibilityDocProps> = (props) => {
	return (
		<div class='p-4 space-y-6'>
			<div class='space-y-4'>
				<h2 class='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
					Accessibility
				</h2>
				<p class='text-neutral-600 dark:text-neutral-400'>
					This component follows the{' '}
					<a
						href={props.pattern.url}
						target='_blank'
						rel='noreferrer'
						class='font-medium underline text-neutral-900 dark:text-neutral-100 hover:text-neutral-700 dark:hover:text-neutral-300'
					>
						WAI-ARIA {props.pattern.name} Pattern
					</a>
				</p>
			</div>

			<div class='space-y-4'>
				<h3 class='font-medium text-neutral-800 dark:text-neutral-200'>
					Keyboard Interactions
				</h3>
				<div class='border dark:border-neutral-800 rounded-lg overflow-hidden'>
					<table class='w-full border-collapse'>
						<tbody class='divide-y divide-neutral-200 dark:divide-neutral-800'>
							<For each={props.keyboard}>
								{(kb) => (
									<tr>
										<td class='px-2 py-2'>
											<kbd class='rounded border border-solid border-b-4 px-1 py-0.5 text-zinc-900 font-mono text-xs font-semibold bg-zinc-100 border-zinc-300 dark:text-white/90 dark:bg-zinc-800 dark:border-zinc-600'>
												{kb.key}
											</kbd>
										</td>
										<td class='px-4 py-2 text-neutral-600 dark:text-neutral-400'>
											{kb.description}
										</td>
									</tr>
								)}
							</For>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
