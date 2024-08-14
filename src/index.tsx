import './index.css';

import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import type { JSX } from 'solid-js';

render(() => <Router root={Layout} />, document.body);

function Layout(): JSX.Element {
	return (
		<div class={'p-4 bg-gray-50 w-screen h-screen'}>
			"Hello, World!"
		</div>
	);
}
