import { createEffect, createSignal } from 'solid-js';
import { Field, Form, Input } from '../lib';
import { createForm, useForm } from '../lib/form/form';

export default () => {
	const [copied, setCopied] = createSignal(false);

	const handleCopy = () => {
		const code = document.getElementById('codeBlock')?.innerText;
		navigator.clipboard.writeText(code || '').then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	const [selectValue, setSelectValue] = createSignal('');

	createEffect(() => console.log('selectValue:', selectValue()));

	return (
		<div class='bg-gray-100 p-8'>
			<div class='max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6'>
				<div class='mb-8'>
					<h1 class='text-2xl font-bold text-gray-800 mb-4'>
						Field Component Documentation
					</h1>
					<p class='text-gray-600'>
						This section provides a brief overview of the `Field` component available in
						this library. You can find a description of the component's purpose, its
						props, and an example of how to use it.
					</p>
				</div>

				<div>
					<h2 class='text-xl font-semibold text-gray-800 mb-4'>Example Usage</h2>
					<div class='p-4 bg-gray-50 border rounded-md'>
						<Form
							form={createForm({
								name: 'exampleForm',
							})}
						>
							<Field name='exampleSelect'>
								{(field) => (
									<Input.Group class='md:col-span-12'>
										<Input.Label
											for='exampleSelect'
											label='Example Select'
										/>
										<Input.Select
											name='exampleSelect'
											options={[
												{ name: 'Option 1', value: '1' },
												{ name: 'Option 2', value: '2' },
												{ name: 'Option 3', value: '3' },
											]}
											default={{ name: 'Choose an option', value: '' }}
											value={field.value()}
											onChange={(e) => {
												field.setValue(
													(e.currentTarget as HTMLSelectElement).value,
												);
												setSelectValue(
													(e.currentTarget as HTMLSelectElement).value,
												);
											}}
											class={field.errors() ? 'border-red-600' : ''}
										/>
										<Input.Feedback msg={field.errors()} />
									</Input.Group>
								)}
							</Field>
						</Form>
					</div>
				</div>

				{/* New Code Display Section */}
				<div class='mt-8'>
					<h2 class='text-xl font-semibold text-gray-800 mb-4'>Example Code</h2>
					<div class='relative bg-gray-800 text-white rounded-lg text-sm'>
						<pre
							id='codeBlock'
							class='p-4 overflow-x-auto'
						>
							<code>
								{`
<div class='p-4 bg-gray-50 border rounded-md'>
	<Form
		form={createForm({
			name: 'exampleForm',
		})}
		>
		<Field name="exampleSelect">
			{(field) => (
				<Input.Group class="md:col-span-12">
					<Input.Label for="exampleSelect" label="Example Select" />
					<Input.Select
						name="exampleSelect"
						options={[
							{ name: 'Option 1', value: '1' },
							{ name: 'Option 2', value: '2' },
							{ name: 'Option 3', value: '3' },
						]}
						default={{ name: 'Choose an option', value: '' }}
						value={field.value()}
						onChange={(e) =>
							field.setValue(
                                (e.currentTarget as HTMLSelectElement).value
                            );
                            // if you want to use the select value outside the form
							setSelectValue(
                                (e.currentTarget as HTMLSelectElement).value,
	 						);
							console.log('selectValue:', selectValue())
						}
						class={field.errors() ? 'border-red-600' : ''}
					/>
					<Input.Feedback msg={field.errors()} />
				</Input.Group>
			)}
		</Field>
	</Form>
</div>
`}
							</code>
						</pre>
						<button
							type='button'
							onClick={handleCopy}
							class='absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1 px-3 rounded'
						>
							{copied() ? 'Copied!' : 'Copy'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
