import type { OptContextProp, View } from '../../utils/types';
import { type DialogContext, useDialog } from './dialog';
import { Dynamic } from 'solid-js/web';
import type { ValidComponent } from 'solid-js';

type DialogControlProps = OptContextProp<DialogContext> & {
	asChild: ValidComponent;
	action?: 'open' | 'close' | 'toggle';
};

type BaseController = {
	id: string;
	onClick: (e: MouseEvent) => void;
};

type AriaController = BaseController & {
	ariaHasPopup: 'dialog';
	ariaExpanded: boolean;
	ariaControls: string;
};

type DialogController = BaseController | AriaController;

function DialogControl(props: DialogControlProps): View {
	const dialog = props.ctx || useDialog();
	const handleClick = () => {
		switch (props.action) {
			case 'open':
				dialog.open();
				break;
			case 'close':
				dialog.close();
				break;
			default:
				dialog.toggle();
		}
	};

	const baseController: BaseController = {
		id: dialog.id().concat('-control'),
		onClick: handleClick,
	};

	const controller: DialogController =
		props.action === 'close'
			? baseController
			: {
					...baseController,
					ariaHasPopup: 'dialog',
					ariaExpanded: dialog.isActive(),
					ariaControls: dialog.id(),
				};

	return (
		<Dynamic
			component={props.asChild}
			{...controller}
		/>
	);
}

export type { DialogControlProps, DialogController };
export { DialogControl };
