import { type Component, createSignal, For, Show } from 'solid-js';

type ApiProp = {
	name: string;
	type: string;
	default?: string;
	required?: boolean;
	description: Description;
};

type Description =
	| string
	| {
			title: string;
			list?: string[];
	  };

type ComponentApi = {
	name: string;
	description: string;
	props: ApiProp[];
};

type ApiReferenceProps = {
	components: ComponentApi[];
};

const ApiReference: Component<ApiReferenceProps> = (props) => {
	const hasRequired = props.components.some((component) =>
		component.props.some((prop) => prop.required),
	);
	const hasDefault = props.components.some((component) =>
		component.props.some((prop) => prop.default),
	);

	return (
		<div class='p-4'>
			<h2 class='text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-50'>
				API Reference
			</h2>
			<div class='space-y-8'>
				<For each={props.components}>
					{(component) => (
						<div class='space-y-4'>
							<h3 class='text-lg font-semibold text-neutral-800 dark:text-neutral-50'>
								{component.name}
							</h3>
							<p class='text-neutral-700 dark:text-neutral-50'>
								{component.description}
							</p>
							<div class='border dark:border-neutral-700 rounded overflow-y-auto'>
								<table class='w-full'>
									<thead class='bg-gray-100 dark:bg-neutral-800'>
										<tr>
											<th class='px-4 py-2 text-left text-neutral-800 dark:text-neutral-50'>
												Prop
											</th>
											<th class='px-4 py-2 text-left text-neutral-800 dark:text-neutral-50'>
												Type
											</th>
											<Show when={hasRequired}>
												<th class='px-4 py-2 text-left text-neutral-800 dark:text-neutral-50'>
													Required
												</th>
											</Show>
											<Show when={hasDefault}>
												<th class='px-4 py-2 text-left text-neutral-800 dark:text-neutral-50'>
													Default
												</th>
											</Show>
											<th class='px-4 py-2 text-left text-neutral-800 dark:text-neutral-50'>
												Description
											</th>
										</tr>
									</thead>
									<tbody>
										<For each={component.props}>
											{(prop) => (
												<tr class='border-t dark:border-neutral-700'>
													<td class='px-4 py-2 font-mono text-sm text-neutral-800 dark:text-neutral-50 whitespace-nowrap'>
														{prop.name}
													</td>
													<td class='px-4 py-2 font-mono text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap'>
														{prop.type}
													</td>

													<Show when={hasRequired}>
														<td class='px-4 py-2 font-mono text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap'>
															{prop.required ? '✓' : '-'}
														</td>
													</Show>

													<Show when={hasDefault}>
														<td class='px-4 py-2 font-mono text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap'>
															{prop.default || '-'}
														</td>
													</Show>

													<td class='p-2 text-sm text-gray-600 dark:text-gray-300 min-w-[300px]'>
														{typeof prop.description === 'string' ? (
															prop.description
														) : (
															<div class='space-y-2'>
																<p>{prop.description.title}</p>
																{prop.description.list && (
																	<ul class='mt-2 list-disc pl-4 space-y-1'>
																		<For
																			each={
																				prop.description
																					.list
																			}
																		>
																			{(item) => (
																				<li>{item}</li>
																			)}
																		</For>
																	</ul>
																)}
															</div>
														)}
													</td>
												</tr>
											)}
										</For>
									</tbody>
								</table>
							</div>
						</div>
					)}
				</For>
			</div>
		</div>
	);
};

export { type ApiReferenceProps, ApiReference };
