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
									size={'sqr-md'}
									onClick={() => {
										navigator.clipboard.writeText(example.code);
									}}
								>
									<svg
										class='w-5 h-5 text-neutral-800 dark:text-neutral-50'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										fill='none'
										viewBox='0 0 24 24'
									>
										<path
											stroke='currentColor'
											stroke-linejoin='round'
											stroke-width='2'
											d='M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z'
										/>
									</svg>
								</Button>
							</div>
						</div>
					)}
				</For>
			</div>
		</div>
	);
};
