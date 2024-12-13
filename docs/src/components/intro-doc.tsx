import type { Component } from 'solid-js';

type IntroDocProps = {
	component: string;
	description: string;
};

const IntroDoc: Component<IntroDocProps> = (props) => {
	return (
		<div class='p-4'>
			<h1 class='text-3xl font-bold mb-6 text-neutral-900 dark:text-gray-100'>
				{props.component}
			</h1>
			<p class='text-gray-600 dark:text-gray-300'>{props.description} </p>
		</div>
	);
};

export default IntroDoc;
