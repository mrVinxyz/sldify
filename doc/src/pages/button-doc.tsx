import { Button } from 'core';
import { ButtonGroup } from 'core/button/group';

export default () => {
	return (
		<>
			<div>
				<h1>Button Color</h1>
				<div class='space-x-2 space-y-2'>
					<Button name='Plain' color='plain' />
					<Button name='Primary' color='primary' />
					<Button name='Secondary' color='secondary' />
					<Button name='Success' color='success' />
					<Button name='Danger' color='danger' />
					<Button name='Warning' color='warning' />
					<Button name='Light' color='light' />
					<Button name='Dark' color='dark' />
					<Button name='Outline' color='outline' />
				</div>
			</div>

			<div>
				<h1>Button Group</h1>
				<div class='space-x-2 space-y-2'>
					<ButtonGroup
						layout='row'
						buttons={[
							{ name: 'First', onClick: () => console.log('Row First') },
							{ name: 'Middle', onClick: () => console.log('Row Middle') },
							{ name: 'Last', onClick: () => console.log('Row Last') },
						]}
					/>

					<ButtonGroup
						layout='col'
						buttons={[
							{ name: 'First', onClick: () => console.log('Col First') },
							{ name: 'Middle', onClick: () => console.log('Col Middle') },
							{ name: 'Last', onClick: () => console.log('Col Last') },
						]}
					/>

					<ButtonGroup
						layout='row'
						size='sqr_sm'
						buttons={[
							{ name: 'First', onClick: () => console.log('Row First') },
							{ name: 'Middle', onClick: () => console.log('Row Middle') },
							{ name: 'Last', onClick: () => console.log('Row Last') },
						]}
					/>
				</div>
			</div>
		</>
	);
};
