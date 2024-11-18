import { type CollapsibleContext, useCollapsible } from './collapsible';
import { Dynamic } from 'solid-js/web';
import type { ValidComponent } from 'solid-js';
import type { OptContextProp } from '../../utils/types';

type CollapsibleControlProps = OptContextProp<CollapsibleContext> & {
	asChild: ValidComponent;
};

type CollapsibleController = {
	id: string;
	onClick: (e: MouseEvent) => void;
};

function CollapsibleControl(props: CollapsibleControlProps) {
	const collapsible = props.ctx ?? useCollapsible();
	return (
		<Dynamic
			component={props.asChild}
			id={collapsible.id().concat('-control')}
			onClick={() => collapsible.toggle()}
		/>
	);
}

export { type CollapsibleControlProps, type CollapsibleController, CollapsibleControl };
