import './index.css';

import { render } from 'solid-js/web';
import { A, Route, Router, type RouteSectionProps } from '@solidjs/router';
import type { JSX } from 'solid-js';
import FormInputDoc from './doc/form-input-doc';
import FormFieldDoc from './doc/form-field-doc';
import FormFull from './doc/form-full';

render(
	() => (
		<Router
			base='doc'
			root={Layout}
		>
			<Route
				path='/form-input'
				component={FormInputDoc}
			/>
			<Route
				path='/form-field'
				component={FormFieldDoc}
			/>
			<Route
				path='/form-full'
				component={FormFull}
			/>
		</Router>
	),
	document.body,
);

function Layout(props: RouteSectionProps): JSX.Element {
	return (
		<div class='bg-gray-50 h-screen flex'>
			<Sidebar />
			<div class='flex-grow p-8 overflow-auto'>{props.children}</div>
		</div>
	);
}

function Sidebar() {
	return (
		<div class='w-64 h-screen bg-white shadow-md p-4'>
			<h2 class='text-xl font-bold mb-6'>Documentation</h2>
			<nav class='flex flex-col space-y-2'>
				<A
					href={'/form-input'}
					activeClass='text-blue-600 font-semibold'
					class='text-gray-800 hover:text-blue-500'
				>
					Form Input
				</A>
				<A
					href={'/form-field'}
					activeClass='text-blue-600 font-semibold'
					class='text-gray-800 hover:text-blue-500'
				>
					Form Field
				</A>
				<A
					href={'/form-full'}
					activeClass='text-blue-600 font-semibold'
					class='text-gray-800 hover:text-blue-500'
				>
					Form Full
				</A>
			</nav>
		</div>
	);
}
