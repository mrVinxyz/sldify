import { type Component, createEffect, createSignal, Show } from 'solid-js';
import type { ChildProp, OptClassProp } from '../../utils/types';
import { useCollapsible } from './collapsible';

type CollapsiblePortalProps = {
	autoMount?: boolean;
} & ChildProp &
	OptClassProp;

const CollapsiblePortal: Component<CollapsiblePortalProps> = (props) => {
	const collapsible = useCollapsible();
	const [lazyMounted, setLazyMounted] = createSignal(false);

	createEffect(() => {
		if (collapsible.isActive() && !lazyMounted()) {
			setLazyMounted(true);
		}
	});

	return (
		<Show when={props.autoMount || lazyMounted()}>
			<div
				id={collapsible.id().concat('-portal')}
				class={`relative z-10 ${!collapsible.isActive() ? 'hidden' : ''} ${props.class || ''}`}
			>
				{props.children}
			</div>
		</Show>
	);
};

export { type CollapsiblePortalProps, CollapsiblePortal };
