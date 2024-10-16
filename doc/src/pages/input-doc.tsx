import {Input} from 'core';

export default () => {
	return (
		<>
			<h1>Input </h1>
			<div class='space-x-2 space-y-2'>
				<Input name={'name'} placeholder={'Type your name'}/>
			</div>
		</>
	);
};
