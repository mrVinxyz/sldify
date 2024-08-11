import { Form } from '../../lib';
import {
	createForm,
	type FormErr,
	FormInput,
	type FormsData,
	FormSelect,
	FormTextArea,
} from '../../lib/form/form';
import { Forms } from '../../lib/form/ui';

export default () => {
	const mockResponse = new Response(JSON.stringify({ id: '1' }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});

	const form = createForm({
		name: 'form',
		validate: (data: FormsData) => {
			const errors: FormErr = {};
			if (!data.field) {
				errors.field = 'Field is required';
			}
			return errors;
		},
		submitAction: async (data: FormsData) => {
			return mockResponse;
		},
		submitResult: (result: unknown) => {
			console.log('result', result);
		},
	});

	return (
		<Forms.Container>
			<Form form={form}>
				<Forms.Title title={'Basic Form'} />
				<FormInput
					name={'field'}
					label={'Field'}
					placeholder={'Enter field value'}
				/>
				<FormTextArea
					name={'textArea'}
					label={'TextArea'}
					placeholder={'Enter text value'}
				/>
				<FormSelect
					name={'select'}
					label={'Select'}
					options={[
						{ name: 'Option 1', value: '1' },
						{ name: 'Option 2', value: '2' },
					]}
					default={{ name: 'Select an option', value: '' }}
				/>
				<Forms.Footer position={'end'}>
					<Forms.SubmitButton label={'Submit'} />
				</Forms.Footer>
			</Form>
		</Forms.Container>
	);
};
