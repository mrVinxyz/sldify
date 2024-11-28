import { MetaProvider, Title } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { type JSX, Suspense } from 'solid-js';
import './app.css';
import ColorModeToggler from 'pkg/components/button/color-mode-toggler';

export default function App() {
	const Layout = (props: { children: JSX.Element }) => (
		<div class={'h-screen w-screen overflow-y-auto p-4 bg-gray-50 dark:bg-neutral-900'}>
			<ColorModeToggler
				class={'fixed'}
				textContent={'toggle'}
			/>
			{props.children}
		</div>
	);

	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Layout>
						<Suspense>{props.children}</Suspense>
					</Layout>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
