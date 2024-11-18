import { Button, type View } from 'pkg';
import { type Component, For } from 'solid-js';

export type UsageExample = {
	title: string;
	description: string;
	code: string;
	preview: () => View;
};

export type UsageProps = {
	examples: UsageExample[];
};

export const Usage: Component<UsageProps> = (props) => {
	return (
		<div class='p-4'>
			<h2 class='text-2xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100'>
				Usage
			</h2>
			<div class='space-y-8'>
				<For each={props.examples}>
					{(example) => (
						<div class='border dark:border-neutral-700 rounded'>
							{/* Header */}
							<div class='p-4 border-b dark:border-neutral-700'>
								<h3 class='font-semibold mb-2 text-neutral-900 dark:text-neutral-100'>
									{example.title}
								</h3>
								<p class='text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap'>
									{example.description}
								</p>
							</div>

							{/* Preview */}
							<div class='p-4 border-b dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50'>
								<div class='flex items-center justify-center'>
									{example.preview()}
								</div>
							</div>

							{/* Code */}
							<div class='relative'>
								<pre class='p-4 overflow-x-auto bg-neutral-900 dark:bg-neutral-900 text-neutral-50 rounded-b'>
									<code class='text-sm'>{example.code}</code>
								</pre>
								<Button
									class='absolute top-2 right-2'
									onClick={() => {
										navigator.clipboard.writeText(example.code);
										// You might want to add a toast notification here
									}}
								>
									{/*<Check class='w-4 h-4 mr-1' />*/}
									Copy
								</Button>
							</div>
						</div>
					)}
				</For>
			</div>
		</div>
	);
};
