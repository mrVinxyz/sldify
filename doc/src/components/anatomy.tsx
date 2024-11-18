import type { Component } from 'solid-js';

type AnatomyProps = {
	children: string;
};

const Anatomy: Component<AnatomyProps> = (props) => {
	return (
			<div class='p-4'>
				<h2 class='text-2xl font-semibold mb-4 text-neutral-900 dark:text-gray-100'>
					Anatomy
				</h2>
				<pre class='border border-gray-200 dark:border-neutral-700  bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-gray-50 p-4 rounded overflow-x-auto'>
					{props.children}
				</pre>
			</div>
	);
};

export { type AnatomyProps, Anatomy };
