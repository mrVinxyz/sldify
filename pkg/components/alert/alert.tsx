import { cva, type VariantProps } from 'class-variance-authority';
import {
	type Component,
	createContext,
	createEffect,
	createSignal,
	onCleanup,
	Show,
	useContext,
} from 'solid-js';
import type {ChildProp, OptClassProp, OptContextProp} from '../../utils/types';

type AlertContext = {
	show: () => void;
	hide: () => void;
	isActive: () => boolean;
};

type AlertProps = OptContextProp<AlertContext> &
	VariantProps<typeof alertVariants> &
	ChildProp &
	OptClassProp & {
		duration?: number;
		disableDuration?: boolean;
		onShow?: () => void;
		onHide?: () => void;
	};

const alertVariants = cva('flex items-center p-4 mb-4 text-sm rounded-lg', {
	variants: {
		variant: {
			info: 'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400',
			danger: 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400',
			success: 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400',
			warning: 'text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300',
			dark: 'text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300',
		},
		bordered: {
			true: 'border',
			false: '',
		},
	},
	compoundVariants: [
		{
			variant: 'info',
			bordered: true,
			class: 'border-blue-300 dark:border-blue-800',
		},
		{
			variant: 'danger',
			bordered: true,
			class: 'border-red-300 dark:border-red-800',
		},
		{
			variant: 'success',
			bordered: true,
			class: 'border-green-300 dark:border-green-800',
		},
		{
			variant: 'warning',
			bordered: true,
			class: 'border-yellow-300 dark:border-yellow-800',
		},
		{
			variant: 'dark',
			bordered: true,
			class: 'border-gray-300 dark:border-gray-700',
		},
	],
	defaultVariants: {
		variant: 'info',
		bordered: false,
	},
});

const alertContext = createContext<AlertContext>();

function useAlert(): AlertContext {
	const ctx = useContext(alertContext);
	if (!ctx) throw new Error('useAlert must be used within a Alert component');
	return ctx;
}

function createAlert(props?: AlertProps): AlertContext {
	const [active, setActive] = createSignal(false);

	const show = () => {
		setActive(true);
		props?.onShow?.();
	};

	const hide = () => {
		setActive(false);
		props?.onHide?.();
	};

	const isActive = () => active();

	if (!props?.disableDuration) {
		let timeoutId: number;
		const defaultDuration = 5000;

		createEffect(() => {
			if (isActive() && defaultDuration) {
				timeoutId = window.setTimeout(() => {
					hide();
				}, defaultDuration);
			}
		});

		onCleanup(() => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		});
	}

	return {
		show,
		hide,
		isActive,
	};
}

const Alert: Component<AlertProps> = (props) => {
	const alert = props.ctx ?? createAlert(props);

	return (
		<Show when={alert.isActive()}>
			<div
				class={alertVariants({
					variant: props.variant,
					bordered: props.bordered,
					class: props.class,
				})}
				role='alert'
			>
				{props.children}
			</div>
		</Show>
	);
};

export { type AlertProps, type AlertContext, useAlert, createAlert, Alert };
