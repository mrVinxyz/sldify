import { Button, type ButtonProps } from './button';
import {type Component, createEffect, onCleanup, onMount, splitProps} from 'solid-js';

const ColorModeToggler: Component<ButtonProps> = (props) => {
	const [local, rest] = splitProps(props, ['onClick']);

	const getSystemPreference = () => {
		if (typeof window === 'undefined') return false;
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	};

	const getInitialColorMode = () => {
		if (typeof window === 'undefined') return false;

		const savedMode = localStorage.getItem('color-mode');
		if (savedMode) {
			return savedMode === 'dark';
		}

		return getSystemPreference();
	};

	const applyInitialColorMode = () => {
		if (getInitialColorMode()) {
			document.documentElement.classList.add('dark');
		}
	};

	onMount(() => applyInitialColorMode());

	const toggleColorMode = () => {
		const doc = document.documentElement.classList;
		const isDark = doc.contains('dark');

		if (isDark) {
			doc.remove('dark');
			localStorage.setItem('color-mode', 'light');
		} else {
			doc.add('dark');
			localStorage.setItem('color-mode', 'dark');
		}
	};

	return (
		<Button
			onClick={(e) => {
				if (typeof local.onClick === 'function') local.onClick(e);
				toggleColorMode();
			}}
			{...rest}
		/>
	);
};

export default ColorModeToggler;
