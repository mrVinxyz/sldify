import { createSignal } from 'solid-js';
import { Form } from '../lib';
import { createForm } from '../lib/form/form';
import { FormInput, FormSelect, FormTextArea } from '../lib/form/input';

export default () => {
	const [formResult, setFormResult] = createSignal<null | Record<string, string>>(null);

	const submitAction = async (data: Record<string, string>): Promise<Response> => {
		console.log('Form data submitted:', data);
		return new Promise((resolve) => {
			setTimeout(() => {
				const response = new Response(JSON.stringify(data), {
					status: 200,
					statusText: 'OK',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				resolve(response);
			}, 1000);
		});
	};

	const fullForm = createForm({
		name: 'fullFeatureForm',
		submitAction,
	});

	return (
		<div class='bg-gray-100 p-8'>
			<div class='max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6'>
				<h1 class='text-2xl font-bold text-gray-800 mb-4'>Full-Featured Form</h1>
				<p class='text-gray-600 mb-8'>
					This form demonstrates the use of `FormInput`, `FormTextArea`, and `FormSelect`
					components with a submission handler.
				</p>

				<Form form={fullForm}>
					<FormInput
						name='username'
						label='Username'
						placeholder='Enter your username'
					/>

					<FormInput
						name='email'
						label='Email'
						placeholder='Enter your email'
					/>

					<FormTextArea
						name='message'
						label='Message'
						placeholder='Enter your message here...'
					/>

					<FormSelect
						name='color'
						label='Favorite Color'
						options={[
							{ name: 'Red', value: '#ff0000' },
							{ name: 'Green', value: '#00ff00' },
							{ name: 'Blue', value: '#0000ff' },
						]}
						default={{ name: 'Select a color', value: '' }}
					/>

					<button
						type='submit'
						class='mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'
					>
						Submit
					</button>
				</Form>

				{formResult() && (
					<div class='mt-6 p-4 bg-green-100 text-green-800 rounded'>
						<h2 class='text-lg font-semibold'>Form Submitted Successfully!</h2>
						<pre class='mt-2 bg-gray-800 text-white p-2 rounded'>
							<code>{JSON.stringify(formResult(), null, 2)}</code>
						</pre>
					</div>
				)}
			</div>
		</div>
	);
};
