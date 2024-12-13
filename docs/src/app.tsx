import { MetaProvider, Title } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { type JSX, Suspense } from 'solid-js';
import './app.css';
import ColorModeToggler from 'pkg/components/button/color-mode-toggler';

export default function App() {
	const Layout = (props: { children: JSX.Element }) => (
		<div
			class={
				'h-screen w-screen overflow-y-auto py-4 sm:py-8 px-4 sm:px-8 md:px-16 lg:px-32 bg-gray-50 dark:bg-neutral-900'
			}
		>
			<ColorModeToggler
				class={'rounded'}
				color={'orange'}
				variant={'soft'}
			>
				Color Mode
			</ColorModeToggler>
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