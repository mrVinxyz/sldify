import './index.css';

import { render } from 'solid-js/web';
import { Route, Router, type RouteSectionProps } from '@solidjs/router';
import type { JSX } from 'solid-js';
import DropdownHome from './dropdown/dropdown-home';
import InputHome from './input/input-home';

render(() => <Routing />, document.body);

function Routing() {
	return (
		<Router root={Layout}>
			<Route path='/dropdown' component={DropdownHome} />
			<Route path='/input' component={InputHome} />
		</Router>
	);
}

function Layout(props: RouteSectionProps): JSX.Element {
	return (
		<div class={'p-4 bg-gray-50 w-screen h-screen'}>{props.children}</div>
	);
}
