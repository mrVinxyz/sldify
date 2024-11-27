import './index.css';

import { render } from 'solid-js/web';
import { Route, Router, type RouteSectionProps } from '@solidjs/router';
import Dev from './dev';
import DialogDoc from './pages/dialog-doc';
import ModalDialogDoc from './pages/modal-dialog-doc';
import ColorModeToggler from '../../pkg/components/button/color-mode-toggler';
import InputFieldDoc from './pages/field/input-field-doc';
import CheckboxFieldDoc from './pages/field/checkbox-field-doc';
import SelectFieldDoc from './pages/field/select-field-doc';

render(() => <Routing />, document.body);

function Routing() {
	const Layout = (props: RouteSectionProps) => (
		<main class={'h-screen w-screen overflow-y-auto p-4 bg-gray-50 dark:bg-neutral-900'}>
			<ColorModeToggler
				class={'fixed'}
				textContent={'toggle'}
			/>
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
				path='/dialog'
				component={DialogDoc}
			/>
			<Route
				path='/modal'
				component={ModalDialogDoc}
			/>
			<Route
				path='/input-field'
				component={InputFieldDoc}
			/>
			<Route
				path='/checkbox-field'
				component={CheckboxFieldDoc}
			/>
			<Route
				path='/select-field'
				component={SelectFieldDoc}
			/>
		</Router>
	);
}
