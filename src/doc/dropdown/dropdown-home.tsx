import { Dropdown } from '../../lib';

export default () => {
	return (
		<Dropdown.Component>
			<Dropdown.Trigger>
				<button
					type={'button'}
					class={
						'bg-blue-600 text-white p-2.5 rounded-md font-medium'
					}>
					Toggle Dropdown
				</button>
			</Dropdown.Trigger>
			<Dropdown.Menu>
				<Dropdown.Item content={'Item 1'} />
				<Dropdown.Item content={'Item 2'} />
				<Dropdown.Item content={'Item 3'} />
			</Dropdown.Menu>
		</Dropdown.Component>
	);
};
