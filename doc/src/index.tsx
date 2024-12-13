import './index.css';

import { render } from 'solid-js/web';
import { Route, Router, type RouteSectionProps } from '@solidjs/router';
import Dev from './dev';
import CollapsibleDoc from './pages/collapsible-doc';
import ColorModeToggler from 'pkg/components/button/color-mode-toggler';
import DialogDoc from './pages/dialog-doc';
import ModalDialogDoc from './pages/modal-dialog-doc';

render(() => <Routing />, document.body);

function Routing() {
	const Layout = (props: RouteSectionProps) => (
		<main
			class={
				'h-screen w-screen overflow-y-auto bg-white dark:bg-neutral-900 pt-12 p-4 sm:px-8 md:px-16 lg:px-32 xl:px-64'
			}
		>
			<div class={'fixed'}>
				<ColorModeToggler textContent={'Mode'} />
			</div>
			{props.children}
		</main>
	);

	return (
		<Router root={Layout}>
			<Route
				path='/'
				component={Dev}
			/>
			<Route
				path='/collapsible'
				component={CollapsibleDoc}
			/>
			<Route
				path='/dialog'
				component={DialogDoc}
			/>
			<Route
				path='/modal'
				component={ModalDialogDoc}
			/>
		</Router>
	);
}
