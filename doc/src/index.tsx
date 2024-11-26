import './index.css';

import { render } from 'solid-js/web';
import { Route, Router, type RouteSectionProps } from '@solidjs/router';
import Dev from './dev';
import DialogDoc from './pages/dialog-doc';
import ModalDialogDoc from './pages/modal-dialog-doc';
import SelectFieldDoc from './pages/field/select-field-doc';
import SearchFieldDoc from './pages/field/search-field-doc';
import ColorModeToggler from '../../pkg/components/button/color-mode-toggler';
import InputDoc from './pages/input/input-doc';
import CheckboxFieldDoc from './pages/field/checkbox-field-doc';
import { Checkbox } from 'pkg/components/input/checkbox';
import CheckboxDoc from './pages/input/checkbox-doc';
import TextAreaDoc from './pages/input/textarea-doc';
import RadioDoc from './pages/input/radio-doc';

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
				path='/input'
				component={InputDoc}
			/>
			<Route
				path='/select'
				component={SelectFieldDoc}
			/>
			<Route
				path='/search'
				component={SearchFieldDoc}
			/>
			<Route
				path='/checkbox'
				component={CheckboxDoc}
			/>
			<Route
				path='textarea'
				component={TextAreaDoc}
			/>
			<Route
				path='radio'
				component={RadioDoc}
			/>
		</Router>
	);
}
