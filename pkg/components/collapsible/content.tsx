import type { ChildProp } from '../../utils/types';
import { type JSX, splitProps } from 'solid-js';
import { useCollapsible } from './collapsible';

type CollapsibleLayout = 'float' | 'fixed';

type CollapsibleContentProps = {
	layout: CollapsibleLayout;
} & JSX.IntrinsicElements['div'] &
	ChildProp;

const CollapsibleContent = (props: CollapsibleContentProps) => {
	const [local, rest] = splitProps(props, ['layout', 'class']);
	const collapsible = useCollapsible();
	return (
		<div
			id={collapsible.id().concat('-content')}
			class={`${local.layout === 'float' ? 'absolute' : 'relative'} ${local.class || ''}`}
			{...rest}
		>
			{props.children}
		</div>
	);
};

export { type CollapsibleContentProps, type CollapsibleLayout, CollapsibleContent };
