import { Input } from '../../lib';

export default () => {
	return (
		<div class={'w-full bg-white p-4 space-y-4'}>
			<Input.Group>
				<Input.Label label={'Input'} for={'input'} />
				<Input.Input name={'input'} placeholder={'Enter field value'} />
			</Input.Group>

			<Input.Group>
				<Input.Label label={'TextField'} for={'textField'} />
				<Input.TextArea
					name={'textField'}
					placeholder={'Enter field value'}
				/>
			</Input.Group>

			<Input.Group>
				<Input.Label label={'Select'} for={'select'} />
				<Input.Select
					name={'select'}
					options={[
						{ name: 'Option 1', value: '1' },
						{ name: 'Option 2', value: '2' },
					]}
					default={{ name: 'Select an option', value: '' }}
				/>
			</Input.Group>
		</div>
	);
};
