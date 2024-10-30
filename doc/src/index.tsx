import './index.css';

import { render } from 'solid-js/web';
import { Route, Router, type RouteSectionProps } from '@solidjs/router';
import ButtonDoc from './pages/button-doc';
import InputDoc from './pages/input-doc';
import Dev from './dev';

render(() => <Routing />, document.body);

function Routing() {
	const Layout = (props: RouteSectionProps) => <main class={'h-screen w-screen overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900'}>{props.children}</main>;

	return (
		<Router root={Layout}>
			<Route
				path='/'
				component={Dev}
			/>
			<Route
				path='/button'
				component={ButtonDoc}
			/>
			<Route
				path='/input'
				component={InputDoc}
			/>
		</Router>
	);
}
