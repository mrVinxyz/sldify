import { Input } from '../lib';
import { createSignal } from 'solid-js';

export default () => {
	const [copied, setCopied] = createSignal(false);

	const handleCopy = () => {
		const code = document.getElementById('codeBlock')?.innerText;
		navigator.clipboard.writeText(code || '').then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
		<div class='bg-gray-100 p-8'>
			<div class='max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6'>
				<div class='mb-8'>
					<h1 class='text-2xl font-bold text-gray-800 mb-4'>Component Documentation</h1>
					<p class='text-gray-600'>
						This section provides a brief overview of the components available in this
						library. You can find a description of the component's purpose, its props,
						and an example of how to use it.
					</p>
				</div>

				<div>
					<h2 class='text-xl font-semibold text-gray-800 mb-4'>Example Usage</h2>
					<div class='p-4 bg-gray-50 border rounded-md space-y-4'>
						<Input.Group class='mb-4'>
							<Input.Label
								for='exampleInput'
								label='Example Input'
							/>
							<Input.Input
								name='exampleInput'
								placeholder='Enter some text'
							/>
						</Input.Group>

						<Input.Group class='mb-4'>
							<Input.Label
								for='exampleSelect'
								label='Example Select'
							/>
							<Input.Select
								name='exampleSelect'
								options={[
									{ name: 'Option 1', value: '1' },
									{ name: 'Option 2', value: '2' },
								]}
								default={{ name: 'Choose an option', value: '' }}
							/>
						</Input.Group>

						<Input.Group>
							<Input.Label
								for='exampleTextArea'
								label='Example TextArea'
							/>
							<Input.TextArea
								name='exampleTextArea'
								placeholder='Enter more details'
							/>
						</Input.Group>

						<Input.Group>
							<Input.Label
								for={'exampleDisabledInput'}
								label={'Disabled Input'}
							/>
							<Input.Input
								name={'exampleDisabledInput'}
								placeholder={'This input is disabled'}
								disabled={true}
							/>
						</Input.Group>
					</div>
				</div>

				{/* New Code Display Section */}
				<div class='mt-8'>
					<h2 class='text-xl font-semibold text-gray-800 mb-4'>Example Code</h2>
					<div class='relative bg-gray-800 text-white rounded-lg'>
						<pre
							id='codeBlock'
							class='p-4 overflow-x-auto'
						>
							<code>
								{`
{/* Input */}	
<Input.Group class='mb-4'>
	<Input.Label
		for='exampleInput'
		label='Example Input'
	/>
	<Input.Input
		name='exampleInput'
		placeholder='Enter some text'
	/>
</Input.Group>

{/* Select */}
<Input.Group class='mb-4'>
	<Input.Label
		for='exampleSelect'
		label='Example Select'
	/>
	<Input.Select
		name='exampleSelect'
		options={[
            { name: 'Option 1', value: '1' },
            { name: 'Option 2', value: '2' }
		]}
		default={{ name: 'Choose an option', value: '' }}
/>
</Input.Group>

{/* Text Area */}
<Input.Group>
	<Input.Label
		for='exampleTextArea'
		label='Example TextArea'
	/>
	<Input.TextArea
		name='exampleTextArea'
		placeholder='Enter more details'
	/>
</Input.Group>

{/* Disabled Input */}
<Input.Group>
	<Input.Label 
	for={'exampleDisabledInput'} 
	label={'Disabled Input'} 
	/>
	<Input.Input
		name={'exampleDisabledInput'}
		placeholder={'This input is disabled'}
		disabled={true}
	/>
</Input.Group>
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
