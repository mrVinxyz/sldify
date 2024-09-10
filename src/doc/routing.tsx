import { A, Route, Router, type RouteSectionProps } from '@solidjs/router';
import InputDocDoc from './pages/input-doc';
import type { JSX } from 'solid-js';

export function Routing() {
	return (
		<Router
			base='doc'
			root={Layout}
		>
			<Route
				path='/input'
				component={InputDocDoc}
			/>
		</Router>
	);
}

function Layout(props: RouteSectionProps): JSX.Element {
	return (
		<div class='h-screen flex'>
			<Sidebar />
			<div class='flex-grow p-8 overflow-auto'>{props.children}</div>
		</div>
	);
}

function Sidebar() {
	const Navigable = (props: { url: string; label: string }) => {
		return (
			<A
				href={props.url}
				activeClass='text-blue-600 font-semibold'
				class='text-gray-800 hover:text-blue-500'
			>
				{props.label}
			</A>
		);
	};

	return (
		<div class='w-64 h-screen bg-white shadow-md p-4 border-r'>
			<h2 class='text-xl font-semibold mb-6 text-gray-800'>Documentation</h2>
			<nav class='flex flex-col space-y-2 mt-8'>
				<Navigable
					url={'/input'}
					label={'Input'}
				/>
			</nav>
		</div>
	);
}
