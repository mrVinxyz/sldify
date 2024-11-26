import { useDialog } from './dialog';
import type { ValidComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import type { View } from '../../utils/types';

type DialogTitleProps = {
	asChild: ValidComponent;
	class?: string;
	children?: View;
	srOnly?: boolean;
};

function DialogTitle(props: DialogTitleProps) {
	const dialog = useDialog();

	return (
		<Dynamic
			component={props.asChild}
			id={dialog.titleId()}
			class={`${props.srOnly ? 'sr-only' : ''} ${props.class || ''}`}
		>
			{props.children}
		</Dynamic>
	);
}

export { type DialogTitleProps, DialogTitle };
