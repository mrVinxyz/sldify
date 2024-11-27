import ColorModeToggler from "pkg/components/button/color-mode-toggler";

export default function Home() {
	return (
		<main class={'h-screen w-screen overflow-y-auto p-4 bg-gray-50 dark:bg-neutral-900'}>
			<ColorModeToggler
				class={'fixed'}
				textContent={'toggle'}
			/>
		</main>
	);
}
