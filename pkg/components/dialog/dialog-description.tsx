import type { ValidComponent } from 'solid-js';
import { useDialog } from './dialog';
import { Dynamic } from 'solid-js/web';
import type { View } from '../../utils/types';

type DialogDescriptionProps = {
	asChild: ValidComponent;
	class?: string;
	children?: View;
	srOnly?: boolean;
};

const DialogDescription = (props: DialogDescriptionProps) => {
	const dialog = useDialog();

	return (
		<Dynamic
			component={props.asChild}
			id={dialog.descriptionId()}
			class={`${props.srOnly ? 'sr-only' : ''} ${props.class || ''}`}
		>
			{props.children}
		</Dynamic>
	);
};

export { type DialogDescriptionProps, DialogDescription };
