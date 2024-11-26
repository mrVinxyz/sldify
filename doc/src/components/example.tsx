import { type Component, For, Match, Switch } from 'solid-js';
import type { View } from 'pkg';

type Example = {
	title: string;
	description: { text: string; highlight?: string | string[] };
	preview: () => View;
};

type ExamplesProps = {
	examples: Example[];
};

const Examples = (props: ExamplesProps) => {
	const HighlightedCode = (props: { code: string }) => {
		return (
			<code
				class={
					'px-2 py-1 text-sm bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 rounded me-2'
				}
			>
				{props.code}
			</code>
		);
	};

	return (
		<div class='p-4'>
			<h2 class='text-2xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100'>
				Examples
			</h2>
			<div class='space-y-8'>
				<For each={props.examples}>
					{(example) => (
						<div class='border dark:border-neutral-700 rounded'>
							<div class='p-4 border-b dark:border-neutral-700'>
								<h3 class='font-semibold mb-2 text-neutral-900 dark:text-neutral-100'>
									{example.title}
								</h3>
								<p class='text-neutral-600 dark:text-neutral-300 mb-2'>
									{example.description.text}
								</p>
								<Switch>
									<Match when={typeof example.description.highlight === 'string'}>
										<HighlightedCode
											code={example.description.highlight as string}
										/>
									</Match>
									<Match when={Array.isArray(example.description.highlight)}>
										<For each={example.description.highlight as string[]}>
											{(hl) => <HighlightedCode code={hl} />}
										</For>
									</Match>
								</Switch>
							</div>
							<div class='p-4 flex items-center justify-center'>
								{example.preview()}
							</div>
						</div>
					)}
				</For>
			</div>
		</div>
	);
};

export { type Example, type ExamplesProps, Examples };
