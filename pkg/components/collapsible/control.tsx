import { type CollapsibleContext, useCollapsible } from './collapsible';
import { Dynamic } from 'solid-js/web';
import type { ValidComponent } from 'solid-js';
import type { OptContextProp } from '../../utils/types';

type CollapsibleControlProps = OptContextProp<CollapsibleContext> & {
	asChild: ValidComponent;
};

function CollapsibleControl(props: CollapsibleControlProps) {
	const collapsible = props.ctx ?? useCollapsible();
	return (
		<Dynamic
			id={collapsible.id().concat('-control')}
			component={props.asChild}
			onClick={() => collapsible.toggle()}
		/>
	);
}

export { type CollapsibleControlProps, CollapsibleControl };
