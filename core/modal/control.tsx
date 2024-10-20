import { Button, type ButtonProps } from '../button';
import { type ModalContextProps, useModal } from './context';
import type { View } from '../types';

export type ModalControlProps = {
	children?: View;
	action: 'open' | 'close';
	ctx?: ModalContextProps;
};

export function ModalControl({
	action,
	ctx,
	children,
	...buttonProps
}: ModalControlProps & ButtonProps): View {
	const modalCtx = ctx || useModal();

	const updateModalState = () => {
		if (action === 'open') modalCtx.open();
		else modalCtx.close();
	};

	return (
		<Button
			onPress={updateModalState}
			{...buttonProps}
		>
			{children}
		</Button>
	);
}

ModalControl.Open = (props: Omit<ModalControlProps, 'action'> & ButtonProps) => (
	<ModalControl
		{...props}
		action='open'
	>
		{props.children}
	</ModalControl>
);

ModalControl.Close = (props: Omit<ModalControlProps, 'action'> & ButtonProps) => (
	<ModalControl
		{...props}
		action={'close'}
		rec='sm'
		className='inline-flex'
	>
		<svg
			class='w-4 h-4'
			aria-hidden='true'
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
		>
			<path
				stroke='currentColor'
				stroke-linecap='round'
				stroke-linejoin='round'
				stroke-width='2'
				d='M6 18 17.94 6M18 18 6.06 6'
			/>
		</svg>
	</ModalControl>
);
