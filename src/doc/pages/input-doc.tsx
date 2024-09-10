import { InputEl, InputGroup, Label } from '../../lib';
import { Select, Selection } from '../../lib/input/selectable';
import { InputSelect } from '../../lib/input/select';
import { TextArea } from '../../lib/input/text-area';
import { InputWithIcon } from '../../lib/input/with-icon';

export default () => (
	<div class={'grid grid-cols-12 gap-4'}>
		{/* Basic Input */}
		<InputGroup>
			<Label
				for='exampleInput'
				label='Example Input'
			/>
			<InputEl
				name='exampleInput'
				placeholder='Enter some text'
			/>
		</InputGroup>

		{/* Input With Icon */}
		<InputGroup>
			<Label
				for='exampleWithIcon'
				label='Example Input with Icon'
			/>
			<InputWithIcon
				input={{
					name: 'exampleInputWithIcon',
					placeholder: 'Enter some text',
				}}
				leadingIcon={
					<svg
						class='w-4 h-4 text-gray-500'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='currentColor'
						viewBox='0 0 20 20'
					>
						<path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z' />
					</svg>
				}
			/>
		</InputGroup>

		<InputGroup>
			<InputWithIcon
				input={{
					name: 'exampleInputWithIcon',
					placeholder: 'Enter some text',
				}}
				trailingIcon={
					<svg
						class='w-4 h-4 text-gray-500'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='currentColor'
						viewBox='0 0 20 20'
					>
						<path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z' />
					</svg>
				}
			/>
		</InputGroup>

		{/* Success Input */}
		<InputGroup>
			<Label
				for='exampleInputSuccess'
				label='Example Success Input'
			/>
			<InputEl
				name='exampleInputSuccess'
				placeholder='Enter some text'
				style={'success'}
			/>
		</InputGroup>

		{/* Error Input */}
		<InputGroup>
			<Label
				for='exampleInputError'
				label='Example Error Input'
			/>
			<InputEl
				name='exampleInputError'
				placeholder='Enter some text'
				style={'error'}
			/>
		</InputGroup>

		{/* Disabled Input */}
		<InputGroup>
			<Label
				for='exampleInputDisabled'
				label='Example Disabled Input'
			/>
			<InputEl
				name='exampleInputDisabled'
				placeholder='Enter some text'
				disabled
			/>
		</InputGroup>

		{/* Text Area */}
		<InputGroup>
			<Label
				for='exampleTextArea'
				label='Example Text Area Input'
			/>
			<TextArea
				name='exampleTextArea'
				placeholder='Enter some text'
			/>
		</InputGroup>

		{/* Basic Select */}
		<InputGroup>
			<Label
				for={'exampleSelect'}
				label={'Example Basic Select'}
			/>
			<InputSelect
				name={'exampleSelect'}
				default={{ name: 'Select an option', value: '' }}
				options={[
					{ name: 'Option 1', value: '1' },
					{ name: 'Option 2', value: '2' },
				]}
			/>
		</InputGroup>

		{/* Advanced Select */}
		<Select.Group>
			<Select.Label
				for='select'
				label='Example Advanced Select'
			/>
			<Select.Input
				name='select'
				placeholder='Select an option'
			/>
			<Select.OptionMap>
				<Select.Option
					name='Option 1'
					value='1'
				/>
				<Select.Option
					name='Option 2'
					value='2'
				/>
			</Select.OptionMap>
		</Select.Group>

		{/* Advanced Selection */}
		<Selection
			name={'selectable'}
			label={'Example Advanced Selection'}
			placeholder={'Select an option'}
			options={[
				{ name: 'Option 1', value: '1' },
				{ name: 'Option 2', value: '2' },
			]}
		/>
	</div>
);
