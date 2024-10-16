import type { JSX } from 'solid-js';
import { Button, type ButtonProps } from '../button';
import { type ModalContextProps, useModal } from './context';

/**
 * Properties for controlling the modal state through actions.
 * @param children - Element representing the control (e.g., <button/>) to trigger the modal action.
 * @param action - Specifies the action to be performed. Can be 'open' to open the modal or 'close' to close it.
 * @param ctx - Provides a specific modal context to control, allowing interaction with a modal that wasn't rendered within its own context.
 * Defaults to the current modal context.
 */
export type ModalControlProps = {
	children?: JSX.Element;
	action: 'open' | 'close';
	ctx?: ModalContextProps;
};

/**
 * Component for managing modal actions.
 * @param props - Properties to control the modal state.
 */
export const ModalControl = ({
	action,
	ctx,
	children,
	...buttonProps
}: ModalControlProps & ButtonProps): JSX.Element => {
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
};

ModalControl.Open = (props: Omit<ModalControlProps, 'action'> & ButtonProps) => {
	return (
		<ModalControl
			{...props}
			action='open'
		>
			{props.children}
		</ModalControl>
	);
};

ModalControl.Close = (props: Omit<ModalControlProps, 'action'> & ButtonProps) => {
	return (
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
};
