import './index.css';

import { render } from 'solid-js/web';
import { Route, Router, type RouteSectionProps } from '@solidjs/router';
import ButtonDoc from './pages/button-doc';
import ModalDoc from './pages/modal-doc';
import type { View } from 'core/types';
import InputDoc from './pages/input-doc';
import { ColorToggler } from 'core/button/color-toggler';

render(() => <Routing />, document.body);

function Routing() {
	return (
		<Router
			base='doc'
			root={Layout}
		>
			<Route
				path='/button'
				component={ButtonDoc}
			/>
			<Route
				path='/modal'
				component={ModalDoc}
			/>
			<Route
				path='/input'
				component={InputDoc}
			/>
		</Router>
	);
}

function Layout(props: RouteSectionProps): View {
	return (
		<div class='min-h-screen max-w-screen bg-gray-50 dark:bg-stone-900'>
			<ColorToggler  name='Change Color'/>
			<div class='overflow-y-auto p-8'>{props.children}</div>
		</div>
	);
}
