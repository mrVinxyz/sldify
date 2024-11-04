import type { View } from 'pkg/utils/types';
import { type Component, For } from 'solid-js';

interface DocTmpl {
	title: string;
	description: string;
	importCode: string;
	features: string[];
	apiReference: Array<{
		prop: string;
		type: string;
		defaultValue: string;
		description: string;
	}>;
	examples: Array<{
		title: string;
		description: string;
		component: () => View;
	}>;
	keyboard?: Array<{
		key: string;
		description: string;
	}>;
	accessibility?: string[];
}

const DocumentTmpl: Component<DocTmpl> = (props) => {
	return (
		<div class='max-w-5xl mx-auto space-y-12'>
			{/* Introduction */}
			<section>
				<h2 class='text-3xl font-bold mb-4'>{props.title}</h2>
				<p class='text-gray-600 dark:text-gray-400 mb-4'>{props.description}</p>
				{/* Basic Usage Example */}
				<div class='bg-gray-100 dark:bg-gray-800 rounded-md p-4 mb-4'>
					<code class='block text-sm'>{props.importCode}</code>
				</div>
			</section>

			{/* Features List */}
			<section>
				<h3 class='text-xl font-semibold mb-3'>Features</h3>
				<ul class='list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400'>
					<For each={props.features}>{(feature) => <li>{feature}</li>}</For>
				</ul>
			</section>

			{/* API Reference */}
			<section>
				<h3 class='text-xl font-semibold mb-3'>API Reference</h3>
				<div class='overflow-x-auto'>
					<table class='w-full text-left'>
						<thead>
							<tr class='border-b dark:border-gray-700'>
								<th class='py-3 px-4 font-semibold'>Prop</th>
								<th class='py-3 px-4 font-semibold'>Type</th>
								<th class='py-3 px-4 font-semibold'>Default</th>
								<th class='py-3 px-4 font-semibold'>Description</th>
							</tr>
						</thead>
						<tbody class='divide-y divide-gray-200 dark:divide-gray-700'>
							<For each={props.apiReference}>
								{(api) => (
									<tr>
										<td class='py-3 px-4'>{api.prop}</td>
										<td class='py-3 px-4 text-gray-600 dark:text-gray-400'>
											{api.type}
										</td>
										<td class='py-3 px-4 text-gray-600 dark:text-gray-400'>
											{api.defaultValue}
										</td>
										<td class='py-3 px-4'>{api.description}</td>
									</tr>
								)}
							</For>
						</tbody>
					</table>
				</div>
			</section>

			{/* Examples Section */}
			<section>
				<h3 class='text-xl font-semibold mb-3'>Examples</h3>
				<div class='space-y-6'>
					<For each={props.examples}>
						{(example) => (
							<div>
								<h4 class='text-lg font-semibold mb-2'>{example.title}</h4>
								<p class='text-gray-600 dark:text-gray-400 mb-4'>
									{example.description}
								</p>
								<div class='flex items-start flex-wrap gap-2'>
									{example.component()}
								</div>
							</div>
						)}
					</For>
				</div>
			</section>

			{/* Keyboard Section */}
			{props.keyboard && (
				<section>
					<h3 class='text-xl font-semibold mb-3'>Keyboard Navigation</h3>
					<div class='overflow-x-auto'>
						<table class='w-full text-left'>
							<thead>
								<tr class='border-b dark:border-gray-700'>
									<th class='py-3 px-4 font-semibold'>Key</th>
									<th class='py-3 px-4 font-semibold'>Description</th>
								</tr>
							</thead>
							<tbody class='divide-y divide-gray-200 dark:divide-gray-700'>
								<For each={props.keyboard}>
									{(item) => (
										<tr>
											<td class='py-3 px-4'>{item.key}</td>
											<td class='py-3 px-4'>{item.description}</td>
										</tr>
									)}
								</For>
							</tbody>
						</table>
					</div>
				</section>
			)}

			{/* Accessibility Section */}
			{props.accessibility && (
				<section>
					<h3 class='text-xl font-semibold mb-3'>Accessibility</h3>
					<p class='text-gray-600 dark:text-gray-400 mb-4'>
						This component follows WAI-ARIA guidelines and includes these accessibility
						features:
					</p>
					<ul class='list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400'>
						<For each={props.accessibility}>{(feature) => <li>{feature}</li>}</For>
					</ul>
				</section>
			)}
		</div>
	);
};

export default DocumentTmpl;
