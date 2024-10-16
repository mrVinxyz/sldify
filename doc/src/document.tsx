import { For } from 'solid-js';
import type { View } from 'core/types';

export interface DocumentProps {
	title: string;
	description: string;
	usage: {
		title: string;
		component: View;
		code: string;
	}[];
	apiReference?: {
		name: string;
		props: {
			name: string;
			description: string;
		}[];
	}[];
}

function DocumentationPage({ title, description, apiReference, usage }: DocumentProps) {
	const CopyIcon = () => (
		<svg
			class='w-6 h-6 text-gray-600'
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
	);

	return (
		<div class='space-y-8 max-w-screen h-full'>
			{/* Page Title */}
			<div>
				<h1 class='text-4xl font-semibold text-gray-800 dark:text-gray-50'>{title}</h1>
				<p class='text-lg text-gray-800 mt-4 dark:text-gray-50'>{description}</p>
			</div>

			{/* Usage Section */}
			<div>
				<h2 class='text-2xl font-medium text-gray-800 dark:text-gray-50'>Usage</h2>
				<div class='space-y-8'>
					<For each={usage}>
						{(usage) => (
							<div class='mt-4 space-y-2'>
								<h3 class='text-xl font-medium text-gray-800 dark:text-gray-50'>{usage.title}</h3>
								<div class='border border-gray-200 p-4 bg-gray-50 rounded-md dark:bg-gray-800 dark:border-gray-700'>
									{usage.component}
								</div>

								{/* Display the code right below */}
								<div class='bg-gray-100 p-4 rounded-lg relative border border-gray-200 dark:bg-gray-900 dark:border-gray-700'>
									<button
										type='button'
										class={
											'absolute right-2 top-2 rounded-lg p-2 hover:bg-gray-200'
										}
									>
										<CopyIcon />
									</button>
									<pre class='text-sm text-gray-800 overflow-auto font-medium dark:text-gray-200'>
										{usage.code}
									</pre>
								</div>
							</div>
						)}
					</For>
				</div>
			</div>

			{/* API Reference Section */}
			<div>
				<h2 class='text-2xl font-medium text-gray-800 dark:text-gray-50'>API Reference</h2>
				<For each={apiReference}>
					{(item) => (
						<div class='mt-6 dark:text-gray-50'>
							<h3 class='text-xl font-medium text-gray-800 dark:text-gray-50'>{item.name}</h3>
							<ul class='list-disc list-inside ml-4 mt-2'>
								<For each={item.props}>
									{(prop) => (
										<li>
											<strong>{prop.name}</strong>:{' '}
											<span class='text-gray-600 dark:text-gray-50'>{prop.description}</span>
										</li>
									)}
								</For>
							</ul>
						</div>
					)}
				</For>
			</div>
		</div>
	);
}

export { DocumentationPage };
