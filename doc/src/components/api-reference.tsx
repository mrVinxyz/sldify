import { type Component, createSignal, For, Show } from 'solid-js';

type ApiProp = {
	name: string;
	type: string;
	default?: string;
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
	const [hasDefault, setHasDefault] = createSignal(false);
	return (
		<div class='p-4'>
			<h2 class='text-2xl font-semibold mb-4 text-neutral-900 dark:text-gray-100'>
				API Reference
			</h2>
			<div class='space-y-8'>
				<For each={props.components}>
					{(component) => (
						<div class='space-y-4'>
							<h3 class='text-lg font-semibold text-neutral-900 dark:text-gray-100'>
								{component.name}
							</h3>
							<p class='text-neutral-700 dark:text-gray-100'>
								{component.description}
							</p>
							<div class='border dark:border-neutral-700 rounded overflow-y-auto'>
								<table class='w-full'>
									<thead class='bg-gray-100 dark:bg-neutral-800'>
										<tr>
											<th class='px-4 py-2 text-left text-neutral-900 dark:text-gray-100'>
												Prop
											</th>
											<th class='px-4 py-2 text-left text-neutral-900 dark:text-gray-100'>
												Type
											</th>
											<Show when={hasDefault()}>
												<th class='px-4 py-2 text-left text-neutral-900 dark:text-gray-100'>
													Default
												</th>
											</Show>
											<th class='px-4 py-2 text-left text-neutral-900 dark:text-gray-100'>
												Description
											</th>
										</tr>
									</thead>
									<tbody>
										<For each={component.props}>
											{(prop) => {
												if (!hasDefault() && prop.default) {
													setHasDefault(true);
												}

												return (
													<tr class='border-t dark:border-neutral-700'>
														<td class='px-4 py-2 font-mono text-sm text-neutral-900 dark:text-gray-100 whitespace-nowrap'>
															{prop.name}
														</td>
														<td class='px-4 py-2 font-mono text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap'>
															{prop.type}
														</td>
														<Show when={hasDefault()}>
															<td class='px-4 py-2 font-mono text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap'>
																{prop.default || '-'}
															</td>
														</Show>
														<td class='p-2 text-sm text-gray-600 dark:text-gray-300 min-w-[300px]'>
															{typeof prop.description ===
															'string' ? (
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
												);
											}}
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
