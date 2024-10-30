import { cva, type VariantProps } from 'class-variance-authority';
import type { Component } from 'solid-js';
import type { ChildProp, OptClassProp } from '../../utils/types';
import {useCollapsible} from "./collapsible";

type CollapsibleContentProps = VariantProps<typeof collapsibleContentStyles> &
	ChildProp &
	OptClassProp;

const collapsibleContentStyles = cva('z-10 relative', {
	variants: {
		placement: {
			left: 'left-0',
			right: 'right-0',
			'': '',
		},
		size: {
			sm: 'w-48',
			md: 'w-64',
			lg: 'w-80',
			xl: 'w-96',
			full: 'w-full',
		},
		visibility: {
			hidden: 'hidden',
			visible: '',
		},
	},
	defaultVariants: {
		placement: 'left',
		size: 'full',
		visibility: 'hidden',
	},
});

const CollapsibleContent: Component<CollapsibleContentProps> = (props) => {
	const collapsible = useCollapsible();
	return (
		<div
			class={collapsibleContentStyles({
				placement: props.placement,
				size: props.size,
				visibility: collapsible.isActive() ? 'visible' : 'hidden',
				class: props.class,
			})}
		>
			{props.children}
		</div>
	);
};

export { type CollapsibleContentProps, CollapsibleContent };
