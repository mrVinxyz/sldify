import {
	createEffect,
	createSignal,
	type JSX,
	onCleanup,
	onMount,
	Show,
	splitProps,
} from 'solid-js';
import { useDialog } from './dialog';
import { Portal } from 'solid-js/web';

type DialogContentProps = {
	autoMount?: boolean;
} & JSX.IntrinsicElements['div'];

function DialogContent(props: DialogContentProps) {
	const [local, rest] = splitProps(props, ['class', 'autoMount', 'children']);
	const dialog = useDialog();
	const [lazyMounted, setLazyMounted] = createSignal(false);

	let contentEl: HTMLDivElement | undefined;
	let clickableEl: HTMLDivElement | undefined;

	const previousFocusState = {
		element: null as HTMLElement | null,
		scrollPosition: { x: 0, y: 0 },
	};

	createEffect(() => {
		if (dialog.isActive() && !lazyMounted()) setLazyMounted(true);
	});

	const getFocusableElements = () => {
		if (!clickableEl) return [];

		const selector = [
			'a[href]',
			'button',
			'input',
			'textarea',
			'select',
			'[tabindex]:not([tabindex="-1"])',
		].join(',');

		return Array.from(clickableEl.querySelectorAll(selector)).filter((el) => {
			const style = window.getComputedStyle(el);
			return (
				!el.hasAttribute('disabled') &&
				style.display !== 'none' &&
				style.visibility !== 'hidden' &&
				style.opacity !== '0'
			);
		}) as HTMLElement[];
	};

	onMount(() => {
		if (dialog.isActive()) trapFocus();
	});

	const trapFocus = () => {
		requestAnimationFrame(() => {
			previousFocusState.element = document.activeElement as HTMLElement;
			previousFocusState.scrollPosition = {
				x: window.scrollX,
				y: window.scrollY,
			};

			const focusableElements = getFocusableElements();

			if (focusableElements.length) {
				const initialFocusElement =
					focusableElements.find(
						(el) => el.getAttribute('data-initial-focus') !== null,
					) || focusableElements[0];
				initialFocusElement.focus();
			} else {
				contentEl?.focus();
			}
		});

		document.body.style.overflow = 'hidden';
	};

	const releaseFocus = () => {
		if (previousFocusState.element) {
			previousFocusState.element.focus();
			window.scrollTo(
				previousFocusState.scrollPosition.x,
				previousFocusState.scrollPosition.y,
			);
		}
		document.body.style.overflow = '';
	};

	createEffect(() => {
		if (dialog.isActive()) trapFocus();
		else releaseFocus();
	});

	const handleKeyDown = (e: KeyboardEvent) => {
		if (!dialog.isActive()) return;

		if (e.key === 'Escape') {
			e.preventDefault();
			dialog.close();
			return;
		}

		if (e.key === 'Tab') {
			const focusableElements = getFocusableElements();
			if (!focusableElements.length) return;

			const firstFocusable = focusableElements[0];
			const lastFocusable = focusableElements[focusableElements.length - 1];
			const currentFocusIndex = focusableElements.indexOf(
				document.activeElement as HTMLElement,
			);

			if (e.shiftKey && currentFocusIndex <= 0) {
				e.preventDefault();
				lastFocusable?.focus();
			} else if (!e.shiftKey && currentFocusIndex === focusableElements.length - 1) {
				e.preventDefault();
				firstFocusable?.focus();
			}
		}
	};

	const handleOutsideClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const nestedDialog = !target.id.startsWith('dialog-') && !target.id.endsWith('control');
		if (clickableEl && !clickableEl.contains(target) && nestedDialog) {
			e.preventDefault();
			dialog.close();
		}
	};

	onCleanup(() => {
		document.body.style.overflow = '';
		if (dialog.isActive()) releaseFocus();
	});

	return (
		<Show when={local.autoMount || lazyMounted()}>
			<Portal>
				<div
					ref={contentEl}
					id={dialog.id()}
					class={`fixed inset-0 z-50 bg-transparent ${!dialog.isActive() ? 'hidden' : ''}`}
					onKeyDown={handleKeyDown}
					onClick={handleOutsideClick}
					tabIndex={-1}
					role='dialog'
					aria-modal='true'
					aria-labelledby={dialog.titleId()}
					aria-describedby={dialog.descriptionId()}
					aria-hidden={!dialog.isActive()}
					{...rest}
				>
					<div class='w-full max-w-screen h-[calc(100vh-1rem)] grid place-items-center p-4'>
						<div
							ref={clickableEl}
							class={local.class}
						>
							{local.children}
						</div>
					</div>
				</div>
			</Portal>
		</Show>
	);
}

export { type DialogContentProps, DialogContent };
