import { createEffect, createSignal, type JSX, Show, splitProps } from 'solid-js';
import { useCollapsible } from './collapsible';

type CollapsibleContentProps = {
	layout: 'float' | 'fixed';
	autoMount?: boolean;
} & JSX.IntrinsicElements['div'];

const CollapsibleContent = (props: CollapsibleContentProps) => {
	const [local, rest] = splitProps(props, ['layout', 'class']);
	const [lazyMounted, setLazyMounted] = createSignal(false);
	const collapsible = useCollapsible();

	createEffect(() => {
		if (collapsible.isActive() && !lazyMounted()) {
			setLazyMounted(true);
		}
	});

	return (
		<Show when={props.autoMount || lazyMounted()}>
			<div
				id={collapsible.id().concat('-portal')}
				class={`relative z-10 ${!collapsible.isActive() ? 'hidden' : ''}`}
			>
				<div
					id={collapsible.id().concat('-content')}
					class={`${local.layout === 'float' ? 'absolute' : 'relative'} ${local.class || ''}`}
					{...rest}
				>
					{props.children}
				</div>
			</div>
		</Show>
	);
};

export { type CollapsibleContentProps, CollapsibleContent };
