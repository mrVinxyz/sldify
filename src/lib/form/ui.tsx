import type { JSXElement } from 'solid-js';

const Container = (props: {
	children: JSXElement;
}) => {
	return (
		<div class={'bg-white p-4 rounded-md shadow-sm'}>{props.children}</div>
	);
};

const Title = (props: {
	title: string;
}) => {
	return (
		<div class='col-span-12 flex justify-between items-center pb-4 border-b mb-4'>
			<h3 class='text-xl font-semibold text-gray-700'>{props.title}</h3>
		</div>
	);
};

const Card = (props: {
	children: JSXElement;
}) => {
	return (
		<div class={'relative gap-4 grid grid-cols-12 bg-white rounded-md'}>
			{props.children}
		</div>
	);
};

const Footer = (props: {
	children: JSXElement;
	position?: 'start' | 'end' | 'between';
}) => {
	return (
		<div
			class={`col-span-12 flex items-center gap-4 pt-4 mt-4 border-t justify-${props?.position || ''}`}>
			{props.children}
		</div>
	);
};

const SubmitButton = (props: {
	label: string;
}) => {
	return (
		<button
			type='submit'
			class='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm md:text-base px-5 py-2.5 text-center'>
			{props.label}
		</button>
	);
};

const CancelButton = (props: {
	label: string;
}) => {
	return (
		<button
			type='reset'
			class='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 text-center'>
			{props.label}
		</button>
	);
};

export const Forms = {
	Container,
	Title,
	Card,
	SubmitButton,
	CancelButton,
	Footer,
};
